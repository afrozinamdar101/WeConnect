import { useContext } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";

import { UserContext } from "../../context";
import { imageSource } from "../../functions";

const People = ({ people, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={60} src={imageSource(user)} style={{ border: '3px solid gold' }}/>}
              title={
                <div className="d-flex justify-content-between">
                  <Link
                    href={`/user/${user.username}`}
                    style={{ textDecoration: "none",color: "white", textShadow: '1px 1px 4px #000' }}
                  >
                    {user.username}
                  </Link>
                  {state &&
                  state.user &&
                  user.followers &&
                  user.followers.includes(state.user._id) ? (
                    <div className="follow_bg"style={{ border: '3px solid gold' ,color: "white"}}>
                    <span
                      onClick={() => handleUnfollow(user)}
                      className="pointer" style={{ color: "white" ,fontWeight: "bold" }}
                    >
                      Unfollow
                    </span>
                    </div>
                  ) : (
                    <div className="follow_bg"style={{ border: '3px solid gold',color: "white" }}>
                    <span
                      onClick={() => handleFollow(user)}
                      className="pointer" style={{ color: "white",fontWeight: "bold" }}
                    >
                      Follow
                    </span>
                    </div>
                  )}
                </div>
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </>
  );
};

export default People;
