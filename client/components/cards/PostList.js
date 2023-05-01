import { useContext } from "react";
import { useRouter } from "next/router";
import { Avatar } from "antd";
import renderHTML from "react-render-html";
import moment from "moment";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import PostImage from "../images/PostImage";
import { UserContext } from "../../context";
import { imageSource } from "../../functions";
import Post from "./Post";

const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
            removeComment={removeComment}
          />
        ))}
    </>
  );
};

export default PostList;
