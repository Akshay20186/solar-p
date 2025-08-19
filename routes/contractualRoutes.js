const express = require('express');
const router = express.Router();
const contractualController = require('../controllers/contractualController');

// Routes
router.get('/', contractualController.getAllContractual);
router.post('/', contractualController.createContractual);

// Debug
console.log("✅ contractualRoutes file loaded");

module.exports = router;  // <- make sure this line exists
