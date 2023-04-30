import express from "express";
import formidable from "express-formidable";

import { requireSignIn, canEditDeletePost } from "../middleware/index.js";
import {
  createPost,
  uploadImage,
  userPosts,
  userPost,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.post("/create-post", requireSignIn, createPost);
router.post(
  "/upload-image",
  requireSignIn,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);
router.get("/user-posts", requireSignIn, userPosts);
router.get("/user-post/:_id", requireSignIn, userPost);
router.put("/update-post/:_id", requireSignIn, canEditDeletePost, updatePost);

export default router;
