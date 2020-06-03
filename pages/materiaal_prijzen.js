import Topper from "../components/Topper";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Navbar from "../components/Navigation";
import Store from "../components/materiaal_prijzen/StoreTable";

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
          title="Materiaal & prijzen"
          paragraph="In onze kleine winkel hebben we ter plaatsen volgende materialen ter beschikking"
        ></Topper>
        <Store></Store>
      </Container>
    </>
  );
};
