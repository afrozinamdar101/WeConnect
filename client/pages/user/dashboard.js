import { useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import CreatePostForm from "../../components/forms/CreatePostForm";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  // state
  const [content, setContent] = useState("");
  // route
  const router = useRouter();

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("Content =>", content);
    try {
      const { data } = await axios.post("/create-post", { content });
      console.log("Create post response => ", data);

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("post created");
        setContent("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>News Feed</h1>
          </div>
        </div>

        <div className="row py-5">
          <div className="col md-8">
            <CreatePostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
            />
          </div>
          <div className="col md-4">Side bar</div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Dashboard;
