import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Application from "../models/Application.model.js";
import JobApplication from "../models/JobApplication.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import admin from "../config/firebase.config.js";

const AUTH_COOKIE_NAME = "authToken";
const AUTH_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
function isUserActive(user) {
  if (!user) return false;
  if (typeof user.isAccountActive === "function") {
    return user.isAccountActive();
  }

  if (user.status) {
    return user.status === "active";
  }

  return Boolean(user.isActive);
}

function getCookieOptions(req, httpOnly = false) {
  const isLocalhost = req.get("host")?.includes("localhost");
  const isProduction = process.env.NODE_ENV === "production";
  const cookieDomain = process.env.COOKIE_DOMAIN;

  // In production or when accessed via public URL, SameSite=None and Secure=true are required.
  // We use SameSite=None if we're not on localhost to ensure cross-domain compatibility.
  const useSecure = !isLocalhost || isProduction;

  return {
    path: "/",
    sameSite: useSecure ? "none" : "lax",
    secure: useSecure,
    httpOnly: httpOnly,
    maxAge: AUTH_COOKIE_MAX_AGE,
    ...(cookieDomain && { domain: cookieDomain }),
  };
}

function setAuthCookie(req, res, token) {
  // session token is not httpOnly because frontend needs to read it for lib/utils/cookies.ts participation
  res.cookie(AUTH_COOKIE_NAME, token, getCookieOptions(req, false));
}

function clearAuthCookie(req, res) {
  const options = getCookieOptions(req, false);
  delete options.maxAge;
  res.clearCookie(AUTH_COOKIE_NAME, options);
}

const TRUSTED_DEVICE_COOKIE_NAME = "trustedDevice";
const TRUSTED_DEVICE_MAX_AGE = 180 * 24 * 60 * 60 * 1000; // 180 days

function setTrustedDeviceCookie(req, res, rawToken) {
  const options = getCookieOptions(req, true); // httpOnly for security
  options.maxAge = TRUSTED_DEVICE_MAX_AGE;
  res.cookie(TRUSTED_DEVICE_COOKIE_NAME, rawToken, options);
}

async function setupTrustedDevice(req, res, user) {
  // Fix 1: Safe initialization — old users may not have this field yet
  if (!Array.isArray(user.trustedDevices)) {
    user.trustedDevices = [];
  }

  const trustedCookie = req.cookies && req.cookies["trustedDevice"];

  if (trustedCookie) {
    const [userId, plainToken] = trustedCookie.split(":");
    if (userId === user._id.toString()) {
      for (const device of user.trustedDevices) {
        const isMatch = await bcrypt.compare(plainToken, device.tokenHash);
        if (isMatch) {
          // Existing device — update lastUsed and refresh cookie max-age
          device.lastUsed = new Date();
          await user.save();
          setTrustedDeviceCookie(req, res, trustedCookie);
          return;
        }
      }
    }
  }

  const plainToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = await bcrypt.hash(plainToken, 10);

  // Fix 2 & 3: Evict oldest device without mutating array via sort
  // Use safe Date fallback for missing/corrupted createdAt values
  const MAX_TRUSTED_DEVICES = 3;
  if (user.trustedDevices.length >= MAX_TRUSTED_DEVICES) {
    let oldestIndex = 0;
    let oldestTime = new Date(user.trustedDevices[0]?.createdAt ?? 0).getTime();

    for (let i = 1; i < user.trustedDevices.length; i++) {
      const t = new Date(user.trustedDevices[i]?.createdAt ?? 0).getTime();
      if (t < oldestTime) {
        oldestTime = t;
        oldestIndex = i;
      }
    }
    user.trustedDevices.splice(oldestIndex, 1);
  }

  user.trustedDevices.push({
    tokenHash,
    createdAt: new Date(),
    lastUsed: new Date(),
  });
  await user.save();

  const cookieValue = `${user._id.toString()}:${plainToken}`;
  setTrustedDeviceCookie(req, res, cookieValue);
}

function clearTrustedDeviceCookie(req, res) {
  const options = getCookieOptions(req, true);
  delete options.maxAge;
  res.clearCookie(TRUSTED_DEVICE_COOKIE_NAME, options);
}

async function markLastLogin(user) {
  const loginTime = new Date();
  user.lastLogin = loginTime;

  // Avoid full-document validation on legacy users while still recording login.
  await User.updateOne({ _id: user._id }, { $set: { lastLogin: loginTime } });
}

// Check user exists
export const checkUserExists = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    throw new ApiError(400, "Please provide phone number");
  }

  const user = await User.findOne({ phoneNumber });
  res.status(200).json(new ApiResponse(200, { exists: !!user }, "User check complete"));
});

// Login
export const login = asyncHandler(async (req, res) => {
  const { email, phoneNumber, password } = req.body;
  const identifier = email || phoneNumber;

  // Validation
  if (!identifier || !password) {
    throw new ApiError(400, "Please provide email/phone and password");
  }

  // Find user with password field
  const user = await User.findOne({
    $or: [{ email: identifier }, { phoneNumber: identifier }]
  })
    .select("+password +isFirstLogin")
    .populate("applicationId");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Setting id for code generation
  //req.session.userId = user._id;

  // Check password
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Check if account is active
  if (!isUserActive(user)) {
    throw new ApiError(
      401,
      "Your account has been deactivated. Please contact support.",
    );
  }

  // Update last login without triggering unrelated schema validation.
  await markLastLogin(user);

  // Generate JWT token & setup trusted device
  const token = user.generateToken();
  setAuthCookie(req, res, token);
  await setupTrustedDevice(req, res, user);

  // Get all applications for this user
  const applications = await Application.find({ userId: user._id })
    .select(
      "applicationNumber status program counselingDate counselingTime createdAt",
    )
    .sort({ createdAt: -1 });

  // Get last job application to get resume info
  const lastJobApplication = await JobApplication.findOne({ user: user._id })
    .sort("-createdAt")
    .select("resume createdAt")
    .lean();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          courseInterestedIn: user.courseInterestedIn || null,
          role: user.role,
          lastLogin: user.lastLogin,
          isFirstLogin: user.isFirstLogin,
          lastResumeUrl: lastJobApplication?.resume || null,
          lastResumeUploadedAt: lastJobApplication?.createdAt || null,
        },
        token,
        applications,
        application: applications[0] || null,
      },
      user.isFirstLogin
        ? "Login successful. Please change your password."
        : "Login successful",
    ),
  );
});

// Change password on first login
export const changePasswordFirstLogin = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    throw new ApiError(400, "Please provide new password");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters long");
  }

  const user = await User.findById(req.user.id).select(
    "+password +isFirstLogin +tempPassword",
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Update password and mark first login
  user.password = newPassword;
  user.isFirstLogin = false;
  user.tempPassword = null;
  await user.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        "Password changed successfully! Welcome to Charters Business.",
      ),
    );
});

// Get current user profile
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("+isFirstLogin")
    .populate({
      path: "applicationId",
      select:
        "applicationNumber status program location mobileNo countryCode counselingDate counselingTime createdAt",
    });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Get all applications for this user
  const applications = await Application.find({ userId: user._id })
    .select(
      "applicationNumber status program counselingDate counselingTime createdAt",
    )
    .sort({ createdAt: -1 });

  // Get last job application resume info
  const lastJobApplication = await JobApplication.findOne({ user: user._id })
    .sort("-createdAt")
    .select("resume createdAt")
    .lean();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        ...user.toObject(),
        applications,
        lastResumeUrl: lastJobApplication?.resume || null,
        lastResumeUploadedAt: lastJobApplication?.createdAt || null,
      },
      "User profile retrieved successfully",
    ),
  );
});

// Update profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar } = req.body;

  const fieldsToUpdate = {};
  if (name) fieldsToUpdate.name = name;
  if (avatar) fieldsToUpdate.avatar = avatar;

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  }).populate("applicationId");

  // Get last job application resume info
  const lastJobApplication = await JobApplication.findOne({ user: user._id })
    .sort("-createdAt")
    .select("resume createdAt")
    .lean();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        ...user.toObject(),
        lastResumeUrl: lastJobApplication?.resume || null,
        lastResumeUploadedAt: lastJobApplication?.createdAt || null,
      },
      "Profile updated successfully",
    ),
  );
});

// Change password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Please provide current and new password");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters long");
  }

  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(401, "Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Password changed successfully"));
});

// Logout
export const logout = asyncHandler(async (req, res) => {
  clearAuthCookie(req, res);
  res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
});

// Firebase OTP Login
export const firebaseLogin = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    throw new ApiError(400, "Please provide Firebase ID token");
  }

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { phone_number } = decodedToken;

    if (!phone_number) {
      throw new ApiError(400, "Phone number not found in token");
    }

    // Find user by phone number
    const user = await User.findOne({ phoneNumber: phone_number })
      .select("+isFirstLogin")
      .populate("applicationId");

    if (!user) {
      // User not found - Client should redirect to signup
      return res
        .status(404)
        .json(
          new ApiResponse(404, null, "User not registered. Please sign up."),
        );
    }

    if (!isUserActive(user)) {
      throw new ApiError(
        401,
        "Your account has been deactivated. Please contact support.",
      );
    }

    // Update last login without triggering unrelated schema validation.
    await markLastLogin(user);

    // Generate JWT token & trusted device token
    const token = user.generateToken();
    setAuthCookie(req, res, token);
    await setupTrustedDevice(req, res, user);

    // Get all applications for this user
    const applications = await Application.find({ userId: user._id })
      .select(
        "applicationNumber status program counselingDate counselingTime createdAt",
      )
      .sort({ createdAt: -1 });

    // Get last job application to get resume info
    const lastJobApplication = await JobApplication.findOne({ user: user._id })
      .sort("-createdAt")
      .select("resume createdAt")
      .lean();

    res.status(200).json(
      new ApiResponse(
        200,
        {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            courseInterestedIn: user.courseInterestedIn || null,
            role: user.role,
            lastLogin: user.lastLogin,
            isFirstLogin: user.isFirstLogin,
            lastResumeUrl: lastJobApplication?.resume || null,
            lastResumeUploadedAt: lastJobApplication?.createdAt || null,
          },
          token,
          applications,
          application: applications[0] || null,
          hasTrustedDevice: true,
        },
        "Login successful",
      ),
    );
  } catch (error) {
    console.error("Firebase token verification error:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, "Invalid or expired Firebase token");
  }
});

// Firebase OTP Signup
export const firebaseSignup = asyncHandler(async (req, res) => {
  const { idToken, name, email, program, password } = req.body;

  if (!idToken || !name || !email || !program || !password) {
    throw new ApiError(
      400,
      "Please provide ID token, name, email, password, and course selection",
    );
  }

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { phone_number, uid } = decodedToken;

    if (!phone_number) {
      throw new ApiError(400, "Phone number not found in token");
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ phoneNumber: phone_number }, { email }],
    });

    if (existingUser) {
      throw new ApiError(400, "User already exists with this phone or email");
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber: phone_number,
      courseInterestedIn: program,
      lastLogin: new Date(),
      isFirstLogin: false,
    });

    // Generate JWT token & trusted device token
    const token = user.generateToken();
    setAuthCookie(req, res, token);
    await setupTrustedDevice(req, res, user);

    res.status(201).json(
      new ApiResponse(
        201,
        {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            courseInterestedIn: user.courseInterestedIn || null,
            role: user.role,
            lastLogin: user.lastLogin,
            isFirstLogin: user.isFirstLogin,
          },
          token,
          applications: [],
          application: null,
          hasTrustedDevice: true,
        },
        "Account created and login successful",
      ),
    );
  } catch (error) {
    console.error("Firebase signup error:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, "Invalid or expired Firebase token");
  }
});

// Quick Login removed per security requirements


// Generate Redirect Code
export const redirectCode = asyncHandler(async (req, res) => {
  const { _id: userId, email } = req.user;
  const code = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
  res.status(200).json(
    new ApiResponse(
      200,
      { code },
      "Redirect code generated successfully",
    ),
  );
});

// ExchangeCode
export const exchangeCode = asyncHandler(async (req, res) => {
  const { code } = req.body;
  if (!code) {
    throw new ApiError(400, "Please provide code");
  }
  const decodedToken = jwt.verify(code, process.env.JWT_SECRET);
  const { userId, email } = decodedToken;
  
  let user = null;
  if (userId) user = await User.findById(userId);
  if (!user && email) user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const token = user.generateToken();
  setAuthCookie(req, res, token);
  res.status(200).json(
    new ApiResponse(
      200,
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          lastLogin: user.lastLogin,
          isFirstLogin: user.isFirstLogin,
        },
      },
      "Code exchanged successfully",
    ),
  );
});