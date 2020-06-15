const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({
      message: "Access denied, no token provided. Please provide auth token.",
    });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ error: "Invalid token." });
  }
};
