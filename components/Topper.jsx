import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default ({ title, description, topperClass }) => {
  return (
    <>
      <header className={topperClass}>
        {topperClass === "main-topper" ? (
          <>
            <div>
              <h1>{title}</h1>
              <p className="topper_content">{description}</p>
            </div>
            <Link href="/info/fablab">
              <button className="link-button">
                <a>
                  <span>Lees meer</span>
                </a>
              </button>
            </Link>
          </>
        ) : (
          <>
            <h1>{title}</h1>
            <p className="topper_content">{description}</p>
          </>
        )}
      </header>
    </>
  );
};
