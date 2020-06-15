const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

// token generation
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

// user model
const User = mongoose.model("User", userSchema);

validateUser = (user) => {
  const schema = {
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().alphanum().min(8).max(32).required(),
  };
  return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;
