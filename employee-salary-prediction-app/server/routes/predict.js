const express = require('express');
const router = express.Router();
const predictController = require('../controllers/predictController');

// POST route for salary prediction
router.post('/', predictController.predictSalary);

module.exports = router;