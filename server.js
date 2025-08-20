const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const workOrderRoutes = require('./routes/workOrderRoutes');
const usersRoutes = require('./routes/userRoutes');
const remarkRoutes = require('./routes/remarkRoutes');
const cpRoutes = require('./routes/cpRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const contractualRoutes = require('./routes/contractualRoutes');
const inspectionRoutes = require('./routes/inspectionRoutes');

// Debug logs to confirm exports
console.log("authRoutes:", authRoutes);
app.use('/api/auth', authRoutes);

console.log("✅ Registered workorder routes once");
console.log("workOrderRoutes:", workOrderRoutes);
app.use('/api/workorder', workOrderRoutes);

console.log("usersRoutes:", usersRoutes);
app.use('/api/users', usersRoutes);

console.log("remarkRoutes:", remarkRoutes);
app.use('/api/remarks', remarkRoutes);

console.log("cpRoutes:", cpRoutes);
app.use('/api/cp', cpRoutes);

console.log("farmerRoutes:", farmerRoutes);
app.use('/api/farmer', farmerRoutes);

console.log("contractualRoutes:", contractualRoutes);
app.use('/api/contractual', contractualRoutes);

console.log("inspectionRoutes:", inspectionRoutes);
app.use('/api/inspection', inspectionRoutes);


// Static files (uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

