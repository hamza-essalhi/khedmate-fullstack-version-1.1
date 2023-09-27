import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversionSchema = new Schema(
  {
    conversionGeneId: {
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
      
    },
    toUnitImg: {
      type: String,
      
    },
    
    fromUnitLastSeen: {
      type: Date,
      required: false,
    },
    toUnitLastSeen: {
      type: Date,
      required: false,
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
