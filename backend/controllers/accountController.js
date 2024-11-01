const User = require('../models/User');

// Get API Key
// @desc    Get user's API key
// @route   GET /api/account/api-key
// @access  Private
exports.getApiKey = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId).select('apiKey');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ apiKey: user.apiKey });
  } catch (error) {
    console.error('Error in getApiKey:', error);
    res.status(500).json({ message: 'Server error' });
  }
};