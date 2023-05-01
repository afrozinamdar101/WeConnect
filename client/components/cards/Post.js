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

const Post = ({
  post,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  commentsCount = 3,
  removeComment,
  page,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {post && post.postedBy && (
        <div key={post._id} className="card mb-5">
          <div className="card-header">
            {/* <Avatar size={40}>{post.postedBy.name[0]}</Avatar>{" "} */}
            <Avatar size={40} src={imageSource(post.postedBy)} />
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
                <HeartFilled
                  onClick={() => handleUnlike(post._id)}
                  className="text-danger pt-2 h5 px-2"
                />
              ) : (
                <HeartOutlined
                  onClick={() => handleLike(post._id)}
                  className="text-danger pt-2 h5 px-2"
                />
              )}
              <div className="pt-2 pl-3" style={{ marginRight: "1rem" }}>
                {post.likes.length} Like
              </div>
              <CommentOutlined
                onClick={() => handleComment(post)}
                className="text-danger pt-2 h5 px-2"
              />
              <div className="pt-2 pl-3">
                <Link
                  href={`/post/${post._id}`}
                  style={{ textDecoration: "none" }}
                >
                  {post.comments.length} Comments
                </Link>
              </div>

              {state && state.user && state.user._id === post.postedBy._id && (
                <>
                  <EditOutlined
                    onClick={() => router.push(`/user/post/${post._id}`)}
                    className="text-danger pt-2 h5 px-2 mx-auto"
                  />
                  {page !== "id" && (
                    <DeleteOutlined
                      onClick={() => handleDelete(post)}
                      className="text-danger pt-2 h5 px-2"
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {post.comments && post.comments.length > 0 && (
            <ol
              className="list-group"
              style={{ maxHeight: "125px", overflow: "scroll" }}
            >
              {post.comments.slice(0, commentsCount).map((comment) => (
                <li
                  key={comment._id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div>
                      <Avatar
                        size={20}
                        className="mb-1 mr-3"
                        src={imageSource(comment.postedBy)}
                      />{" "}
                      {comment.postedBy.name}
                    </div>
                    <div>{comment.text}</div>
                  </div>
                  <span className="badge round-pill text-muted">
                    {moment(comment.created).fromNow()}
                    {state &&
                      state.user &&
                      state.user._id === comment.postedBy._id && (
                        <div className="ml-auto mt-1">
                          <DeleteOutlined
                            onClick={() => removeComment(post._id, comment)}
                            className="pl-2 text-danger"
                          />
                        </div>
                      )}
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

export default Post;
