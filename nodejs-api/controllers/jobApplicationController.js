
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
    const q = req.query;
    const filterJobs = {
      userId: req.id, // Filter by the specific user
      ...(q.search && { title: { $regex: q.search, $options: 'i' } }), // Filter by title search
      ...(q.city && { city: q.city }), // Filter by city
      ...(q.domain && { domain: q.domain }), // Filter by domain
      ...(q.education && { educationLevel: q.education }), // Filter by education level
    };
   

   

    // Find job applications matching the filter criteria
    const jobs = await JobApplication.find(filterJobs);
    if (q.time && q.time.toLowerCase() === 'new') {
      jobs.sort((a, b) => b.createdAt - a.createdAt); // Sort by createdAt in descending order
    } else if (q.time && q.time.toLowerCase() === 'old') {
      jobs.sort((a, b) => a.createdAt - b.createdAt); // Sort by createdAt in ascending order
    }
    
     // Check if any job applications were found
     if (jobs.length === 0) {
      // If no applications are found, return an error
      return next(errorHandler(404, "No Job Applications found for this user."));
    }
    res.status(200).json({ JobApplications: jobs });
  } catch (e) {
    // Handle any errors that occur during the process
    next(errorHandler(500, "An error occurred while fetching Job Applications."));
  }
};

export const getJobApplication = async (req, res, next) => {
  try {
    const job = await JobApplication.findById(req.params.id);
    
    if (job.jobApplicationOwner.toString() !== req.id) {
      return next(errorHandler(500, "Access Denied: Unauthorized request"));
    }
    res.status(200).json({ JobApplication: job });
  } catch (e) {
    next(errorHandler(500, "Access Denied: This Job Not Exists."));
  }
};
