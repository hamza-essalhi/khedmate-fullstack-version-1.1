import express from "express";
import {deleteUserController,UpdateUser,getUser} from "../controllers/userController.js";
import { tokenChecker } from "../middleware/jwt.js";
const router = express.Router()


router.delete('/delete/:id',tokenChecker,deleteUserController)
router.put('/update/:id',tokenChecker,UpdateUser)
router.get('/:id',getUser)

export default router