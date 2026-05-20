import express from 'express';
import * as jobPostingController from '../controllers/jobPosting.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', jobPostingController.getAllJobPostings);
router.get('/:id', jobPostingController.getJobPostingById);

// Protected routes - Admin/Recruiter only
router.post(
  '/',
  protect,
  authorize('admin', 'recruiter'),
  jobPostingController.createJobPosting
);

router.get(
  '/my/postings',
  protect,
  authorize('admin', 'recruiter'),
  jobPostingController.getMyJobPostings
);

router.put(
  '/:id',
  protect,
  authorize('admin', 'recruiter'),
  jobPostingController.updateJobPosting
);

router.delete(
  '/:id',
  protect,
  authorize('admin', 'recruiter'),
  jobPostingController.deleteJobPosting
);

// Admin only
router.get(
  '/admin/stats',
  protect,
  authorize('admin'),
  jobPostingController.getJobStats
);

export default router;
