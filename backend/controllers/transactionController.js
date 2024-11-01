const { ethers } = require('ethers');
const User = require('../models/User');
const provider = require('../utils/provider');
const { USDC_ADDRESS, USDC_ABI } = require('../constants/usdc');

// Send USDC
// @desc    Send USDC to another address
// @route   POST /api/transactions/send
// @access  Private
exports.sendUSDC = async (req, res) => {
  try {
    const { recipientAddress, amount } = req.body;
    const userId = req.user; // Obtained from auth middleware

    // Input validation
    if (!ethers.isAddress(recipientAddress)) {
      return res.status(400).json({ message: 'Invalid recipient address' });
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    
    // Fetch user from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Load user's wallet using their private key
    const wallet = new ethers.Wallet(user.privateKey, provider);

    // Create a contract instance for USDC
    const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, wallet);

    // Get sender's token balance
    const balanceRaw = await usdcContract.balanceOf(wallet.address);
    const decimals = await usdcContract.decimals();
    const balance = ethers.formatUnits(balanceRaw, decimals);

    console.log(`Sender's balance: ${balance}`);

    // Ensure the sender has enough balance
    if (parseFloat(balance) < parseFloat(amount)) {
      return res.status(400).json({ message: 'Insufficient token balance' });
    }

    // Convert amount to correct units
    const amountToSend = ethers.parseUnits(amount.toString(), decimals);
    console.log('amountToSend:', amountToSend);

    // Send USDC
    const tx = await usdcContract.transfer(recipientAddress, amountToSend);
    console.log('tx:', tx);

    // Wait for the transaction to be mined (optional)
    await tx.wait();

    res.json({ message: 'Transaction successful', txHash: tx.hash, transactionAmount: amountToSend});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get USDC Balance
// @desc    Get USDC balance of the user
// @route   GET /api/transactions/balance
// @access  Private
exports.getBalance = async (req, res) => {
  try {
    const userId = req.user; // Obtained from auth middleware

    // Fetch user from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Load user's wallet
    const wallet = new ethers.Wallet(user.privateKey, provider);

    // Create a contract instance for USDC
    const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, provider);

    // Get balance
    const balance = await usdcContract.balanceOf(wallet.address);
    console.log('balance', balance);

    // Convert balance to a readable format
    const balanceFormatted = ethers.formatUnits(balance, 6);

    res.json({ balance: balanceFormatted });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};