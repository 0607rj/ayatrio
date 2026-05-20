import User from "../models/User.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import ActiveSession from "../models/ActiveSession.model.js";
import { syncLeadFieldsOnUser } from "../services/userLeadSync.service.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});


export const updateUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});

export const mergeTracking = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Not authorized");
  }

  const { sessionId, deviceId, pageViewsTotal, uniquePages, chatInteractions } = req.body || {};

  const visitCount = Number(pageViewsTotal || 0);
  const pagesNavigated = Array.isArray(uniquePages) ? uniquePages.length : 0;
  const chatCount = Number(chatInteractions || 0);

  const viewerMetrics = {
    visitCount,
    pagesNavigated,
    chatInteractions: chatCount,
    loggedIn: true,
    deviceId: deviceId || null,
    sessionId: sessionId || null,
    lastMergedAt: new Date(),
  };

  const viewerScore = computeViewerScore({
    visitCount,
    loggedIn: true,
    pagesNavigated,
    chatInteractions: chatCount,
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { viewerScore, viewerMetrics },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await syncLeadFieldsOnUser(user, {
    trackingData: req.body,
    loggedIn: true,
  });

  res
    .status(200)
    .json(new ApiResponse(200, { viewerScore: user.viewerScore, viewerMetrics: user.viewerMetrics }, "Tracking merged successfully"));
});

export const getMyViewerScore = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Not authorized");
  }

  const user = await User.findById(req.user._id).select("viewerScore viewerMetrics");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      { viewerScore: user.viewerScore || 0, viewerMetrics: user.viewerMetrics || {} },
      "Viewer score fetched successfully"
    )
  );
});

export const getViewerLeaderboard = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit || 50), 200);

  const users = await User.find()
    .select("name email role viewerScore viewerMetrics createdAt")
    .sort({ viewerScore: -1, "viewerMetrics.lastMergedAt": -1 })
    .limit(limit);

  res.status(200).json(new ApiResponse(200, users, "Viewer leaderboard fetched successfully"));
});
// POST /api/v1/users/heartbeat (optionalAuth)
export const heartbeat = asyncHandler(async (req, res) => {
  const { sessionId, deviceId } = req.body;

  if (!sessionId) {
    throw new ApiError(400, "sessionId required");
  }

  await ActiveSession.findOneAndUpdate(
    { sessionId },
    {
      sessionId,
      deviceId: deviceId || null,
      userId: req.user ? req.user._id : null,
      lastSeenAt: new Date(),
    },
    { upsert: true, new: true }
  );

  res.status(200).json(new ApiResponse(200, null, "Heartbeat updated"));
});

export const clearHeartbeat = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    throw new ApiError(400, "sessionId required");
  }

  await ActiveSession.findOneAndDelete({ sessionId });

  res.status(200).json(new ApiResponse(200, null, "Heartbeat cleared"));
});

// GET /api/v1/users/concurrent
export const concurrentCount = asyncHandler(async (req, res) => {
  const count = await ActiveSession.countDocuments({});
  res.status(200).json(new ApiResponse(200, { concurrentUsers: count }, "Concurrent users fetched"));
});
