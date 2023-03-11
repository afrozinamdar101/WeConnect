import Link from "next/Link";

const Nav = () => {
  return (
    <nav
      className="nav d-flex justify-content-end"
      style={{ backgroundColor: "blue" }}
    >
      <Link href="/" className="nav-link text-light logo">
        WeConnect
      </Link>
      <Link href="/login" className="nav-link text-light">
        Login
      </Link>
      <Link href="/register" className="nav-link text-light">
        Register
      </Link>
    </nav>
  );
};

export default Nav;
