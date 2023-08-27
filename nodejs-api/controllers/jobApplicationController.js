
import { errorHandler } from "../utils/errorHandler.js";
import Job from "../models/jobModel.js";
import JobApplication from "../models/jobApplicationModel.js";
import User from "../models/userModel.js";

export const createJobApplication = async (req, res, next) => {



  try {
    await User.findById(req.id)
    await Job.findById(req.params.id)

  }
  catch (e) {
    return next(errorHandler(500, "Access Denied: Params Not Valide"));
  }
  const job = await Job.findById(req.params.id)
  const jobApplicationOwner = job.userId
  const newJobApplication = new JobApplication({
    jobId: req.params.id,
    jobApplicationOwner: jobApplicationOwner,
    userId: req.id,
    ...req.body,
  });

  try {
    const jobApplication = await newJobApplication.save();
    res.status(200).json({ jobApplication: jobApplication });
  } catch (e) {
    next(errorHandler(500, "Access Denied:Can't Create This Job Application"));
  }
};

export const updateJobApplication = async (req, res, next) => {
  if (!req.research) {
    return next(errorHandler(500, "Access Denied: Unauthorized request"));
  }
};
export const deleteJobApplication = async (req, res, next) => {

  try {
    const job = await JobApplication.findById(req.params.id)

    if (job.userId.toString() !== req.id && req.research) {
      return next(errorHandler(500, "Access Denied: Unauthorized request"));
    }

    await JobApplication.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: "Job Application Deleted" });
  }
  catch (e) {
    return next(errorHandler(500, "Access Denied: Unable to delete Job Application"));
  }
};

export const getAllJobsApplications = async (req, res, next) => {

  try {
    jobs = await JobApplication.find(userId = req.id)
    if (jobs.userId != req.id) {
      next(errorHandler(500, "Access Denied:Can't Get Job Applications ."));
    }
  }
  catch {
    next(errorHandler(500, "Access Denied:Can't Get Job Applications ."));
  }
  const q = req.query
  const filterJobs = {
    userId: req.id,
    ...(q.search && { title: { $regex: q.search, $options: 'i' } }),
    ...(q.city && { city: q.city }),
    ...(q.domain && { domain: q.domain }),
    ...(q.education && { educationLevel: q.education })

  }
  try {
    const jobs = await JobApplication.find(filterJobs)
    if (q.time && q.time.toLowerCase() == 'old') {
      res.status(200).json({ JobApplication: jobs });

    }
    else if (q.time && q.time.toLowerCase() == 'new') {
      const jobs = await JobApplication.find(filterJobs).sort({ createdAt: -1 });
      res.status(200).json({ JobApplication: jobs });

    }
    else {
      res.status(200).json({ jobs: jobs });
    }


  } catch (e) {
    next(errorHandler(500, "Access Denied:Can't Get Jobs ."));
  }
};


export const getJobApplication = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (req.isAuthenticated) {
      res.status(200).json({ job: job });
    } else {
      const { userId, ...jobsWithoutId } = job._doc;
      res.status(200).json({ job: jobsWithoutId });
    }
  } catch (e) {
    next(errorHandler(500, "Access Denied: This Job Not Exists."));
  }
};
