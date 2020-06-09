import Head from "next/head";
import Navbar2 from "./NavBar2";
import Topper from "./Topper";
import Footer from "./Footer";
import { Container, Row, Col } from "react-bootstrap";

export default ({ title, description, titleclass, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar2></Navbar2>
      <Container fluid="true">
        <Topper
          title={title}
          description={description}
          titleclass={titleclass || ""}
        ></Topper>
        {children}
      </Container>
      <Footer></Footer>
    </>
  );
};
