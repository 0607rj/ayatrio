import express from 'express';
import * as counselingController from '../controllers/counseling.controller.js';
import { protect, authorize, optionalAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public route - Submit counseling request
router.post('/', optionalAuth, counselingController.submitCounseling);

// Protected routes (require authentication)
router.get('/user', protect, counselingController.getUserCounselings);

// Admin only routes
router.get('/stats', protect, authorize('admin'), counselingController.getCounselingStats);
router.get('/', protect, authorize('admin'), counselingController.getAllCounselings);
router.get('/:id', protect, counselingController.getCounselingById);
router.put('/:id/status', protect, authorize('admin'), counselingController.updateCounselingStatus);
router.delete('/:id', protect, authorize('admin'), counselingController.deleteCounseling);

export default router;
