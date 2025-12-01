// Import express
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');


const {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employee.controller');

// GET all employees
router.get('/employees', getAllEmployees);

// POST create a new employee
router.post('/employees', upload.single("profile_image"), createEmployee);

// GET employee by ID
router.get('/employees/:eid', getEmployeeById);

// PUT update employee by ID
router.put('/employees/:eid', upload.single("profile_image"), updateEmployee);

// // DELETE employee by ID (passed as query param)
router.delete('/employees', deleteEmployee);


module.exports = router;
