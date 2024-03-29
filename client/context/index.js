import axios from "axios";

import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);

  const router = useRouter();

  const token = state && state.token ? state.token : "";

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

  // This configuration ensures headers are sent for every request to authorize user
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // Response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status code that lie outside the range of 2xx cause this function to trigger
      // Do something with response error
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setState(null);
        window.localStorage.removeItem("auth");
        router.push("/login");
      }
    }
  );

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
