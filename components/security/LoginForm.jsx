import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import axios from "axios";
import Router from "next/router";
import { useCookies } from "react-cookie";
import { Container, Row, Col } from "react-bootstrap";

export default () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const onSignUp = () => {
    const credentials = { email: inputs.email, password: inputs.password };

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_ENDPOINT}login`, credentials)
      .then((response) => {
        console.log(response);
        setCookie("jwt", response.data.token, { path: "/" });
        Router.push("/account");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { inputs, errors, handleInputChange, handleSubmit } = useForm(onSignUp);

  return (
    <>
      <Row>
        <Col xs={12} md={{ span: 8, offset: 2 }} l={{ span: 6, offset: 4 }}>
          <form className="login_form" onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={4}>
                <label htmlFor="login_email">email:</label>
              </Col>
              <Col xs={12} md={8}>
                <input
                  id="login_email"
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className={classNames("input", { inputerror: errors.email })}
                  value={inputs.email || ""}
                  required
                />
              </Col>
              <Col xs={12} md={4}>
                <label htmlFor="login_wachtwoord">wachtwoord:</label>
              </Col>
              <Col xs={12} md={8}>
                <input
                  id="login_wachtwoord"
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  className={classNames("input", {
                    inputerror: errors.password,
                  })}
                  value={inputs.password || ""}
                  required
                />
              </Col>
            </Row>
            <button type="submit">submit</button>
          </form>
        </Col>
      </Row>
    </>
  );
};
