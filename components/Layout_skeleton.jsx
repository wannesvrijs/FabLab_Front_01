import Head from "next/head";
import Navbar from "./NavBar";
import Topper from "./Topper";
import Footer from "./Footer";

export default ({ title, children, style = "" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`main-container ${style}`}>
        <Navbar></Navbar>
        {children}
      </div>
      <Footer></Footer>
    </>
  );
};
