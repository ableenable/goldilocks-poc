const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  // Get token from header
  let token = req.header('Authorization');

  // Check if no token
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  // If token includes 'Bearer ', remove it
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trim();
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
