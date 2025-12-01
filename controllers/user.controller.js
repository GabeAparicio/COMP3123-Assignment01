
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// -------------------- SIGNUP --------------------
const signupUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Return success response
        res.status(201).json({
            message: 'User created successfully.',
            user_id: newUser._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// -------------------- LOGIN --------------------
const loginUser = async (req, res) => {
    try {

        console.log("LOGIN REQ BODY:", req.body);
        const { email, username, password } = req.body;


        // Find user by email or username
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username/email or password.' });
        }

        // Compare given password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username/email or password.' });
        }

        res.status(200).json({
            message: 'Login successful.'
            // Here we could generate a JWT token if needed
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Export both functions
module.exports = { signupUser, loginUser };
