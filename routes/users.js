const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const express = require("express");
const { User, validate } = require("../models/user");
const router = express.Router();
const Joi = require("joi");

//fetching all the Users

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: user management
 */
/**
 * @swagger
 * /api/user:
 *  get:
 *    description: Use to request all user
 *    summary:  Use to request all user
 *    tags: [Users]
 *    parameters:
 *    - in: header
 *      name: x-auth-token
 *      type: string
 *      required: true
 *      description: jwt token containg user field in JWT.
 *    responses:
 *      '200':
 *        description: A successful response containg all user in JSON
 *      '500':
 *        description: internal server error
 *      '404':
 *        description: message in json format indicating  not found!
 *      '401':
 *        description: message in json format indicating Access denied, no token provided. Please provide auth token.
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.find().select("-password");
    if (user) {
      res.json({ data: user });
    } else {
      res.status(404).json({ message: "Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// getting current user
/**
 * @swagger
 * /api/user/me/{id}:
 *  get:
 *    description: Use to request a single user
 *    summary:  Use to request a single user
 *    tags: [Users]
 *    parameters:
 *    - in: header
 *      name: x-auth-token
 *      type: string
 *      required: true
 *      description: jwt token containg jwt
 *    - in: path
 *      name: id
 *      type: string
 *      required: true
 *      description: Object ID of the user to get.
 *    responses:
 *      '500':
 *        description: internal server error
 *      '200':
 *        description: A successful response containg all user in JSON
 *      '404':
 *        description: message in json format indicating  not found!
 *      '401':
 *        description: message in json format indicating Access denied, no token provided. Please provide auth token.
 */
router.get("/me/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json({ data: user });
    } else {
      res.status(404).json({ message: "Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// login
/**
 * @swagger
 * /api/user/login:
 *  post:
 *    description: use to login user into the system
 *    summary: login user into the system using email and password.
 *    tags: [Users]
 *    parameters:
 *    - in: body
 *      name: user
 *      description: The user to login.
 *      schema:
 *        type: object
 *        required:
 *        - email
 *        - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *    responses:
 *      '500':
 *        description: internal server error
 *      '200':
 *        description: jwt token for that particular user loged in.
 *      '400':
 *        description: message in json format Invalid email or password.
 */
router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password." });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ error: "Invalid email or password." });
    const token = user.generateAuthToken();
    res.header("x-auth-token", token);
    res.send({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// register
/**
 * @swagger
 * /api/user/register:
 *  post:
 *    description: use to resister user into the system
 *    summary: use to resister user into the system.
 *    tags: [Users]
 *    parameters:
 *    - in: body
 *      name: user
 *      description: The user to login.
 *      schema:
 *        type: object
 *        required:
 *        - email
 *        - password
 *        - name
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *    responses:
 *      '500':
 *        description: internal server error
 *      '200':
 *        description: jwt token for that particular new user.
 *      '400':
 *        description: message in json format indicating user with email already exists.
 */
router.post("/register", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(409).json({
        message: `User with email ${req.body.email} is already registered`,
      });
    user = new User(_.pick(req.body, ["name", "password", "email"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// function to validate login params
validateLogin = (req) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().alphanum().min(8).max(32).required(),
  };

  return Joi.validate(req, schema);
};

module.exports = router;
