import Topper from "../components/Topper";
import Registerform from "../components/security/Registerform";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Navbar from "../components/Navigation";

export default () => {
  return (
    <>
      <Head>
        <title>Registreer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>
      <Container fluid="true">
        <Topper
          title="Registreer"
          paragraph="Registreer je om nieuwe fabmoments te creeren, inschrijvingen te maken..."
        ></Topper>
        <Registerform></Registerform>
      </Container>
    </>
  );
};
