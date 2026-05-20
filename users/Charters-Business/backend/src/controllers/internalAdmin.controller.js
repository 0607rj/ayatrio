import User from '../models/User.model.js';
import JobPosting from '../models/JobPosting.model.js';
import InternshipPosting from '../models/InternshipPosting.model.js';
import JobApplication from '../models/JobApplication.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const MANAGED_USER_ROLES = ['user', 'candidate'];
const JOB_ALLOWED_FIELDS = [
  'title',
  'company',
  'location',
  'jobType',
  'category',
  'salary',
  'experience',
  'description',
  'isActive',
];
const INTERNSHIP_ALLOWED_FIELDS = [
  'title',
  'company',
  'location',
  'internshipType',
  'category',
  'stipend',
  'duration',
  'description',
  'isActive',
];
const APPLICATION_STATUSES = ['pending', 'reviewing', 'shortlisted', 'rejected', 'accepted'];

function toPagination(query) {
  const page = Math.max(Number.parseInt(query.page || '1', 10), 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit || '25', 10), 1), 200);
  return { page, limit, skip: (page - 1) * limit };
}

function normalizeUserStatus(user) {
  if (user.status) return user.status;
  return user.isActive ? 'active' : 'disabled';
}

function serializeCandidate(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber || null,
    courseInterestedIn: user.courseInterestedIn || null,
    role: user.role,
    status: normalizeUserStatus(user),
    isActive: normalizeUserStatus(user) === 'active',
    avatar: user.avatar || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLogin: user.lastLogin || null,
  };
}

function pickAllowed(input, allowed) {
  const out = {};
  for (const key of allowed) {
    if (input[key] !== undefined) {
      out[key] = input[key];
    }
  }

  return out;
}

function buildPostingListQuery(input = {}, ownerId = null) {
  const { search, isActive } = input;
  const query = {};

  if (ownerId) {
    query.createdBy = ownerId;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
    ];
  }

  if (isActive === 'true') query.isActive = true;
  if (isActive === 'false') query.isActive = false;

  return query;
}

export const getCandidates = asyncHandler(async (req, res) => {
  const { search, status, role } = req.query;
  const { page, limit, skip } = toPagination(req.query);

  const normalizedRole = String(role || '').trim().toLowerCase();
  const roleFilter = MANAGED_USER_ROLES.includes(normalizedRole)
    ? [normalizedRole]
    : MANAGED_USER_ROLES;

  const query = {
    role: { $in: roleFilter },
  };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phoneNumber: { $regex: search, $options: 'i' } },
    ];
  }

  if (status) {
    query.status = status;
  }

  const [users, total] = await Promise.all([
    User.find(query)
      .select('name email phoneNumber courseInterestedIn role status isActive avatar createdAt updatedAt lastLogin')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments(query),
  ]);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        candidates: users.map(serializeCandidate),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Candidates fetched successfully'
    )
  );
});

export const getCandidateById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('name email phoneNumber courseInterestedIn role status isActive avatar createdAt updatedAt lastLogin')
    .lean();

  if (!user) {
    throw new ApiError(404, 'Candidate not found');
  }

  if (!MANAGED_USER_ROLES.includes(String(user.role || '').toLowerCase())) {
    throw new ApiError(403, 'Only user/candidate accounts can be read via this endpoint');
  }

  res.status(200).json(new ApiResponse(200, serializeCandidate(user), 'Candidate fetched successfully'));
});

export const updateCandidateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  if (!['active', 'disabled', 'blocked'].includes(status)) {
    throw new ApiError(400, 'Invalid status. Allowed: active, disabled, blocked');
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, 'Candidate not found');
  }

  if (!MANAGED_USER_ROLES.includes(String(user.role || '').toLowerCase())) {
    throw new ApiError(403, 'Only user/candidate accounts can be updated via this endpoint');
  }

  user.status = status;
  user.isActive = status === 'active';
  await user.save();

  res.status(200).json(new ApiResponse(200, serializeCandidate(user.toObject()), 'Candidate status updated successfully'));
});

export const deactivateCandidate = asyncHandler(async (req, res) => {
  req.body = {
    ...(req.body || {}),
    status: 'disabled',
  };

  return updateCandidateStatus(req, res);
});

export const listJobs = asyncHandler(async (req, res) => {
  const { page, limit, skip } = toPagination(req.query);
  const query = buildPostingListQuery(req.query);

  const [jobs, total] = await Promise.all([
    JobPosting.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    JobPosting.countDocuments(query),
  ]);

  res.status(200).json(new ApiResponse(200, {
    jobs,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  }, 'Jobs fetched successfully'));
});

export const listMyJobs = asyncHandler(async (req, res) => {
  const { page, limit, skip } = toPagination(req.query);
  const query = buildPostingListQuery(req.query, req.actingAdmin._id);

  const [jobs, total] = await Promise.all([
    JobPosting.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    JobPosting.countDocuments(query),
  ]);

  res.status(200).json(new ApiResponse(200, {
    jobs,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  }, 'My jobs fetched successfully'));
});

export const getJobById = asyncHandler(async (req, res) => {
  const job = await JobPosting.findById(req.params.id).lean();

  if (!job) {
    throw new ApiError(404, 'Job not found');
  }

  res.status(200).json(new ApiResponse(200, job, 'Job fetched successfully'));
});

export const createJob = asyncHandler(async (req, res) => {
  const payload = pickAllowed(req.body || {}, JOB_ALLOWED_FIELDS);

  const required = ['title', 'location', 'jobType', 'category', 'salary', 'experience', 'description'];
  for (const field of required) {
    if (!payload[field]) {
      throw new ApiError(400, `Missing required field: ${field}`);
    }
  }

  const job = await JobPosting.create({
    ...payload,
    company: payload.company?.trim() || 'Charters Business',
    createdBy: req.actingAdmin._id,
  });

  res.status(201).json(new ApiResponse(201, job, 'Job created successfully'));
});

export const updateJob = asyncHandler(async (req, res) => {
  const payload = pickAllowed(req.body || {}, JOB_ALLOWED_FIELDS);

  const job = await JobPosting.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    throw new ApiError(404, 'Job not found');
  }

  res.status(200).json(new ApiResponse(200, job, 'Job updated successfully'));
});

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await JobPosting.findById(req.params.id);

  if (!job) {
    throw new ApiError(404, 'Job not found');
  }

  job.isActive = false;
  await job.save();

  res.status(200).json(new ApiResponse(200, null, 'Job deactivated successfully'));
});

export const listInternships = asyncHandler(async (req, res) => {
  const { page, limit, skip } = toPagination(req.query);
  const query = buildPostingListQuery(req.query);

  const [internships, total] = await Promise.all([
    InternshipPosting.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    InternshipPosting.countDocuments(query),
  ]);

  res.status(200).json(new ApiResponse(200, {
    internships,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  }, 'Internships fetched successfully'));
});

export const listMyInternships = asyncHandler(async (req, res) => {
  const { page, limit, skip } = toPagination(req.query);
  const query = buildPostingListQuery(req.query, req.actingAdmin._id);

  const [internships, total] = await Promise.all([
    InternshipPosting.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    InternshipPosting.countDocuments(query),
  ]);

  res.status(200).json(new ApiResponse(200, {
    internships,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  }, 'My internships fetched successfully'));
});

export const getInternshipById = asyncHandler(async (req, res) => {
  const internship = await InternshipPosting.findById(req.params.id).lean();

  if (!internship) {
    throw new ApiError(404, 'Internship not found');
  }

  res.status(200).json(new ApiResponse(200, internship, 'Internship fetched successfully'));
});

export const createInternship = asyncHandler(async (req, res) => {
  const payload = pickAllowed(req.body || {}, INTERNSHIP_ALLOWED_FIELDS);

  const required = ['title', 'location', 'internshipType', 'category', 'stipend', 'duration', 'description'];
  for (const field of required) {
    if (!payload[field]) {
      throw new ApiError(400, `Missing required field: ${field}`);
    }
  }

  const internship = await InternshipPosting.create({
    ...payload,
    company: payload.company?.trim() || 'Charters Business',
    createdBy: req.actingAdmin._id,
  });

  res.status(201).json(new ApiResponse(201, internship, 'Internship created successfully'));
});

export const updateInternship = asyncHandler(async (req, res) => {
  const payload = pickAllowed(req.body || {}, INTERNSHIP_ALLOWED_FIELDS);

  const internship = await InternshipPosting.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!internship) {
    throw new ApiError(404, 'Internship not found');
  }

  res.status(200).json(new ApiResponse(200, internship, 'Internship updated successfully'));
});

export const deleteInternship = asyncHandler(async (req, res) => {
  const internship = await InternshipPosting.findById(req.params.id);

  if (!internship) {
    throw new ApiError(404, 'Internship not found');
  }

  internship.isActive = false;
  await internship.save();

  res.status(200).json(new ApiResponse(200, null, 'Internship deactivated successfully'));
});

export const listApplications = asyncHandler(async (req, res) => {
  const { page, limit, skip } = toPagination(req.query);
  const { type, status, search, jobId, internshipId } = req.query;

  const query = {};

  if (type) query.applicationType = type;
  if (status) query.status = status;
  if (jobId) query.jobPosting = jobId;
  if (internshipId) query.internshipPosting = internshipId;

  if (search) {
    const matchingUsers = await User.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    }).select('_id');

    const userIds = matchingUsers.map((user) => user._id);

    query.$or = [
      { applicationNumber: { $regex: search, $options: 'i' } },
      { user: { $in: userIds } },
    ];
  }

  const [applications, total] = await Promise.all([
    JobApplication.find(query)
      .populate('user', 'name email phoneNumber')
      .populate('jobPosting', 'title company location')
      .populate('internshipPosting', 'title company location')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    JobApplication.countDocuments(query),
  ]);

  res.status(200).json(new ApiResponse(200, {
    applications,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  }, 'Applications fetched successfully'));
});

export const listApplicationsForJob = asyncHandler(async (req, res) => {
  req.query = {
    ...req.query,
    jobId: req.params.id,
  };

  return listApplications(req, res);
});

export const listApplicationsForInternship = asyncHandler(async (req, res) => {
  req.query = {
    ...req.query,
    internshipId: req.params.id,
  };

  return listApplications(req, res);
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  if (!APPLICATION_STATUSES.includes(status)) {
    throw new ApiError(400, `Invalid status. Allowed: ${APPLICATION_STATUSES.join(', ')}`);
  }

  const application = await JobApplication.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  )
    .populate('user', 'name email phoneNumber')
    .populate('jobPosting', 'title company location')
    .populate('internshipPosting', 'title company location');

  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  res.status(200).json(new ApiResponse(200, application, 'Application status updated successfully'));
});
