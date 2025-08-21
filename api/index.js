const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/workorder', require('../routes/workOrderRoutes'));
app.use('/api/users', require('../routes/userRoutes'));
app.use('/api/remarks', require('../routes/remarkRoutes'));
app.use('/api/cp', require('../routes/cpRoutes'));
app.use('/api/farmer', require('../routes/farmerRoutes'));
app.use('/api/contractual', require('../routes/contractualRoutes'));
app.use('/api/inspection', require('../routes/inspectionRoutes'));

// Static file serving (uploads folder)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check route (optional, useful for testing Vercel deployment)
app.get('/', (req, res) => {
    res.send('✅ API is running on Vercel');
});

// ❌ Do not use app.listen() here
// ✅ Instead, export the app for Vercel
module.exports = app;
