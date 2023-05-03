import axios from "axios";
import Head from "next/head";

import ParallaxBG from "../../../components/cards/ParallaxBG";
import PostPublic from "../../../components/cards/PostPublic";

const SinglePost = ({ post }) => {
  const head = () => {
    <Head>
      <title>WeConnect - Way of connecting people</title>
      <meta name="description" content={post.content} />
      <meta
        property="og:description"
        content="WeConnect - Way of connecting people"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WeConnect" />
      <meta
        property="og:url"
        content={`http://weconnect.com/post/view/${post._id}`}
      />
      <meta property="og:image:secure_url" content={imageSource(post)} />
    </Head>;
  };

  const imageSource = (post) => {
    if (post.image) {
      return post.image.url;
    } else {
      return "/images/default.jpg";
    }
  };

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpg" />
      <div className="container">
        <div className="row pt-5">
          <div className="col-md-8 offset-md-2">
            <PostPublic key={post._id} post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);
  // console.log(data);
  return {
    props: { post: data },
  };
}

export default SinglePost;
