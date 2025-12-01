const mongoose = require('mongoose');


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

userSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('User', userSchema);
