
import { errorHandler } from "../utils/errorHandler.js";
import { generateUniqueId } from "../utils/generateUnId.js";
import User from "../models/userModel.js";
import Conversion from "../models/conversionModel.js";
import Message from "../models/messageModel.js";

export const createConversation = async (req, res, next) => {


  try {
    await User.findById(req.body.toUnit)
    await User.findById(req.id)
  }
  catch {

    return next(errorHandler(500, "Access Denied: Unable to Create This Conversation or An Error Occurred While Processing the Request"));
  }
  const toUnit = await User.findById(req.body.toUnit)
  const fromUnit = await User.findById(req.id)
  const id = generateUniqueId(`${req.id}${req.body.toUnit}`)
  const newConversation = new Conversion(
    {
      conversionGeneId: id,
      fromUnit: req.id,
      toUnit: req.body.toUnit,
      readedByFromUnit: true,
      readedByToUnit: false,
      fromUnitName: `${fromUnit.firstName} ${fromUnit.lastName}`,
      toUnitName: `${toUnit.firstName} ${toUnit.lastName}`,
      fromUnitImg: fromUnit.img,
      toUnitImg: toUnit.img,
    }
  )
  try {
    const conversation = await newConversation.save()
    res.status(200).json({ conversation: conversation });
  }
  catch (e) {
    next(errorHandler(500, e));

    next(errorHandler(500, "Access Denied:Can't Create This Conversation"));
  }

};

export const updateConversation = async (req, res, next) => {

};
export const deleteConversation = async (req, res, next) => {
  try {
    const conversation = await Conversion.findOne({conversionGeneId:req.params.id})

    if (conversation.fromUnit.toString() === req.id || conversation.toUnit.toString() === req.id) {
      await Conversion.findByIdAndDelete(conversation._id)
    await Message.deleteMany({ conversationId: req.params.id });
    res.status(200).json({ success: "Conversion Deleted" });
      
    }
    else{
      return next(errorHandler(500, "Access Denied: Unauthorized request"));
    }

    
  }
  catch (e) {
    // return next(errorHandler(500, "Access Denied: Unable to delete Conversation"));
  }

};

export const getAllConversations = async (req, res, next) => {
  try {
    const conversation = await Conversion.find({
      $or: [{ fromUnit: req.id }, { toUnit: req.id }]
    });
    res.status(200).json({ conversation: conversation });
  }
  catch (e) {
    next(errorHandler(500, "Access Denied:Can't Get This Conversation"));
  }


};

export const getConversation = async (req, res, next) => {
  const id = generateUniqueId(req.params.id)
  try {
    const conversation = await Conversion.findOne({conversionGeneId:req.params.id})
    if (conversation.lenght == 0) {
      return next(errorHandler(500, "Access Denied:Can't Get This Conversation"));
    }
    res.status(200).json({ conversation: conversation });
  }
  catch (e) {
    next(errorHandler(500, "Access Denied:Can't Get This Conversation"));
  }
};
