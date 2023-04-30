import cloudinary from "cloudinary";

import Post from "../models/post.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const createPost = async (req, res) => {
  console.log("post => ", req.body);
  const { content, image } = req.body;

  if (!content.length) {
    return res.json({
      error: "Content is required",
    });
  }
  try {
    const post = new Post({ content, image, postedBy: req.user._id });
    post.save();
    return res.json({ post });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const uploadImage = async (req, res) => {
  // console.log("Request files =>", req.files);
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    console.log("Uploaded image url =>", result);
    return res.json({
      url: result.secure_url, // https URL
      public_id: result.public_id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userPosts = async (req, res) => {
  try {
    // const posts = await Post.find({ postedBy: req.user._id })
    const posts = await Post.find()
      .populate("postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(10);
    // console.log("Posts =>", posts);
    return res.json(posts);
  } catch (err) {
    console.log(err);
  }
};
