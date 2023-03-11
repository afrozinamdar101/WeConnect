import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";

export const register = async (req, res) => {
    // console.log("Register Endpoint => ", req.body);
    const {name, email, password, secret } = req.body;

    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) return res.status(400).send("Password is required and should be at least 6 characters long");
    if (!secret) return res.status(400).send("Answer is required");

    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).send("Email is taken");

    // hash password
    const hashedPassword = await hashPassword(password);

    const user = new User({name, email, password: hashedPassword, secret});

    try {
        await user.save();
        // console.log("Registered user =>", user);
        return res.json({ ok: true });
    } catch (err) {
        console.log("Registration failed =>", err);
        res.status(400).send("Error. Try again.");
    }
};