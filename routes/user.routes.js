// Import required modules
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { signupUser, loginUser } = require('../controllers/user.controller');

// Validation rules for signup
const signupValidationRules = [
    body('username')
        .notEmpty().withMessage('Username is required.')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),

    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Email must be a valid email address.'),

    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    next();
};

// Apply the validation middleware before signupUser
router.post('/signup', signupValidationRules, validateRequest, signupUser);

router.post('/login', loginUser);

// Export the router
module.exports = router;
