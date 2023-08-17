import express from "express";
import {deleteUserController} from "../controllers/userController.js";
import { tokenChecker } from "../middleware/jwt.js";
const router = express.Router()


router.delete('/:id',tokenChecker,deleteUserController)

export default router