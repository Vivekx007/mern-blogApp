import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // return res.status(400).json({ message: "All fields are required" });
    next(errorHandler(400, "All fields are required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (err) {
    // return res.status(400).json({ message: err.message });
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    const { password: userPassword, ...restUser } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ ...restUser, token });
  } catch (err) {
    return next(err);
  }
};

export const google = async (req, res, next) => {
  const { email, name, photo } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5h",
      });
      const { password, ...restUser } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({ ...restUser, token });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split("") + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: photo,
      });
      await newUser.save();
    }
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    const { password, ...restUser } = newUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ ...restUser, token });
  } catch (err) {
    return next(err);
  }
};
