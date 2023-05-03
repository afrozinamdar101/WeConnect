import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import renderHTML from "react-render-html";

import { UserContext } from "../../context";
import AdminRoute from "../../components/routes/AdminRoute";

const Admin = () => {
  const [state, setState] = useContext(UserContext);
  //posts
  const [posts, setPosts] = useState([]);
  // route
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
    }
  }, [state && state.token]);

  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      // console.log("User posts =>", data);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Confirm Delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
      toast.error("Post deleted successfully");
      newsFeed();
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
      newsFeed();
    } catch (err) {}
  };

  return (
    <AdminRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>ADMIN</h1>
          </div>
        </div>

        <div className="row py-4">
          <div className="col-md-8 offset-md-2">
            {posts &&
              posts.map((post) => (
                <div key={post._id} className="d-flex justify-content-between">
                  <div>{renderHTML(post.content)}</div>
                  <div
                    className="text-danger"
                    onClick={() => handleDelete(post)}
                  >
                    Delete
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;
