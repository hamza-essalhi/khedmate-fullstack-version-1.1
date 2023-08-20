import mongoose from "mongoose";
const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ownerFirstName:{
      type: String,
      required: true,
    },
    ownerLastName:{
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    experience: {
      type: [String],
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    educationLevel: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    keywords: {
      type: [String],
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", JobSchema);
