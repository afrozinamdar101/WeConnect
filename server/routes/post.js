import express from "express";

import { requireSignIn } from "../middleware/index.js";
import { createPost } from "../controllers/post.js";

const router = express.Router();

router.post("/create-post", requireSignIn, createPost);

export default router;
