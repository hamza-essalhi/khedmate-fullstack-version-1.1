import mongoose from "mongoose";
const { Schema } = mongoose;
import Employee from "./employeeModel.js";

const JobApplicationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName:{
      type:String,
      required: true,
    },
    lastName:{
      type:String,
      required: true,
    },
    img:{
      type:String,
      required: true,
    },

    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      unique: true,
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    employee: {
      type: Schema.Types.Mixed // Embed the entire Employee schema
    },
    
  },
  {
    timestamps: true,
  }
);

// Middleware to automatically set the lastUpdated field on update operations
JobApplicationSchema.pre("updateOne", function (next) {
  this.set({ lastUpdated: new Date() });
  next();
});

export default mongoose.model("JobApplication", JobApplicationSchema);
