import Post from "../models/post.js";

export const createPost = async (req, res) => {
  console.log("post => ", req.body);
  const { content } = req.body;

  if (!content.length) {
    return res.json({
      error: "Content is required",
    });
  }
  try {
    const post = new Post({ content, postedBy: req.user._id });
    post.save();
    return res.json({ post });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const uploadImage = async (req, res) => {
  console.log("Request files =>", req.files);
};
