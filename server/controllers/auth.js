import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";

export const register = async (req, res) => {
  // console.log("Register Endpoint => ", req.body);
  const { name, email, password, secret } = req.body;

  // validation
  if (!name) {
    return res.json({ error: "Name is required" });
  }
  if (!password || password.length < 6) {
    return res.json({
      error: "Password is required and should be at least 6 characters long",
    });
  }

  if (!secret) {
    return res.json({ error: "Answer is required" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({ error: "Email is taken" });
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    secret,
    username: nanoid(6),
  });

  try {
    await user.save();
    // console.log("Registered user =>", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("Registration failed =>", err);
    res.json({ error: "Error. Try again." });
  }
};

export const login = async (req, res) => {
  //   console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.json({ error: "User doesn't exist." });
    }

    const match = comparePassword(password, user.password);

    if (!match) {
      res.json({ error: "Incorrect Password." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;

    res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.json({ error: "Error. Please try again." });
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // res.json(user);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const forgotPassword = async (req, res) => {
  // console.log(req.body);
  const { email, newPassword, secret } = req.body;

  // validation
  if (!newPassword || newPassword < 6) {
    return res.json({
      error: "New password is required and should be minimum 6 characters long",
    });
  }

  if (!secret) {
    return res.json({
      error: "Secret is required",
    });
  }

  const user = await User.findOne({ email, secret });

  if (!user) {
    return res.json({ error: "Cannot verify user with the given details" });
  }

  try {
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success:
        "Password updated successfully. You can now login with your new password",
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const profileUpdate = async (req, res) => {
  // console.log("profile update =>", req.body);
  try {
    const data = {};

    if (req.body.username) {
      data.username = req.body.username;
    }
    if (req.body.about) {
      data.about = req.body.about;
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.password) {
      if (req.body.password < 6) {
        return res.json({
          error: "Password is required and should be minimum 6 characters long",
        });
      } else {
        data.password = await hashPassword(req.body.password);
      }
    }

    let updatedUser = await User.findByIdAndUpdate(req.user._id, data, {
      new: true,
    });
    console.log("Updated user =>", updatedUser);
    updatedUser.password = undefined;
    updatedUser.secret = undefined;
    return res.json(updatedUser);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.json({ error: "Duplicate username" });
    }
  }
};
