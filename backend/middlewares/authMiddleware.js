const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token failed' });
  }
};

module.exports = { protect };
