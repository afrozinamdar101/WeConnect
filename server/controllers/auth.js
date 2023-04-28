import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";

export const register = async (req, res) => {
  // console.log("Register Endpoint => ", req.body);
  const { name, email, password, secret } = req.body;

  // validation
  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is required and should be at least 6 characters long");
  if (!secret) return res.status(400).send("Answer is required");

  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).send("Email is taken");

  // hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword, secret });

  try {
    await user.save();
    // console.log("Registered user =>", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("Registration failed =>", err);
    res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  //   console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) res.status(400).send("User doesn't exist.");

    const match = comparePassword(password, user.password);

    if (!match) res.status(400).send("Incorrect Password.");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;

    res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send("Error. Please try again.");
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
