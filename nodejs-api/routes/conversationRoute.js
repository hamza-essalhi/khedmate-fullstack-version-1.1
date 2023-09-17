import express from "express";
import { tokenChecker } from "../middleware/jwt.js";
import {getConversation,getAllConversations,deleteConversation,createConversation,updateConversation} from "../controllers/conversionController.js";

const router = express.Router()

router.post('/create/',tokenChecker,createConversation)
router.get('/',tokenChecker,getAllConversations)
router.get('/:id',tokenChecker,getConversation)
router.put('/:id',tokenChecker,updateConversation)
router.delete('/:id',tokenChecker,deleteConversation)
export default router