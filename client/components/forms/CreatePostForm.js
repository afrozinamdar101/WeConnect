import { Avatar } from "antd";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreatePostForm = ({ content, setContent, postSubmit }) => {
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

      <div className="card-footer">
        <button
          disabled={!content}
          onClick={postSubmit}
          className="btn btn-primary btn-sm mt-1"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostForm;
