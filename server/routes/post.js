import express from "express";
import formidable from "express-formidable";

import { requireSignIn } from "../middleware/index.js";
import { createPost, uploadImage, userPosts } from "../controllers/post.js";

const router = express.Router();

router.post("/create-post", requireSignIn, createPost);
router.post(
  "/upload-image",
  requireSignIn,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);

export default router;

router.get("/user-posts", requireSignIn, userPosts);
