import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.model.js';

const AUTH_COOKIE_NAME = 'authToken';

function getRequestToken(req) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return req.headers.authorization.split(' ')[1];
  }

  if (req.cookies?.[AUTH_COOKIE_NAME]) {
    return req.cookies[AUTH_COOKIE_NAME];
  }

  return null;
}

function isUserActive(user) {
  if (!user) return false;
  if (typeof user.isAccountActive === 'function') {
    return user.isAccountActive();
  }

  if (user.status) {
    return user.status === 'active';
  }

  return Boolean(user.isActive);
}

// Standard protect middleware
export const protect = asyncHandler(async (req, res, next) => {
  const token = getRequestToken(req);

  if (!token) {
    throw new ApiError(401, 'Not authorized to access this route');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      throw new ApiError(401, 'User not found');
    }

    if (!isUserActive(req.user)) {
      throw new ApiError(403, 'Your account is disabled or blocked. Please contact support.');
    }

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(401, 'Not authorized to access this route');
  }
});

// Optional auth middleware (doesn't throw error if no token)
export const optionalAuth = asyncHandler(async (req, res, next) => {
  const token = getRequestToken(req);

  // If no token, continue without setting req.user
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user || !isUserActive(user)) {
      req.user = null;
      return next();
    }

    req.user = user;
    next();
  } catch (error) {
    // Token invalid, continue without user
    req.user = null;
    next();
  }
});

// Authorize roles middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Not authorized');
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `User role '${req.user.role}' is not authorized to access this route`
      );
    }
    next();
  };
};
