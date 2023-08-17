import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    research: {
      type: Boolean,
      default: false,
      required:true
    },
    img: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    isActive:{
      type:Boolean,
      default:false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
