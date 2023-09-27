
import { errorHandler } from "../utils/errorHandler.js";
import {generateUniqueId} from "../utils/generateUnId.js";
import User from "../models/userModel.js";
import Conversion from "../models/conversionModel.js";
import Message from "../models/messageModel.js";

export const createMessage = async (req, res, next) => {
  const id =req.params.id
    try{
      await User.findById(req.id); // Use await here
      const conversation = await Conversion.findOne({
        conversionGeneId:id
      })
      
      
      if (conversation.toUnit == req.id) {
        
        await conversation.updateOne({
          readedByToUnit: true,
          readedByFromUnit: false,
          lastMessage:req.body.message,
          toUnitLastSeen : new Date()
        });
       
      }
      else{
        await conversation.updateOne({
          readedByToUnit: false,
          readedByFromUnit: true,
          lastMessage:req.body.message,
          fromUnitLastSeen : new Date()
        });
      }
      
      
    }
    catch{
     return next(errorHandler(500, "Access Denied: Unable to Create This Message or An Error Occurred While Processing the Request"));
    }

    const newMessage = new Message(
        {
            conversationId:id,
            userId:req.id,
            message:req.body.message
        }
    )
    try{
       const message = await newMessage.save()
       res.status(200).json({ message: message });
    }
    catch(e){
        
        next(errorHandler(500, "Access Denied:Can't Create This Message"));
    }
 
};

export const updateMessage = async (req, res, next) => {
 
};
export const deleteMessage = async (req, res, next) => {

  
};

export const getAllMessages = async (req, res, next) => {
    const conversion= await Conversion.find()
    res.status(200).json({ conversion: conversion });
 
};

export const getMessage = async (req, res, next) => {
  try{
    const message = await Message.find({
      conversationId:req.params.id
    });
    if(message.lenght==0){
        return next(errorHandler(500, "Access Denied:Can't Get This Messages"));
    }
    res.status(200).json({ messages: message });
  }
  catch(e){
    next(errorHandler(500, "Access Denied:Can't Get This Message"));
  }
};
