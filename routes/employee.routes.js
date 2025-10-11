// 1. Import express
const express = require('express');
const router = express.Router();

// 2. Import controller functions (we’ll create these next)
const {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employee.controller');

// 3. Define routes
// GET all employees
router.get('/employees', getAllEmployees);

// POST create a new employee
router.post('/employees', createEmployee);

// GET employee by ID
router.get('/employees/:eid', getEmployeeById);

// PUT update employee by ID
router.put('/employees/:eid', updateEmployee);
//
// // DELETE employee by ID (passed as query param)
router.delete('/employees', deleteEmployee);

// 4. Export router
module.exports = router;
