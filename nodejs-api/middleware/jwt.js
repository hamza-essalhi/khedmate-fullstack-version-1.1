import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
dotenv.config();

export const tokenChecker = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token)
    return next(
      errorHandler(500, "Access Denied: Authentication token missing")
    );

  jwt.verify(token, process.env.JWTK, async (err, payload) => {
    if (err) return next(errorHandler(500, "Access Denied: Invalid token"));

    req.id = payload.id;
    req.research = payload.research; // Set the userId and research in the request object
    next();
  });
};

export const filterData = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    req.isAuthenticated= false; // No token, set research to false
  
  } else {
    jwt.verify(token, process.env.JWTK, async (err, payload) => {
      if (err) return next(errorHandler(500, "Access Denied: Invalid token"));
      req.isAuthenticated=payload.isAuthenticated
      req.id = payload.id;
      req.research = payload.research; // Set the userId and research in the request object
      
    });

    
  } // Continue to the next middleware
  next();
 
};
