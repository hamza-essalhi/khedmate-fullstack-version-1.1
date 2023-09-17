
import { errorHandler } from "../utils/errorHandler.js";
import {generateUniqueId} from "../utils/generateUnId.js";
import User from "../models/userModel.js";
import Conversion from "../models/conversionModel.js";

export const createConversation = async (req, res, next) => {
    
    const newConversation = new Conversion(
        {
            id:generateUniqueId(req.id,req.body.toUnit),
            fromUnit:req.id,
            toUnit:req.body.toUnit,
            readedByfromUnit:true,
            readedBytoUnit:false,
        }
    )
    try{
       const conversion = await newConversation.save()
       res.status(200).json({ conversion: conversion });
    }
    catch(e){
        
        next(errorHandler(500, "Access Denied:Can't Create This Conversation"));
    }
 
};

export const updateConversation = async (req, res, next) => {
 
};
export const deleteConversation = async (req, res, next) => {

  
};

export const getAllConversations = async (req, res, next) => {
    const conversion= await Conversion.find()
    res.status(200).json({ conversion: conversion });
 
};

export const getConversation = async (req, res, next) => {
  try{
    const conversion= await Conversion.findOne({id:req.params.id})
    if(conversion.lenght==0){
        return next(errorHandler(500, "Access Denied:Can't Get This Conversation"));
    }
    res.status(200).json({ conversion: conversion });
  }
  catch(e){
    next(errorHandler(500, "Access Denied:Can't Get This Conversation"));
  }
};
