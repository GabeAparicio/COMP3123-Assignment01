// 1. Import the Employee model
const mongoose = require('mongoose');
const Employee = require('../models/employee.model');

// ---------------- GET ALL EMPLOYEES ----------------
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find(); // fetch all employees
        res.status(200).json(employees);         // return as JSON
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ---------------- CREATE A NEW EMPLOYEE ----------------
const createEmployee = async (req, res) => {
    try {
        // 2. Extract employee data from request body
        const {
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        } = req.body;

        // 3. Check for duplicate email
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee with this email already exists.' });
        }

        // 4. Create new employee document
        const newEmployee = await Employee.create({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        });

        // 5. Return success response
        res.status(201).json({
            message: 'Employee created successfully.',
            employee_id: newEmployee._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        // 1. Extract the ID from the URL parameter
        const { eid } = req.params;

        if (!mongoose.isValidObjectId(eid)) {
            return res.status(400).json({ message: 'Invalid employee ID format.' });
        }

        // 2. Search the database for that employee
        const employee = await Employee.findById(eid);

        // 3. If no employee found, return 404
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        // 4. If found, return the employee details
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { eid } = req.params;

        if (!mongoose.isValidObjectId(eid)) {
            return res.status(400).json({ message: 'Invalid employee ID format.' });
        }

        const updates = req.body;

        const updatedEmployee = await Employee.findByIdAndUpdate(
            eid,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.status(200).json({
            message: 'Employee details updated successfully.',
            employee: updatedEmployee
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        // 1. Extract employee ID from query parameter
        const { eid } = req.query;

        // 2. Validate ID format
        if (!mongoose.isValidObjectId(eid)) {
            return res.status(400).json({ message: 'Invalid employee ID format.' });
        }

        // 3. Attempt to delete the employee
        const deletedEmployee = await Employee.findByIdAndDelete(eid);

        // 4. If no employee found
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        // 5. If deleted successfully
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};
