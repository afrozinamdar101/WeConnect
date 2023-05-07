import { useContext, useState } from "react";
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
import { toast } from "react-toastify";
import axios from "axios";

import PostImage from "../images/PostImage";
import { UserContext } from "../../context";
import { imageSource } from "../../functions";

const PostPublic = ({
  post,
  // handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  commentsCount = 3,
  removeComment,
  page,
}) => {
  // const [post, setPost] = useState({});
  const [state] = useContext(UserContext);
  const router = useRouter();

  // const fetchPost = async () => {
  //   try {
  //     const { data } = await axios.get(`/user-post/${_id}`);
  //     setPost(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Confirm Delete?");
      if (!answer) return;
      console.log("deletion confirmed");
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted successfully");
      router.push("/user/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {post && post.postedBy && (
        <div key={post._id} className="card mb-5"style={{background:"blue" ,color: "white", borderColor: 'gold',borderWidth: '4px', borderRadius: "35px" }}>
          <div className="card-header">
            {/* <Avatar size={40}>{post.postedBy.name[0]}</Avatar>{" "} */}
            <Avatar size={40} src={imageSource(post.postedBy)} style={{ border: '3px solid gold' }}/>
            <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
              {post.postedBy.name}
            </span>
            <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="card-body">{renderHTML(post.content)}</div>
          <div className="card-footer">
            {post.image && <PostImage url={post.image.url} />}
            <div className="d-flex pt-2">
              {state &&
              state.user &&
              post.likes &&
              post.likes.includes(state.user._id) ? (
                <HeartFilled className="pt-2 h5 px-2" style={{ color: 'gold' }} />
              ) : (
                <HeartOutlined className=" pt-2 h5 px-2" style={{ color: 'gold' }} />
              )}
              <div className="pt-2 pl-3" style={{ marginRight: "1rem" }}>
                {post.likes.length} Like
              </div>
              <CommentOutlined className=" pt-2 h5 px-2" style={{ color: 'gold' }} />
              <div className="pt-2 pl-3" >{post.comments.length} Comments</div>
            </div>
          </div>

          {post.comments && post.comments.length > 0 && (
            <ol
              className="list-group"
              style={{ maxHeight: "125px", overflow: "scroll" ,borderRadius: "30px"}}
            >
              {post.comments.slice(0, commentsCount).map((comment) => (
                <li
                  key={comment._id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto" >
                    <div>
                      <Avatar
                        size={20}
                        className="mb-1 mr-3"
                        src={imageSource(comment.postedBy)}
                        style={{ border: '3px solid gold' }}
                      />{" "}
                      {comment.postedBy.name}
                    </div>
                    <div>{comment.text}</div>
                  </div>
                  <span className="badge round-pill text-muted">
                    {moment(comment.created).fromNow()}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </>
  );
};

export default PostPublic;
