import express from "express";

import { register, login, currentUser } from "../controllers/auth.js";
import { requireSignIn } from "../middleware/index.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/currentUser", requireSignIn, currentUser);

export default router;
