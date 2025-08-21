const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Load env
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Import routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workorder', require('./routes/workOrderRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/remarks', require('./routes/remarkRoutes'));
app.use('/api/cp', require('./routes/cpRoutes'));
app.use('/api/farmer', require('./routes/farmerRoutes'));
app.use('/api/contractual', require('./routes/contractualRoutes'));
app.use('/api/inspection', require('./routes/inspectionRoutes'));

// Static files (uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ❌ REMOVE app.listen
// ✅ Instead export the app for Vercel
module.exports = app;
