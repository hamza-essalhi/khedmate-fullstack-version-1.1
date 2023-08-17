import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversionSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

module.exports = mongoose.model("Conversion", ConversionSchema);
