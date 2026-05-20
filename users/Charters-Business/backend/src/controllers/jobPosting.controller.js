import JobPosting from '../models/JobPosting.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';

// Create job posting (Admin/Recruiter only)
export const createJobPosting = asyncHandler(async (req, res) => {
  const {
    title,
    company,
    location,
    jobType,
    category,
    salary,
    experience,
    description,
  } = req.body;

  if (!title || !location || !jobType || !category || !salary || !experience || !description) {
    throw new ApiError(400, 'All fields are required');
  }

  // 🔐 Mint a short-lived acting token so admin backend knows WHO is acting
  const actingToken = jwt.sign(
    {
      adminId: req.user.id || req.user._id,
      role: req.user.role,       // must be 'admin' or 'recruiter'
      email: req.user.email,
    },
    process.env.INTERNAL_SHARED_SECRET,
    {
      issuer: 'profile-branding',   // admin backend verifies this exact issuer
      expiresIn: '5m',
    }
  );

  console.log("USER ROLE:", req.user.role);
  console.log("SERVICE KEY:", process.env.INTERNAL_SERVICE_KEY);
  console.log("ADMIN URL:", process.env.ADMIN_BASE_URL);
  console.log("SHARED SECRET SET:", !!process.env.INTERNAL_SHARED_SECRET);

  // 🔥 CALL ADMIN BACKEND
  const response = await fetch(
    `${process.env.ADMIN_BASE_URL}/internal/admin/jobs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-service-key": process.env.INTERNAL_SERVICE_KEY,       // ✅ service auth
        "x-acting-admin-token": actingToken,                      // ✅ correct header name
      },
      body: JSON.stringify({
        title,
        company,
        location,
        jobType,
        category,
        salary,
        experience,
        description,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.message || "Failed to create job");
  }

  res.status(201).json(
    new ApiResponse(201, data.data, "Job created via admin service")
  );
});

// Get all job postings (Public with filters)
// Get all job postings (Public with filters)
export const getAllJobPostings = asyncHandler(async (req, res) => {
  const { 
    location, 
    category, 
    jobType,
    search, 
    page = 1, 
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  // Build query string to forward to admin backend
  const params = new URLSearchParams();
  if (location && location !== 'All') params.append('location', location);
  if (category) params.append('category', category);
  if (jobType) params.append('jobType', jobType);
  if (search) params.append('search', search);
  params.append('page', page);
  params.append('limit', limit);
  params.append('sortBy', sortBy);
  params.append('order', order);

  // 🔥 CALL ADMIN BACKEND (public route - no auth needed)
  const response = await fetch(
    `${process.env.ADMIN_BASE_URL}/internal/admin/jobs?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.message || "Failed to fetch jobs");
  }

  // Admin backend returns { jobs, pagination } inside data.data
  res.status(200).json(
    new ApiResponse(200, {
      jobPostings: data.data?.jobs || [],
      pagination: data.data?.pagination || {},
    }, 'Job postings retrieved successfully')
  );
});

// Get single job posting by ID (Public)
// Get single job posting by ID (Public)
export const getJobPostingById = asyncHandler(async (req, res) => {
  const response = await fetch(
    `${process.env.ADMIN_BASE_URL}/internal/admin/jobs/${req.params.id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.message || "Job posting not found");
  }

  res.status(200).json(
    new ApiResponse(200, data.data, 'Job posting retrieved successfully')
  );
});

// Update job posting (Admin/Recruiter only)
export const updateJobPosting = asyncHandler(async (req, res) => {
  const jobPosting = await JobPosting.findById(req.params.id);

  if (!jobPosting) {
    throw new ApiError(404, 'Job posting not found');
  }

  // Check ownership (unless admin)
  if (
    jobPosting.createdBy.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    throw new ApiError(403, 'You are not authorized to update this job posting');
  }

  const allowedFields = [
    'title', 'company', 'location', 'jobType', 
    'category', 'salary', 'experience', 'description', 'isActive'
  ];

  const updates = {};
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const updatedJobPosting = await JobPosting.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true, runValidators: true }
  ).populate('createdBy', 'name email');

  res.status(200).json(
    new ApiResponse(200, updatedJobPosting, 'Job posting updated successfully')
  );
});

// Delete/Deactivate job posting (Admin/Recruiter only)
export const deleteJobPosting = asyncHandler(async (req, res) => {
  const jobPosting = await JobPosting.findById(req.params.id);

  if (!jobPosting) {
    throw new ApiError(404, 'Job posting not found');
  }

  // Check ownership (unless admin)
  if (
    jobPosting.createdBy.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    throw new ApiError(403, 'You are not authorized to delete this job posting');
  }

  // Soft delete - just mark as inactive
  await JobPosting.findByIdAndUpdate(req.params.id, { isActive: false });

  res.status(200).json(new ApiResponse(200, null, 'Job posting deleted successfully'));
});

// Get my job postings (Recruiter/Admin)
export const getMyJobPostings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const query = { createdBy: req.user.id };

  const [jobPostings, count] = await Promise.all([
    JobPosting.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean(),
    JobPosting.countDocuments(query)
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      jobPostings,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      }
    }, 'Your job postings retrieved successfully')
  );
});

// Get job posting statistics (Admin)
export const getJobStats = asyncHandler(async (req, res) => {
  const [totalJobs, activeJobs, inactiveJobs, totalApplications] = await Promise.all([
    JobPosting.countDocuments(),
    JobPosting.countDocuments({ isActive: true }),
    JobPosting.countDocuments({ isActive: false }),
    JobPosting.aggregate([
      { $group: { _id: null, total: { $sum: '$applicationsCount' } } }
    ])
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      totalJobs,
      activeJobs,
      inactiveJobs,
      totalApplications: totalApplications[0]?.total || 0
    }, 'Job statistics retrieved successfully')
  );
});
