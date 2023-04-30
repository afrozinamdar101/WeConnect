import { useContext } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";

const people = ({ people }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/default.jpg";
    }
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  {user.username} <span className="text-primary">Follow</span>
                </div>
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </>
  );
};

export default people;
