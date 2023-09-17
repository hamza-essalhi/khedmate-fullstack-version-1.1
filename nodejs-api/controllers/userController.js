import dotenv from "dotenv";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import Job from "../models/jobModel.js";
import JobApplication from "../models/jobApplicationModel.js";
import bcrypt from "bcrypt";
dotenv.config();


export const deleteUserController = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  

  if (!user) {
    return next(errorHandler(500, "Access Denied: Unable to delete user"));
  } else {
    if (req.id !== user._id.toString()) {
      return next(errorHandler(500, "Access Denied: Unauthorized request"));
    }

    await Job.deleteMany({ userId:user.id })
    await JobApplication.deleteMany({ jobOwner:user.id })
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: "User Deleted" });
  }
};

export const UpdateUser = async (req, res, next) => {
  const slot = parseInt(process.env.SLOT);
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    // Ensure that the request is coming from the authorized user
    if (req.id !== user.id.toString()) {
      return next(errorHandler(403, 'Access Denied: Unauthorized request'));
    }

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        if (key === 'password') {
          const isMatch = bcrypt.compareSync(req.body.password, user.password);
          if (!isMatch) return next(errorHandler(401, 'Incorrect old password'));
          const hashedPassword = await bcrypt.hash(req.body.newPassword, slot);
          user[key] = hashedPassword;
        } else {
          user[key] = req.body[key];
        }
      }
    }

    await user.save();
    res.status(200).json({ user:user });
  } catch (error) {
    // Handle any errors that occur during the update process
    return next(errorHandler(403, 'Access Denied: Unauthorized request'));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user= await User.findById(req.params.id);
    const userInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      img: user.img, 
    };
    res.status(200).json({ user: userInfo });
  } catch (e) {
    return next(errorHandler(403, 'Access Denied: Unauthorized request'));
  }
};