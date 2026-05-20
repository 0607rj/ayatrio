import express from 'express';
import {
  getCandidates,
  getCandidateById,
  updateCandidateStatus,
  deactivateCandidate,
  listJobs,
  listMyJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  listInternships,
  listMyInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
  listApplications,
  listApplicationsForJob,
  listApplicationsForInternship,
  updateApplicationStatus,
} from '../controllers/internalAdmin.controller.js';
import { requireServiceKey, requireActingAdmin } from '../middlewares/internalAdmin.middleware.js';

const router = express.Router();

router.use(requireServiceKey, requireActingAdmin);

router.get('/candidates', getCandidates);
router.get('/candidates/:id', getCandidateById);
router.patch('/candidates/:id/status', updateCandidateStatus);
router.patch('/candidates/:id/deactivate', deactivateCandidate);

router.get('/jobs', listJobs);
router.get('/jobs/my-postings', listMyJobs);
router.post('/jobs', createJob);
router.get('/jobs/:id', getJobById);
router.put('/jobs/:id', updateJob);
router.patch('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);
router.get('/jobs/:id/applications', listApplicationsForJob);

router.get('/internships', listInternships);
router.get('/internships/my-postings', listMyInternships);
router.post('/internships', createInternship);
router.get('/internships/:id', getInternshipById);
router.put('/internships/:id', updateInternship);
router.patch('/internships/:id', updateInternship);
router.delete('/internships/:id', deleteInternship);
router.get('/internships/:id/applications', listApplicationsForInternship);

router.get('/applications', listApplications);
router.patch('/applications/:id/status', updateApplicationStatus);

export default router;
