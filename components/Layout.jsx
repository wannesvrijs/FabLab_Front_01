import Head from "next/head";
import NavBar from "./NavBar";
import Topper from "./Topper";
import Footer from "./Footer";

export default ({ title, description, topperClass, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`main-container`}>
        <NavBar></NavBar>
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
