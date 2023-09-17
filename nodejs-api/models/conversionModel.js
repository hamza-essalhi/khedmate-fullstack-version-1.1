import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,

    },
    fromUnit: {
      type: String,
      required: true,
    },
    toUnit: {
      type: String,
      required: true,
    },
    readedByfromUnit:{
      type:Boolean,
      required:true
    },
    readedBytoUnit:{
      type:Boolean,
      required:true
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversion", ConversionSchema);
