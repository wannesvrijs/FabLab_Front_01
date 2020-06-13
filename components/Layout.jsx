import Head from "next/head";
import Navbar2 from "./NavBar2";
import Topper from "./Topper";
import Footer from "./Footer";

export default ({ title, description, titleclass, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar2></Navbar2>
      <div className="main-container">
        <Topper
          title={title}
          description={description}
          titleclass={titleclass || ""}
        ></Topper>
        <main>{children}</main>
      </div>
      <Footer></Footer>
    </>
  );
};
