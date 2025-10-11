const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Import user routes
const userRoutes = require('./routes/user.routes');

// Use user routes with a base path
app.use('/api/v1/user', userRoutes);

// Import employee routes
const employeeRoutes = require('./routes/employee.routes');

// Use employee routes with base path
app.use('/api/v1/emp', employeeRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/comp3123_assigment1';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));
