
import { errorHandler } from "../utils/errorHandler.js";
import Job from "../models/jobModel.js";
import JobApplication from "../models/jobApplicationModel.js";
import User from "../models/userModel.js";
import Employee from "../models/employeeModel.js";

export const createJobApplication = async (req, res, next) => {

  try {
    await User.findById(req.id)
    await Job.findById(req.params.id)
    await Employee.find({userId:req.id})
  }
  catch (e) {
    return next(errorHandler(500, "Access Denied: Params Not Valide"));
  }
  const employee = await Employee.findOne({ userId: req.id });
    if (!employee) {
      return next(errorHandler(404, "Employee not found"));
    }
  const user =await User.findById(req.id)
  const job = await Job.findById(req.params.id)
  const jobOwner = job.userId
  const newJobApplication = new JobApplication({
    jobId: req.params.id,
    jobOwner: jobOwner,
    userId: req.id,
    firstName:user.firstName,
    lastName:user.lastName,
    img:user.img,
    employee: {
      email:employee.email || '',
      phone:employee.phone || '',
      education: employee.education || [],
      jobExperience:employee.jobExperience || [],
      resume:employee.resume || '',
      motivationLetter:employee.motivationLetter || []
    },
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
  try {
    
    const updated = await JobApplication.findOneAndUpdate({jobOwner:req.id}, req.body, {
        new: true,
    });
    if (!updated) {
        return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(updated);
} catch (error) {

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
    let filterJobs;
    const user = await User.findById(req.id)
    const q = req.query;
    if (user.research){
       filterJobs = {
        jobOwner: req.id, // Filter by the specific user
        ...(q.search && { institution: { $regex: q.search, $options: 'i' } }), // Filter by title search
        ...(q.dogree && { dogree: q.dogree }), // Filter by city
        ...(q.fieldOfStudy && { fieldOfStudy: q.fieldOfStudy }), // Filter by domain
      };
    }
    else{
       filterJobs = {
        userId: req.id, // Filter by the specific user
        ...(q.search && { institution: { $regex: q.search, $options: 'i' } }), // Filter by title search
        ...(q.dogree && { dogree: q.dogree }), // Filter by city
        ...(q.fieldOfStudy && { fieldOfStudy: q.fieldOfStudy }), // Filter by domain
      };
    }
    
    
   
    const jobs = await JobApplication.find(filterJobs).sort({createdAt:-1});
    if (q.time && q.time.toLowerCase() === 'new') {
      jobs.sort((a, b) => b.createdAt - a.createdAt); // Sort by createdAt in descending order
    } else if (q.time && q.time.toLowerCase() === 'old') {
      jobs.sort((a, b) => a.createdAt - b.createdAt); // Sort by createdAt in ascending order
    }
    
     // Check if any job applications were found
     if (jobs.length === 0) {
      // If no applications are found, return an error
      return next(errorHandler(200, "No Job Applications found for this user."));
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
    
    if (job.jobOwner.toString() !== req.id) {
      return next(errorHandler(500, "Access Denied: Unauthorized request"));
    }
    res.status(200).json({ JobApplication: job });
  } catch (e) {
    next(errorHandler(500, "Access Denied: This Job Not Exists."));
  }
};
