import mongoose from "mongoose";
const { Schema } = mongoose;

const JobExperienceSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  
  domain: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
});

const EducationSchema = new Schema({
  institution: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
});

const EmployeeSchema = new Schema(
  
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    resume: {
      type: String,
    },
    jobExperience: [JobExperienceSchema],
    education: [EducationSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Employee", EmployeeSchema);
