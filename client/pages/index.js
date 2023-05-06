import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import io from "socket.io-client";

import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import PostPublic from "../components/cards/PostPublic";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKETIO,
  { path: "/socket.io" },
  {
    reconnection: true,
  }
);

const Home = ({ posts }) => {
  const [state, setState] = useContext(UserContext);

  const [newsFeed, setNewsFeed] = useState([]);

  // useEffect(() => {
  //   // console.log("Socket.io on join =>", socket);
  //   socket.on("receive-message", (receivedMessage) => {
  //     alert(receivedMessage);
  //   });
  // }, []);

  useEffect(() => {
    // console.log("Socket.io on join =>", socket);
    socket.on("new-post", (newPost) => {
      setNewsFeed([newPost, ...posts]);
    });
  }, []);

  const head = () => {
    <Head>
      <title>WeConnect - Way of connecting people</title>
      <meta name="description" content="WeConnect - Way of connecting people" />
      <meta
        property="og:description"
        content="WeConnect - Way of connecting people"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WeConnect" />
      <meta property="og:url" content="http://weconnect.com" />
      <meta
        property="og:image:secure_url"
        content="http://weconnect.com/images/default.jpg"
      />
    </Head>;
  };

  // this collection holds posts
  const collection = newsFeed.length > 0 ? newsFeed : posts;

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpg" />

      <div className="container">
        
        {/* <button
          onClick={() => {
            socket.emit("send-message", "Hello from client");
          }}
        >
          Send message
        </button> */}
        <div className="row pt-5">
          {collection.map((post) => (
            <div key={post._id} className="col-md-4">
              <Link
                href={`/post/view/${post._id}`}
                style={{ textDecoration: "none" }}
              >
                <PostPublic key={post._id} post={post} page="home" />
              </Link>
              {/* <PostPublic key={post._id} post={post} /> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get("/posts");
  // console.log(data);
  return {
    props: { posts: data },
  };
}

export default Home;
