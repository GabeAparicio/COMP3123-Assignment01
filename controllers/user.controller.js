// 1. Import required modules
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// -------------------- SIGNUP --------------------
const signupUser = async (req, res) => {
    try {
        // 2. Extract data from request body
        const { username, email, password } = req.body;

        // 3. Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }

        // 4. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // 5. Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // 6. Return success response
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
        // 7. Extract data
        const { email, username, password } = req.body;

        // 8. Find user by email or username
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username/email or password.' });
        }

        // 9. Compare given password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username/email or password.' });
        }

        // 10. If valid
        res.status(200).json({
            message: 'Login successful.'
            // Here we could generate a JWT token if needed
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 11. Export both functions
module.exports = { signupUser, loginUser };
