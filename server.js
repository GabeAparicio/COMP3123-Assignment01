const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

// Routes
const userRoutes = require('./routes/user.routes');
app.use('/api/v1/user', userRoutes);

const employeeRoutes = require('./routes/employee.routes');
app.use('/api/v1/emp', employeeRoutes);

// Root
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/comp3123_assigment1';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));
