import cloudinary from "cloudinary";

import Post from "../models/post.js";
import User from "../models/user.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const createPost = async (req, res) => {
  // console.log("post => ", req.body);
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
    // console.log("Uploaded image url =>", result);
    return res.json({
      url: result.secure_url, // https URL
      public_id: result.public_id,
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
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
    return res.json({ error: "Error. Please try again." });
  }
};

export const userPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id)
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image");
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const updatePost = async (req, res) => {
  // console.log("Update post =>", req.body);
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    return res.json(updatedPost);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params._id);
    // remove the image from cloudinary
    if (post.image && post.image.public_id) {
      const image = await cloudinary.uploader.destroy(post.image.public_id);
    }
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const newsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let following = user.following;
    following.push(req.user._id);

    // pagination
    const currentPage = req.params.page || 1;
    const perPage = 3;

    // console.log(req.params.page);

    const posts = await Post.find({ postedBy: { $in: following } })
      .skip((currentPage - 1) * perPage)
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image")
      .sort({
        createdAt: -1,
      })
      .limit(perPage);
    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const likePost = async (req, res) => {
  try {
    const likedPost = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    );
    return res.json(likedPost);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const unlikedPost = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
    return res.json(unlikedPost);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: { text: comment, postedBy: req.user._id } } },
      { new: true }
    )
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image");
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const removeComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: comment._id } } },
      { new: true }
    );
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};

export const totalPosts = async (req, res) => {
  try {
    const total = await Post.find().estimatedDocumentCount();
    return res.json(total);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error. Please try again." });
  }
};
