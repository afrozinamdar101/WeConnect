import express from "express";
import formidable from "express-formidable";

import { requireSignIn, canEditDeletePost } from "../middleware/index.js";
import {
  createPost,
  uploadImage,
  userPosts,
  userPost,
  updatePost,
  deletePost,
  newsFeed,
  likePost,
  unlikePost,
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
router.delete(
  "/delete-post/:_id",
  requireSignIn,
  canEditDeletePost,
  deletePost
);
router.get("/news-feed", requireSignIn, newsFeed);
router.put("/like-post", requireSignIn, likePost);
router.put("/unlike-post", requireSignIn, unlikePost);

export default router;
