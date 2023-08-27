import mongoose from "mongoose";
const { Schema } = mongoose;

const JobApplicationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobApplicationOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    coverLetter: {
      type: String,
    },
    resumeLink: {
      type: String,
      required: true,
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    lastUpdated: {
      type: Date,
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
