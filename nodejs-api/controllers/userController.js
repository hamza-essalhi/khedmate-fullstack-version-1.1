import dotenv from "dotenv";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
dotenv.config();

export const getUser = async (req, res, next) => {};

export const deleteUserController = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(errorHandler(500, "Access Denied: Unable to delete user"));
  } else {
    if (req.id !== user._id.toString()) {
      return next(errorHandler(500, "Access Denied: Unauthorized request"));
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: "User Deleted" });
  }
};
