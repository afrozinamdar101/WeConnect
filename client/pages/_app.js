import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "../context";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <link rel="stylesheet" href="/css/styles.css" />
      </Head>
      <Nav />
      <ToastContainer position="top-center" />
      <Component {...pageProps} />;
    </UserProvider>
  );
}

export default MyApp;
