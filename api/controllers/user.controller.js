import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
export const test = (req, res) => {
  res.json({ message: "Api is working!" });
};

// @desc   Register a new user
// @route  POST /api/users/register
// @access Public
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password should be at least 6 characters long")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username should be between 7 and 20 characters long")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username should not contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (req.body.username.match(/[^a-zA-Z0-9]+s/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
          },
        },
        { new: true }
      );
      const { password, ...restUser } = updatedUser._doc;
      res.status(200).json(restUser);
    } catch (err) {
      return next(err);
    }
  }
};

// @desc   delete user
// @route  DELETE /api/users/:userId
// @access Private
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    return next(err);
  }
};

// @desc   signout user
// @route  GET /api/users/signout
// @access Private
export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "User has been signed out" });
  } catch (err) {
    return next(err);
  }
};
