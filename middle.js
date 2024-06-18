const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trim();
    }

    const decoded = jwt.verify(token, 'jwtsecret');
    
    req.user = decoded.user; // Ensure decoded.user is correctly set

    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
