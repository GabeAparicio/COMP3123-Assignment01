// 1. Import mongoose
const mongoose = require('mongoose');

// 2. Define the structure of an Employee document
const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        min: [0, 'Salary must be a positive number']
    },
    date_of_joining: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: {
            values: ['Engineering', 'Design', 'Product', 'HR', 'Finance', 'Marketing'],
            message: '{VALUE} is not a valid department. Please choose from the pre-determined departments'
        },
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    profile_image: {
        type: String,
        default: ""
    }
});


employeeSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});


module.exports = mongoose.model('Employee', employeeSchema);
