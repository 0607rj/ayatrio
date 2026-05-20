import express from "express";
import * as jobApplicationController from "../controllers/jobApplication.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import {
  uploadResume,
  handleUploadError,
} from "../middlewares/upload.middleware.js";

const router = express.Router();

// Protected route - Apply for job/internship (User must be logged in)
router.post(
  "/apply/:type/:id",
  protect,
  uploadResume,
  handleUploadError,
  jobApplicationController.applyForPosition
);

// Protected route - Get my applications
router.get("/my", protect, jobApplicationController.getMyApplications);

// Protected route - Get single application
router.get("/:id", protect, jobApplicationController.getApplicationById);

// Admin/Recruiter routes
router.get(
  "/",
  protect,
  authorize("admin", "recruiter"),
  jobApplicationController.getAllApplications
);

router.put(
  "/:id/status",
  protect,
  authorize("admin", "recruiter"),
  jobApplicationController.updateApplicationStatus
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  jobApplicationController.deleteApplication
);

// Admin only - Statistics
router.get(
  "/admin/stats",
  protect,
  authorize("admin"),
  jobApplicationController.getApplicationStats
);
router.get(
  "/:id/applications",
  protect,
  authorize("admin"),
  jobApplicationController.getAllApplicationsForAdmin
);
export default router;
