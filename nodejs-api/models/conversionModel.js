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

    fromUnitName: {
      type: String,
      required: true,
    },
    toUnitName: {
      type: String,
      required: true,
    },
    fromUnitImg: {
      type: String,
      required: true,
    },
    toUnitImg: {
      type: String,
      required: true,
    },
    
    fromUnitLastSeen: {
      type: Date,
      required: true,
    },
    toUnitLastSeen: {
      type: Date,
      required: true,
    },
    readedByFromUnit:{
      type:Boolean,
      required:true
    },
    readedByToUnit:{
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
