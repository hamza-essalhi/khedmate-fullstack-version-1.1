import { errorHandler } from "../utils/errorHandler.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

export const createJob = async (req, res, next) => {
  if (!req.research) {
    return next(errorHandler(500, "Access Denied: Unauthorized request"));
  }
  const user=await User.findById(req.id)
  const newJob = new Job({
    ownerFirstName:user.firstName,
    ownerLastName:user.lastName,
    userId: req.id,
    ...req.body,
  });

  try {
    const job = await newJob.save();
    res.status(200).json({ job: job });
  } catch (e) {
    next(errorHandler(500, "Access Denied:Can't Create This Job"));
  }
};

export const updateJob = async (req, res, next) => {
  if (!req.research) {
    return next(errorHandler(500, "Access Denied: Unauthorized request"));
  }
};
export const deleteJob = async (req, res, next) => {
  
  try{
    const job =await Job.findById(req.params.id)

    if(job.userId.toString()!==req.id && !req.research){
        return next(errorHandler(500, "Access Denied: Unauthorized request"));
    }

    await Job.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: "Job Deleted" });
  }
  catch(e){
    return next(errorHandler(500, "Access Denied: Unable to delete Job"));
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();

    if (req.isAuthenticated) {
      res.status(200).json({ jobs: jobs });
    } else {
      // If no token, remove the id field from each job object
      const jobsWithoutId = jobs.map((job) => {
        const { _id,userId, ...jobWithoutId } = job.toObject();
        return jobWithoutId;
      });

      res.status(200).json({ jobs: jobsWithoutId });
    }
  } catch (e) {
    next(errorHandler(500, "Access Denied:Can't Get Jobs ."));
  }
};


export const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (req.isAuthenticated) {
      res.status(200).json({ job: job });
    } else {
      const { userId, ...jobsWithoutId } = job._doc;
      console.log(jobsWithoutId);
      res.status(200).json({ job: jobsWithoutId });
    }
  } catch (e) {
    next(errorHandler(500, "Access Denied: This Job Not Exists."));
  }
};
