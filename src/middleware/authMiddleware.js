const jwt = require('jsonwebtoken');
const {serverConfig} = require('../config/server-config');

const authenticate = (req, res, next) => {
  const authHeaderToken = req.headers['authorization'].split(" ")[1];
  if (!authHeaderToken) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(authHeaderToken, serverConfig.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

const authorizeRoles = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

module.exports = { authenticate, authorizeRoles };
