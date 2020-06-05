import Head from "next/head";
import Navbar from "./NavBar";
import Topper from "./Topper";
import Footer from "./Footer";
import { Container, Row, Col } from "react-bootstrap";

export default ({ title, description, titleclass, children }) => {
  return (
    <>
      <Head>
        <title>{title}}</title>
      </Head>
      <Navbar></Navbar>
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
