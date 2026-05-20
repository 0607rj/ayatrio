import express from "express";
import * as internshipPostingController from "../controllers/internshipPosting.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", internshipPostingController.getAllInternshipPostings);
router.get("/:id", internshipPostingController.getInternshipPostingById);

// Protected routes - Admin/Recruiter only
router.post(
  "/",
  protect,
  authorize("admin", "recruiter"),
  internshipPostingController.createInternshipPosting
);

router.get(
  "/my/postings",
  protect,
  authorize("admin", "recruiter"),
  internshipPostingController.getMyInternshipPostings
);

router.put(
  "/:id",
  protect,
  authorize("admin", "recruiter"),
  internshipPostingController.updateInternshipPosting
);

router.delete(
  "/:id",
  protect,
  authorize("admin", "recruiter"),
  internshipPostingController.deleteInternshipPosting
);

// Admin only
router.get(
  "/admin/stats",
  protect,
  authorize("admin"),
  internshipPostingController.getInternshipStats
);

// Get applications for a specific internship
router.get(
  "/:id/applications",
  protect,
  authorize("admin", "recruiter"),
  internshipPostingController.getAllApplicationsForInternship
);

export default router;
