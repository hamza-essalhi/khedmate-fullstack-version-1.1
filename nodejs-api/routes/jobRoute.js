import express from "express";
import {getJob,getAllJobs,deleteJob,createJob,addFavoriteJob,getAllJobsByUser} from "../controllers/jobController.js";
import { tokenChecker,filterData } from "../middleware/jwt.js";

const router = express.Router()

router.post('/AddToFavorite/:id',tokenChecker,addFavoriteJob)
router.post('/create',tokenChecker,createJob)
router.get('/',filterData,getAllJobs)
router.get('/userJobs',tokenChecker,getAllJobsByUser)
router.get('/:id',filterData,getJob)
router.delete('/:id',tokenChecker,deleteJob)


export default router