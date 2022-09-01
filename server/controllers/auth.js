import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import customError from "../handlers/customError.js";

dotenv.config();
// Define vars
const JWT_SECRET = process.env.JWT_SECRET;

// Create a token
const createToken = (uid) => {
  const token = jwt.sign({ uid }, JWT_SECRET);
  return token;
};

// Register a user
export const register = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await User.register(body);

    const token = createToken(user._id);
    req.session.jwt = token;

    res.status(201).send(user);
  } catch (e) {
    next(e);
  }
};

// Login a user
export const login = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await User.login(body);

    const token = createToken(user._id);
    req.session.jwt = token;

    res.status(201).send(user);
  } catch (e) {
    next(e);
  }
};

// Logout a user
export const logout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) throw customError("you cannot logout.", 400);
      res.sendStatus(200);
    });
  } catch (e) {
    next(e);
  }
};
