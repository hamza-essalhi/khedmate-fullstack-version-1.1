import express from "express";
import {getJobApplication,getAllJobsApplications,deleteJobApplication,createJobApplication,updateJobApplication} from "../controllers/jobApplicationController.js";
import { tokenChecker } from "../middleware/jwt.js";

const router = express.Router()

router.post('/create/:id',tokenChecker,createJobApplication)
router.get('/',tokenChecker,getAllJobsApplications)
router.get('/:id',tokenChecker,getJobApplication)
router.put('/:id',tokenChecker,updateJobApplication)
router.delete('/:id',tokenChecker,deleteJobApplication)

export default router
