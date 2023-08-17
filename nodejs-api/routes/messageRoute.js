import express from "express";
import {getUser} from "../controllers/userController.js";

const router = express.Router()


router.get('/test',getUser)

export default router