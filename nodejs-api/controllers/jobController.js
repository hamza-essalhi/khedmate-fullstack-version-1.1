import { errorHandler } from "../utils/errorHandler.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";
import FavoriteJob from "../models/favoriteModel.js";

export const createJob = async (req, res, next) => {
  if (!req.research) {
    return next(errorHandler(500, "Access Denied: Unauthorized request"));
  }
  const user = await User.findById(req.id)
  const newJob = new Job({
    ownerFirstName: user.firstName,
    ownerLastName: user.lastName,
    userId: req.id,
    ...req.body,
  });

  try {
    const job = await newJob.save();
    res.status(200).json({ job: job });
  } catch (e) {
    next(errorHandler(500, e));
    next(errorHandler(500, "Access Denied:Can't Create This Job"));
  }
};

export const addFavoriteJob = async (req, res, next) => {
 
  try {
    await Job.findById(req.params.id)
    const newFavoriteJob = new FavoriteJob({
      jobId: req.params.id,
      userId: req.id,
    });
    try {
      const favoriteJob = await newFavoriteJob.save();
      res.status(200).json({ favoriteJob: favoriteJob });
    } catch (e) {
      next(errorHandler(500, "Access Denied: Can't Add This Job To Favorites"));
    }
  }
  catch {
    return next(errorHandler(500, "Access Denied: This Job Does Not Exist"));
  } 
  
};
export const updateJob = async (req, res, next) => {
  if (!req.research) {
    return next(errorHandler(500, "Access Denied: Unauthorized request"));
  }
};
export const deleteJob = async (req, res, next) => {

  try {
    const job = await Job.findById(req.params.id)

    if (job.userId.toString() !== req.id && !req.research) {
      return next(errorHandler(500, "Access Denied: Unauthorized request"));
    }

    await Job.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: "Job Deleted" });
  }
  catch (e) {
    return next(errorHandler(500, "Access Denied: Unable to delete Job"));
  }
};

export const getAllJobs = async (req, res, next) => {

  const q = req.query
  const filterJobs = {
    ...(q.search && { title: { $regex: q.search, $options: 'i' } }),
    ...(q.city && { city: q.city }),
    ...(q.domain && { domain: q.domain }),
    ...(q.education && { educationLevel: q.education })


  }
  try {
    const jobs = await Job.find(filterJobs);

    if (req.isAuthenticated || !req.isAuthenticated) {
      if(q.time && q.time.toLowerCase()=='old'){
        res.status(200).json({ jobs: jobs });

      }
      else if (q.time && q.time.toLowerCase()=='new'){
        const jobs = await Job.find(filterJobs).sort({createdAt:-1});
        res.status(200).json({ jobs: jobs });
        
      }
      else{
        const jobs = await Job.find(filterJobs).sort({createdAt:-1});
        res.status(200).json({ jobs: jobs });
      }
      
    } else {
      if(q.time && q.time.toLowerCase()=='old'){
        res.status(200).json({ jobs: jobs });
      }
      else if (q.time && q.time.toLowerCase()=='new'){
        const jobs = await Job.find(filterJobs).sort({createdAt:-1});
        
  
        res.status(200).json({ jobs: jobs });
      }
      else{
        
  
        res.status(200).json({ jobs: jobs});
      }
      
    }
  } catch (e) {
    next(errorHandler(500, "Access Denied:Can't Get Jobs ."));
  }
};

export const getAllJobsByUser= async (req, res, next) => {

  try {
    const jobs = await Job.find({ userId: req.id}).sort({createdAt:-1});
  
    res.status(200).json({ jobs: jobs });
  } catch (e) {
    next(errorHandler(500, e));
    next(errorHandler(500, "Access Denied:Can't Get Jobs ."));
  }
};


export const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (req.isAuthenticated || !req.isAuthenticated) {
      res.status(200).json({ job: job });
    } else {
      const { userId, ...jobsWithoutId } = job._doc;
      res.status(200).json({ job: jobsWithoutId });
    }
  } catch (e) {
    next(errorHandler(500, "Access Denied: This Job Not Exists."));
  }
};
