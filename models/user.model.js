// 1. Import mongoose
const mongoose = require('mongoose');

// 2. Define the structure of a User document
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,        // field must be provided
        unique: true,          // no two users can have the same username
        trim: true             // removes extra spaces from input
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,       // saves email in lowercase for consistency
        trim: true
    },
    password: {
        type: String,
        required: true,         // will store the hashed password
        minLength: [8, 'Password must be at least 8 characters long']
    },
    created_at: {
        type: Date,
        default: Date.now      // automatically sets to current date when created
    },
    updated_at: {
        type: Date,
        default: Date.now      // automatically sets to current date initially
    }
});

// 3. Optional: A hook to update "updated_at" whenever a user is modified
userSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

// 4. Export a model called "User" that uses the "userSchema"
module.exports = mongoose.model('User', userSchema);
