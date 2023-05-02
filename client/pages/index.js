import { useContext, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import io from "socket.io-client";

import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import PostPublic from "../components/cards/PostPublic";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
});
const Home = ({ posts }) => {
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    console.log("Socket.io on join =>", socket);
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
  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpg" />
      <div className="container">
        <div className="row pt-5">
          {posts.map((post) => (
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
