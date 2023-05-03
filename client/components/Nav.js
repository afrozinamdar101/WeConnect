import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar } from "antd";

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
        <Avatar src="/images/logo.png" />
        WeConnect
      </Link>

      {state !== null ? (
        <>
          <div className="dropdown">
            <a
              className="btn dropdown-toggle text-light"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {state && state.user && state.user.name}
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link
                  href="/user/dashboard"
                  className={`nav-link drpodown-item ${
                    currentLink === "/user/dashboard" && "active"
                  }`}
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/user/profile/update"
                  className={`nav-link drpodown-item ${
                    currentLink === "/user/profile/update" && "active"
                  }`}
                >
                  Profile
                </Link>
              </li>

              {state.user.role === "Admin" && (
                <li>
                  <Link
                    href="/admin"
                    className={`nav-link dropdown-item ${
                      currentLink === "/admin" && "active"
                    }`}
                  >
                    Admin
                  </Link>
                </li>
              )}

              <li>
                <Link
                  href="/logout"
                  onClick={logout}
                  className={`nav-link dropdown-item ${
                    currentLink === "/logout" && "active"
                  }`}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
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
