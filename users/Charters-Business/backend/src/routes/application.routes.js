import express from 'express';
import * as applicationController from '../controllers/application.controller.js';
import { protect, authorize, optionalAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public route - Submit application
router.post('/', optionalAuth, applicationController.submitApplication);

// Protected routes (require authentication)
router.get('/user', protect, applicationController.getUserApplications);

// Public route - Get application by application number
router.get('/number/:applicationNumber', applicationController.getApplicationByNumber);

// Admin only routes
router.get('/stats', protect, authorize('admin'), applicationController.getApplicationStats);
router.get('/', protect, authorize('admin'), applicationController.getAllApplications);
router.get('/:id', protect, applicationController.getApplicationById);
router.put('/:id/status', protect, authorize('admin'), applicationController.updateApplicationStatus);
router.delete('/:id', protect, authorize('admin'), applicationController.deleteApplication);

export default router;
