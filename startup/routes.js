const express = require("express");
const users = require("../routes/users");
const error = require("../middleware/error");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/user", users);
  app.use(error);
};
