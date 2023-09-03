import { errorHandler } from "../utils/errorHandler.js";
import Employee from "../models/employeeModel.js";
export const createEmployee = async (req, res, next) => {

    try {
        const newEmployee = new Employee({
            userId: req.id,
            ...req.body
        });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        
        return next(errorHandler(403, error));
    }
};



// Get an employee by ID
export const getEmployee = async (req, res, next) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        return next(errorHandler(403, 'Access Denied: Unauthorized request'));
    }
};

// Update an employee by ID
export const updateEmployee = async (req, res, next) => {
    const { id } = req.params;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {

    }
};


