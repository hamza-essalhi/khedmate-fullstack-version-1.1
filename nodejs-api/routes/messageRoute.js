import express from "express";
import { tokenChecker } from "../middleware/jwt.js";
import {getMessage,getAllMessages,deleteMessage,createMessage,updateMessage} from "../controllers/messageController.js";

const router = express.Router()

router.post('/create/:id',tokenChecker,createMessage)
// router.get('/',tokenChecker,getAllMessages)
router.get('/:id',tokenChecker,getMessage)
router.delete('/:id',tokenChecker,deleteMessage)
export default router