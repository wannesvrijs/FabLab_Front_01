import Head from "next/head";
import Navbar2 from "./NavBar2";
import Topper from "./Topper";
import Footer from "./Footer";

export default ({ title, description, topperClass, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="main-container">
        <Navbar2></Navbar2>
        <Topper
          title={title}
          description={description}
          topperClass={topperClass || ""}
        ></Topper>
        <main>{children}</main>
      </div>
      <Footer></Footer>
    </>
  );
};
