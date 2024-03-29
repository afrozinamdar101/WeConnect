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

  if (!email.endsWith("sjsu.edu")) {
    return res.json({
      error:
        "Only users with sjsu domain can register. Please try again with email having sjsu domain",
    });
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
    if (req.body.image) {
      data.image = req.body.image;
    }

    let updatedUser = await User.findByIdAndUpdate(req.user._id, data, {
      new: true,
    });

    // console.log("Updated user =>", updatedUser);

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

export const findPeople = async (req, res) => {
  // console.log(req.body);
  try {
    const user = await User.findById(req.user._id);
    // user following list
    let following = user.following;
    following.push(user._id);
    const people = await User.find({ _id: { $nin: following } })
      .select("-password -secret")
      .limit(10);
    return res.json(people);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

// middleware
export const addFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $addToSet: { followers: req.user._id },
    });
    next();
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const userFollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { following: req.body._id },
      },
      { new: true }
    ).select("-password -secret");
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const userFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const following = await User.find({ _id: user.following }).limit(100);
    return res.json(following);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const removeFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $pull: { followers: req.user._id },
    });
    next();
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const userUnfollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.body._id },
      },
      { new: true }
    );
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const searchUser = async (req, res) => {
  const { query } = req.params;
  if (!query) return;
  try {
    // regex is a special method for mongodb
    // The i modifier is used to perform case-insensitive matching
    const user = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    }).select("-password -secret");
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password -secret"
    );
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};
