const mongoose = require('mongoose');
const Employee = require('../models/employee.model');

// ---------------- GET ALL EMPLOYEES ----------------
const getAllEmployees = async (req, res) => {
    try {
        const { department, position } = req.query;

        const filter = {};

        if (department) {
            filter.department = { $regex: department, $options: "i" };
        }

        if (position) {
            filter.position = { $regex: position, $options: "i" };
        }

        const employees = await Employee.find(filter);

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ---------------- CREATE EMPLOYEE ----------------
const createEmployee = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        } = req.body;

        // Check duplicate email
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee with this email already exists.' });
        }

        // Construct employee object
        const employeeData = {
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        };

        if (req.file) {
            employeeData.profile_image = "/uploads/" + req.file.filename;
        }

        const newEmployee = await Employee.create(employeeData);

        res.status(201).json({
            message: 'Employee created successfully.',
            employee: newEmployee
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ---------------- GET EMPLOYEE BY ID ----------------
const getEmployeeById = async (req, res) => {
    try {
        const { eid } = req.params;

        if (!mongoose.isValidObjectId(eid)) {
            return res.status(400).json({ message: 'Invalid employee ID format.' });
        }

        const employee = await Employee.findById(eid);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ---------------- UPDATE EMPLOYEE ----------------
const updateEmployee = async (req, res) => {
    try {
        const { eid } = req.params;

        if (!mongoose.isValidObjectId(eid)) {
            return res.status(400).json({ message: 'Invalid employee ID format.' });
        }

        const updates = { ...req.body };


        if (req.file) {
            updates.profile_image = "/uploads/" + req.file.filename;
        }

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

// ---------------- DELETE EMPLOYEE ----------------
const deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.query;

        if (!mongoose.isValidObjectId(eid)) {
            return res.status(400).json({ message: 'Invalid employee ID format.' });
        }

        const deletedEmployee = await Employee.findByIdAndDelete(eid);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

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
