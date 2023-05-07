import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { UserContext } from "../context";
import People from "./cards/People";

const Search = () => {
  const [state, setState] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const searchUser = async (e) => {
    e.preventDefault();

    // console.log("Find ${query} from db");
    try {
      const { data } = await axios.get(`/search-user/${query}`);
      //   console.log("search user response =>", data);
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (user) => {
    // console.log("Add user to following list =>", user);
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      // console.log("handle follow response =>", data);

      // update user in local storage keeping the token same
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      // update context
      setState({ ...state, user: data });

      // update people state
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);

      toast.success(`Following ${user.name}`);
    } catch (err) {
      console.log(err);
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
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);

      toast.error(`Unfollowed ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="form-inline row" onSubmit={searchUser}>
        <div className="col-8">
          <input
            onChange={(e) => {
              setQuery(e.target.value);
              setResult([]);
            }}
            value={query}
            className="form-control"
            placeholder="Search Users"
            type="search"
            style={{ textDecoration: "none",color: "black",border: "2px solid gold", borderRadius: "30px", borderInline:"2px solid blue" }}
          />
        </div>

        <div className="col-4">
          <button className="btn btn-outline-primary col-12" type="submit"style={{ textDecoration: "none",color: "white", textShadow: '1px 1px 4px #000',border: "2px solid gold", borderRadius: "30px" }}>
            Search
          </button>
        </div>
      </form>

      {result &&
        result.map((r) => (
          <People
            key={r._id}
            people={result}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
          />
        ))}
    </>
  );
};

export default Search;
