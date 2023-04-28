import { Avatar } from "antd";

const CreatePostForm = () => {
  return (
    <div className="card">
      <div className="card-body pb-3">
        <form className="form-group">
          <textarea
            className="form-control"
            placeholder="Write something..."
          ></textarea>
        </form>
      </div>

      <div className="card-footer">
        <button className="btn btn-primary btn-sm mt-1">Post</button>
      </div>
    </div>
  );
};

export default CreatePostForm;
