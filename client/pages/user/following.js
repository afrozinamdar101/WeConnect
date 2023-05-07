import { useContext, useState, useEffect } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";

const Following = () => {
  const [state, setState] = useContext(UserContext);
  const [people, setPeople] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (state && state.token) fetchFollowing();
  }, [state && state.token]);

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get("/user-following");
      console.log("Following =>", data);
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/logo.png";
    }
  };

  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });

      // update user in local storage keeping the token same
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      // update context
      setState({ ...state, user: data });

      // update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);

      toast.error(`Unfollowed ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dash_bg" style={{ maxWidth: "auto", backgroundSize: "cover" }}>
      <div className="row col-md-6 ">
        <List
          itemLayout="horizontal"
          dataSource={people}
          renderItem={(user) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size={60} src={imageSource(user)} style={{border: "2px solid gold"}}/>}
                title={
                  <div className="d-flex justify-content-between" style={{color: "gold"}}>
                    {user.username}{" "}
                    <span
                      onClick={() => handleUnfollow(user)}
                      className="follow_bg pointer"style={{ border: '3px solid gold' ,color: "white"}}
                    >
                      Unfollow
                    </span>
                  </div>
                }
              ></List.Item.Meta>
            </List.Item>
          )}
        />

        <Link
          href="/user/dashboard"
          className="d-flex justify-content-center pt-5"
        >
          <div className="follow_bg pb-2 m" style={{ marginBottom: '1000px' }} >
          <RollbackOutlined />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Following;
