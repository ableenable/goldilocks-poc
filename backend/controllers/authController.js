// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');
const User = require('../models/User');

// Generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate wallet
    const wallet = ethers.Wallet.createRandom();

    // Create new user
    newUser = new User({
      email,
      password: hashedPassword,
      walletAddress: wallet.address,
      privateKey: wallet.privateKey, // For PoC purposes only
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token
    const token = generateToken(savedUser._id);

    // Respond with the token and user information
    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        walletAddress: savedUser.walletAddress,
      },
    });

  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Login user and return JWT token
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Generate token
    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        walletAddress: user.walletAddress,
      },
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get User Data
// @desc    Get authenticated user's data
// @route   GET /api/auth/user
// @access  Private
exports.getUserData = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId).select('-password -privateKey');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error in getUserData:', error);
    res.status(500).json({ message: 'Server error' });
  }
};