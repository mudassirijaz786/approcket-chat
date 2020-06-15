const config = require("config");

module.exports = (req, res, next) => {
  // 401 Unauthorized
  // 403 Forbidden
  if (!config.get("requiresAuth")) return next();

  if (!req.user.isAdmin)
    return res.status(403).send("Access denied. You're not an admin");
  next();
};
