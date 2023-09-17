import express from "express";
import {createEmployee,getEmployee,updateEmployee} from "../controllers/employeeController.js";
import { tokenChecker } from "../middleware/jwt.js";
const router = express.Router()


router.post('/create',tokenChecker,createEmployee)
router.put('/updatey',tokenChecker,updateEmployee)
router.get('/',tokenChecker,getEmployee)

export default router