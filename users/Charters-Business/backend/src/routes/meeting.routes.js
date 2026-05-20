import express from "express";
import {
  getOAuthUrl,
  handleOAuthCallback,
  checkOAuthStatus,
  disconnectOAuth,
  createInstantMeeting,
  scheduleMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeetingStatus,
} from "../controllers/meeting.controller.js";

const router = express.Router();

// OAuth routes (no auth required for initial setup)
router.get("/oauth/url", getOAuthUrl);
router.get("/oauth/callback", handleOAuthCallback);
router.get("/oauth/status", checkOAuthStatus);
router.post("/oauth/disconnect", disconnectOAuth);

// Meeting routes
router.post("/instant", createInstantMeeting);
router.post("/schedule", scheduleMeeting);
router.get("/", getAllMeetings);
router.get("/:id", getMeetingById);
router.put("/:id/status", updateMeetingStatus);

export default router;
