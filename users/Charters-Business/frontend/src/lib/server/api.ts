const RAW =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";
const NORMALIZED_BASE = RAW.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
export const API_BASE_URL = `${NORMALIZED_BASE}/api/v1`;

// TYPES

export interface CounselingFormData {
  name: string;
  email: string;
  program: string;
  counselingDate: string;
  counselingTime: string;
  agreeToTerms: boolean;
  trackingData?: TrackingPayload | null;
}

export interface ApplicationFormData {
  name: string;
  email: string;
  location: string;
  program: string;
  countryCode: string;
  mobileNo: string;
  agreeToTerms: boolean;
  trackingData?: TrackingPayload | null;
}

export interface TrackingPayload {
  sessionId: string;
  deviceId: string;
  pageViewsTotal: number;
  uniquePages: Array<{
    path: string;
    title: string;
  }>;
  chatInteractions: number;
  startedAt: number;
  lastSeenAt: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// COUNSELING API

export const submitCounseling = async (
  formData: CounselingFormData,
  token?: string | null,
): Promise<ApiResponse<any>> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/counseling`, {
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to schedule counseling");
    }

    return data;
  } catch (error: any) {
    console.error("Counseling submission error:", error);
    throw error;
  }
};

// APPLICATION API

export const submitApplication = async (
  formData: ApplicationFormData,
  token?: string | null,
): Promise<ApiResponse<any>> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit application");
    }

    return data;
  } catch (error: any) {
    console.error("Application submission error:", error);
    throw error;
  }
};

export const getApplicationByNumber = async (
  applicationNumber: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/applications/number/${applicationNumber}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Application not found");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching application:", error);
    throw error;
  }
};

// AUTH API

export const login = async (
  loginData: LoginData,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
  }
};

export const getProfile = async (token: string): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch profile");
    }

    return data;
  } catch (error: any) {
    console.error("Get profile error:", error);
    throw error;
  }
};

export const updateProfile = async (
  token: string,
  profileData: { name?: string; avatar?: string },
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    return data;
  } catch (error: any) {
    console.error("Update profile error:", error);
    throw error;
  }
};

export const changePasswordFirstLogin = async (
  token: string,
  newPassword: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/change-password-first-login`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to change password");
    }

    return data;
  } catch (error: any) {
    console.error("Change password error:", error);
    throw error;
  }
};

export const changePassword = async (
  token: string,
  passwordData: { currentPassword: string; newPassword: string },
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to change password");
    }

    return data;
  } catch (error: any) {
    console.error("Change password error:", error);
    throw error;
  }
};

export const logout = async (token: string): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Logout failed");
    }

    return data;
  } catch (error: any) {
    console.error("Logout error:", error);
    throw error;
  }
};

// JOB POSTING API

export interface JobPosting {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  category: string;
  salary: string;
  experience: string;
  description: string;
  isActive: boolean;
  views: number;
  applicationsCount: number;
  createdAt: string;
}

export const getAllJobs = async (params?: {
  location?: string;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<any>> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.location) queryParams.append("location", params.location);
    if (params?.category) queryParams.append("category", params.category);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const response = await fetch(
      `${API_BASE_URL}/jobs?${queryParams.toString()}`,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch jobs");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const getJobById = async (
  id: string,
): Promise<ApiResponse<JobPosting>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Job not found");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching job:", error);
    throw error;
  }
};

// INTERNSHIP POSTING API

export interface InternshipPosting {
  _id: string;
  title: string;
  company: string;
  location: string;
  internshipType: string;
  category: string;
  stipend: string;
  duration: string;
  description: string;
  isActive: boolean;
  views: number;
  applicationsCount: number;
  createdAt: string;
}

export const getAllInternships = async (params?: {
  location?: string;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<any>> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.location) queryParams.append("location", params.location);
    if (params?.category) queryParams.append("category", params.category);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const response = await fetch(
      `${API_BASE_URL}/internships?${queryParams.toString()}`,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch internships");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching internships:", error);
    throw error;
  }
};

export const getInternshipById = async (
  id: string,
): Promise<ApiResponse<InternshipPosting>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/internships/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Internship not found");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching internship:", error);
    throw error;
  }
};
// JOB APPLICATION API

export const applyForPosition = async (
  type: "job" | "internship",
  id: string,
  resumeFile: File | null,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const formData = new FormData();

    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    const response = await fetch(
      `${API_BASE_URL}/job-applications/apply/${type}/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit application");
    }

    return data;
  } catch (error: any) {
    console.error("Application submission error:", error);
    throw error;
  }
};

export const getMyApplications = async (
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/job-applications/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch applications");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

// ADMIN/RECRUITER API

export const createJobPosting = async (
  jobData: any,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create job posting");
    }

    return data;
  } catch (error: any) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const createInternshipPosting = async (
  internshipData: any,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/internships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(internshipData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create internship posting");
    }

    return data;
  } catch (error: any) {
    console.error("Error creating internship:", error);
    throw error;
  }
};

export const getMyJobPostings = async (
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/my/postings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch job postings");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching job postings:", error);
    throw error;
  }
};

export const getMyInternshipPostings = async (
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/internships/my/postings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch internship postings");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching internship postings:", error);
    throw error;
  }
};

export const updateJobPosting = async (
  id: string,
  jobData: any,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update job posting");
    }

    return data;
  } catch (error: any) {
    console.error("Error updating job:", error);
    throw error;
  }
};

export const updateInternshipPosting = async (
  id: string,
  internshipData: any,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/internships/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(internshipData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update internship posting");
    }

    return data;
  } catch (error: any) {
    console.error("Error updating internship:", error);
    throw error;
  }
};

export const deleteJobPosting = async (
  id: string,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete job posting");
    }

    return data;
  } catch (error: any) {
    console.error("Error deleting job:", error);
    throw error;
  }
};

export const deleteInternshipPosting = async (
  id: string,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/internships/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete internship posting");
    }

    return data;
  } catch (error: any) {
    console.error("Error deleting internship:", error);
    throw error;
  }
};

// JOB APPLICATION ADMIN API

export interface JobApplication {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  applicationType: "job" | "internship";
  jobPosting?: {
    _id: string;
    title: string;
    company: string;
    location: string;
  };
  internshipPosting?: {
    _id: string;
    title: string;
    company: string;
    location: string;
  };
  resumeUrl: string;
  status: "pending" | "reviewing" | "shortlisted" | "rejected" | "accepted";
  applicationNumber: string;
  appliedAt: string;
  createdAt: string;
}

export const getApplicationsForJob = async (
  jobId: string,
  token: string,
  params?: {
    page?: number;
    limit?: number;
    status?: string;
  },
): Promise<ApiResponse<JobApplication[]>> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);

    const response = await fetch(
      `${API_BASE_URL}/job-applications/${jobId}/applications?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch applications");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: string,
  token: string,
): Promise<ApiResponse<JobApplication>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/job-applications/${applicationId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update application status");
    }

    return data;
  } catch (error: any) {
    console.error("Error updating application status:", error);
    throw error;
  }
};

export const getApplicationStats = async (
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/job-applications/admin/stats`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch application statistics");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching application statistics:", error);
    throw error;
  }
};

export const deleteJobApplication = async (
  applicationId: string,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/job-applications/${applicationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete application");
    }

    return data;
  } catch (error: any) {
    console.error("Error deleting application:", error);
    throw error;
  }
};

// Get applications for a specific internship
export const getApplicationsForInternship = async (
  internshipId: string,
  token: string,
  params?: {
    page?: number;
    limit?: number;
    status?: string;
  },
): Promise<ApiResponse<JobApplication[]>> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);

    const response = await fetch(
      `${API_BASE_URL}/internships/${internshipId}/applications?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch applications");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching internship applications:", error);
    throw error;
  }
};

// MEETING API

export interface MeetingFormData {
  hostName: string;
  hostEmail: string;
  subject?: string;
  description?: string;
}

export interface ScheduleMeetingFormData extends MeetingFormData {
  scheduledDate: string;
  scheduledTime: string;
  duration?: number;
}

export interface Meeting {
  _id: string;
  meetingType: "instant" | "scheduled";
  hostName: string;
  hostEmail: string;
  meetingLink: string;
  calendarEventId?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  duration?: number;
  subject: string;
  description?: string;
  status: "waiting" | "scheduled" | "in-progress" | "completed" | "cancelled";
  meetingNumber: string;
  createdAt: string;
}

export const checkMeetingOAuthStatus = async (): Promise<
  ApiResponse<{
    isConnected: boolean;
    userInfo?: { name: string; email: string; picture: string } | null;
  }>
> => {
  try {
    const response = await fetch(`${API_BASE_URL}/meetings/oauth/status`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error checking OAuth status:", error);
    throw error;
  }
};

export const getMeetingOAuthUrl = async (): Promise<
  ApiResponse<{ authUrl: string }>
> => {
  try {
    const response = await fetch(`${API_BASE_URL}/meetings/oauth/url`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error getting OAuth URL:", error);
    throw error;
  }
};

export const disconnectMeetingOAuth = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/meetings/oauth/disconnect`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to disconnect OAuth");
    }

    return data;
  } catch (error: any) {
    console.error("Error disconnecting OAuth:", error);
    throw error;
  }
};

export const createInstantMeeting = async (
  formData: MeetingFormData,
): Promise<ApiResponse<{ meeting: Meeting; meetingLink: string }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/meetings/instant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create instant meeting");
    }

    return data;
  } catch (error: any) {
    console.error("Instant meeting error:", error);
    throw error;
  }
};

export const scheduleMeeting = async (
  formData: ScheduleMeetingFormData,
): Promise<ApiResponse<{ meeting: Meeting; meetingLink: string }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/meetings/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to schedule meeting");
    }

    return data;
  } catch (error: any) {
    console.error("Schedule meeting error:", error);
    throw error;
  }
};

export const getAllMeetings = async (params?: {
  status?: string;
  type?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<{ meetings: Meeting[]; pagination: any }>> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.type) queryParams.append("type", params.type);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const response = await fetch(
      `${API_BASE_URL}/meetings?${queryParams.toString()}`,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch meetings");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching meetings:", error);
    throw error;
  }
};
