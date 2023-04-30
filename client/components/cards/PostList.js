const PostList = ({ posts }) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-5">
            <div className="card-header"></div>
            <div className="card-body"></div>
            <div className="card-footer"></div>
          </div>
        ))}
    </>
  );
};

export default PostList;
