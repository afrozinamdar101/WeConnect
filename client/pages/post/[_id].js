import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { RollbackOutlined } from "@ant-design/icons";
import { Modal } from "antd";

import UserRoute from "../../components/routes/UserRoute";
import Post from "../../components/cards/Post";
import CommentForm from "../../components/forms/CommentForm";

const PostComments = () => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const router = useRouter();
  const _id = router.query._id;

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeComment = async (postId, comment) => {
    let answer = window.confirm("Are you sure?");
    if (!answer) return;

    try {
      const { data } = await axios.put("/remove-comment", {
        postId,
        comment,
      });
      console.log("Comment removed =>", data);
      fetchPost();
    } catch (err) {}
  };

  const handleComment = (post) => {
    setCurrentPost(post);
    setVisible(true);
  };

  const addComment = async (e) => {
    e.preventDefault();
    // console.log("Add comment =>", currentPost._id);
    // console.log("Comment =>", comment);
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });
      console.log(data);
      setComment("");
      setVisible(false);
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Confirm Delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted successfully");
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dash_bg1">
      <div className="row py-5 text-light ">
        <div className="col text-center">
          <h1>Spartan Feed</h1>
        </div>
      </div>

      <div className="container col-md-8 offset-md-2 pt-5">
        <Post
          post={post}
          commentsCount={100}
          removeComment={removeComment}
          handleComment={handleComment}
          page="id"
        />
      </div>

      <Link
        href="/user/dashboard"
        className="d-flex justify-content-center pt-5"
      >
        <div className="follow_bg pb-2 " style={{ marginBottom: '1000px' }} >
        <RollbackOutlined />
        </div>
      </Link>

      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        title="Comment"
        footer={null}
      >
        <CommentForm
          comment={comment}
          setComment={setComment}
          addComment={addComment}
        />
      </Modal>
    </div>
  );
};

export default PostComments;
