import express from "express";

import {
  register,
  login,
  currentUser,
  forgotPassword,
  profileUpdate,
  findPeople,
  userFollow,
  addFollower,
} from "../controllers/auth.js";
import { requireSignIn } from "../middleware/index.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignIn, currentUser);
router.post("/forgot-password", forgotPassword);
router.put("/profile-update", requireSignIn, profileUpdate);
router.get("/find-people", requireSignIn, findPeople);
router.put("/user-follow", requireSignIn, addFollower, userFollow);

export default router;
