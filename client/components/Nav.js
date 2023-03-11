import { useContext, useEffect, useState } from "react";
import Link from "next/Link";
import { useRouter } from "next/router";

import { UserContext } from "../context";

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const [currentLink, setCurrentLink] = useState("");

  useEffect(() => {
    process.browser && setCurrentLink(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <nav
      className="nav d-flex justify-content-end"
      style={{ backgroundColor: "blue" }}
    >
      <Link
        href="/"
        className={`nav-link text-light logo ${
          currentLink === "/" && "active"
        }`}
      >
        WeConnect
      </Link>

      {state !== null ? (
        <>
          <Link
            href="/user/dashboard"
            className={`nav-link text-light ${
              currentLink === "/user/dashboard" && "active"
            }`}
          >
            {state.user.name}
          </Link>

          <Link
            href="/logout"
            onClick={logout}
            className={`nav-link text-light ${
              currentLink === "/logout" && "active"
            }`}
          >
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className={`nav-link text-light ${
              currentLink === "/login" && "active"
            }`}
          >
            Login
          </Link>

          <Link
            href="/register"
            className={`nav-link text-light ${
              currentLink === "/register" && "active"
            }`}
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
