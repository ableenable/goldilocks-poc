const express = require('express');
const router = express.Router();
const { getApiKey } = require('../controllers/accountController');
const auth = require('../middleware/authMiddleware');

// @route   GET /api/account/api-key
// @desc    Get user's API key
// @access  Private
router.get('/api-key', auth.protect, getApiKey);

module.exports = router;