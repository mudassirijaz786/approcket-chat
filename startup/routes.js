const express = require("express");
const users = require("../routes/users");
const rooms = require("../routes/rooms");
const messages = require("../routes/messages");
const error = require("../middleware/error");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/user", users);
  app.use("/api/room", rooms);
  app.use("/api/message", messages);
  app.use("/api/room", rooms);

  app.use(error);
};
