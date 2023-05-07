import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import PostForm from "../../../components/forms/PostForm";
import UserRoute from "../../../components/routes/UserRoute";

const EditPost = () => {
  const [post, setPost] = useState({});
  // state
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  //   console.log("router", router);
  const _id = router.query._id;

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
      setContent(data.content);
      setImage(data.image);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("submit post to update");
    try {
      const { data } = await axios.put(`/update-post/${post._id}`, {
        content,
        image,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post updated successsfully");
        router.push("/user/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    // console.log([...formData]);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      // console.log("Uploaded image =>", data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <UserRoute>
      <div className="dash_bg">
      <div className="container-fluid">
        <div className="row py-5 text-light">
          <div className="col text-center">
            <h1>Spartan Feed</h1>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8 offset-md-2" style={{ marginBottom: '1000px' }} >
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </div>

          {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
        </div>
      </div>
      </div>
    </UserRoute>
  );
};
export default EditPost;
