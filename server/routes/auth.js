import express from "express";

import {
  register,
  login,
  currentUser,
  forgotPassword,
} from "../controllers/auth.js";
import { requireSignIn } from "../middleware/index.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignIn, currentUser);
router.post("/forgot-password", forgotPassword);

export default router;
