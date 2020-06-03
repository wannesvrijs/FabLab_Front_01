import { Container, Row, Col } from "react-bootstrap";

export default ({ title, paragraph }) => {
  return (
    <>
      <Row>
        <Col xs={12} md={{ span: 8, offset: 2 }}>
          <header>
            <h1>{title}</h1>
            <p className="topper_content">{paragraph}</p>
          </header>
        </Col>
      </Row>
      <style jsx>{`
        header {
          padding-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
      `}</style>
    </>
  );
};
