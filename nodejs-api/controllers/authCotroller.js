import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
dotenv.config();

export const login = async (req, res,next) => {
    const err =new Error()
    err.status=404
    err.message='User not found!'
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) return next(errorHandler(500,'Login failed: Invalid username or password.'));
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) return next(errorHandler(500,'Login failed: Invalid username or password.'));
      
    const { password, ...info } = user._doc;
    const token = jwt.sign(
      {
        id: user._id,
        research: user.research,
        isAuthenticated:true
      },
      process.env.JWTK
    );
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({user:info});
  
};

export const register = async (req, res,next) => {
  const slot = parseInt(process.env.SLOT);
  try {
    const hash = bcrypt.hashSync(req.body.password, slot);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({success:'User Created'});
  } catch (err) {
    next(errorHandler(500, 'User Not Created: This user already exists.'));
  }
};
export const logout = async (req, res) => {
  res.clearCookie('accessToken',{
    sameSite:'none',
    secure:true
  }).status(200).json({success:'Logout Done!'});

};
