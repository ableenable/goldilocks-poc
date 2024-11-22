const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const transactionController = require('../controllers/transactionController');

// @route   POST /api/transactions/send
// @desc    Send USDC to another address
// @access  Private
router.post('/send', auth.protect, transactionController.sendUSDC);

// @route   GET /api/transactions/balance
// @desc    Get USDC balance of the user
// @access  Private
router.get('/balance', auth.protect, transactionController.getBalance);

module.exports = router;