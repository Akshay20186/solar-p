const express = require('express');
const router = express.Router();
const cpController = require('../controllers/cpController'); // ✅ import controller

// Define routes
router.get('/full', cpController.getFullHierarchy);
router.post('/', cpController.createCP);
router.get('/', cpController.getAllCP);

module.exports = router;
