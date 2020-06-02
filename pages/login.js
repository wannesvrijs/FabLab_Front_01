import LoginForm from "../components/security/LoginForm";
import Topper from "../components/Topper";
import Registerform from "../components/security/Registerform";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Navbar from "../components/Navigation";
import Link from "next/link";

export default () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>
      <Container>
        <Topper
          title="Login"
          paragraph="Log je hier in om nieuwe fabmoments te creeren, inschrijvingen te raadplegen..."
        ></Topper>
        <Row>
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            l={{ span: 6, offset: 4 }}
          >
            <LoginForm></LoginForm>
          </Col>
        </Row>
        <Link href="/registreer">
          <a className="login_registreer">registreer nu</a>
        </Link>
      </Container>
    </>
  );
};
