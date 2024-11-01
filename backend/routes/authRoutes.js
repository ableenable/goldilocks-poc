const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserData } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../validators/authValidator');

const auth = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegister, registerUser);

// @route   POST /api/auth/login
// @desc    Login user and return JWT token
// @access  Public
router.post('/login', validateLogin, loginUser);

// @route   GET /api/auth/user
// @desc    Get authenticated user's data
// @access  Private
router.get('/user', auth.protect, getUserData);

module.exports = router;
