import { Avatar } from "antd";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";

// dynamic import since the react-quill npm package is only available on client side but not on server side
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PostForm = ({
  content,
  setContent,
  postSubmit,
  handleImage,
  uploading,
  image,
}) => {
  return (
    <div className="card">
      <div className="card-body pb-3">
        <form className="form-group">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(e) => setContent(e)}
            className="form-control"
            placeholder="Write something..."
          />
        </form>
      </div>

      <div className="card-footer d-flex justify-content-between text-muted">
        <button
          disabled={!content}
          onClick={postSubmit}
          className="btn btn-primary btn-sm mt-1"
        >
          Post
        </button>

        <label>
          {image && image.url ? (
            <Avatar size={30} src={image.url} className="mt-2" />
          ) : uploading ? (
            <LoadingOutlined className="mt-2" />
          ) : (
            <CameraOutlined className="mt-2" />
          )}
          <input onChange={handleImage} type="file" accept="images/*" hidden />
        </label>
      </div>
    </div>
  );
};

export default PostForm;
