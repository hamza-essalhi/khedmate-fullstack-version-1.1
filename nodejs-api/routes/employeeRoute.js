import express from "express";
import {createEmployee,getEmployee,updateEmployee} from "../controllers/employeeController.js";
import { tokenChecker } from "../middleware/jwt.js";
const router = express.Router()


router.post('/create',tokenChecker,createEmployee)
router.put('/update/:id',tokenChecker,updateEmployee)
router.get('/:id',getEmployee)

export default router