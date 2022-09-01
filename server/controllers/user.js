import User from "../models/User.js";
import customError from "../handlers/customError.js";

// Get a user
export const getUser = async (req, res, next) => {
  const { uid } = req.user;
  try {
    const user = await User.findById(uid, { password: 0 });
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

// Get a user
export const updateUser = async (req, res, next) => {
  const { uid } = req.user;
  const body = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(uid, body, { new: true });
    delete updatedUser._doc.password;
    res.status(200).send(updatedUser);
  } catch (e) {
    next(e);
  }
};

// Get a user
export const deleteUser = async (req, res, next) => {
  const { uid } = req.user;
  try {
    req.session.destroy((err) => {
      if (err) throw customError("you cannot delete the account.", 400);
    });
    await User.findByIdAndDelete(uid);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
