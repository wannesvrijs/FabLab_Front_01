import { Container, Row, Col } from "react-bootstrap";

export default ({ title, description, titleclass }) => {
  return (
    <>
      <header>
        <h1 className={titleclass}>{title}</h1>
        <p className="topper_content">{description}</p>
      </header>
    </>
  );
};
