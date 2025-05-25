const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Incoming Authorization Header:", authHeader);

  const token = authHeader?.split(' ')[1];

  if (!token) {
    console.log("❌ No token found");
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    res.status(401).json({ message: 'Token failed' });
  }
};

module.exports = { protect };
