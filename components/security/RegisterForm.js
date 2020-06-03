import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import axios from "axios";
import Router from "next/router";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanden } from "../../store/landen";
import { Form, Row, Col, Container } from "react-bootstrap";

export default () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const onSignUp = () => {
    const credentials = {
      email: inputs.email,
      password: inputs.password,
      useLand: "/api/lands/7",
      useGemeente: inputs.useGemeente,
      useVn: inputs.useVn,
      useAn: inputs.useAn,
      useGeboorte: "2020-06-01",
      usePostcode: inputs.usePostcode,
      useBeroep: inputs.useBeroep,
      useSchool: inputs.useSchool,
      useRichting: inputs.useRichting,
    };
    // "useGeboorte": "2020-06-01",

    axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users`, credentials)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    inputs,
    errors,
    setErrors,
    handleInputChange,
    handleSubmit,
  } = useForm(onSignUp);
  const dispatch = useDispatch();
  const { landen } = useSelector((state) => state);

  const handleVnInputBlur = () => {
    if (inputs.useVn && inputs.useVn.length < 2) {
      setErrors({ ...errors, ["useVn"]: true });
    }
  };
  const handleAnInputBlur = () => {
    if (inputs.useAn && inputs.useAn.length < 2) {
      setErrors({ ...errors, ["useAn"]: true });
    }
  };

  const handleHerhaalPasswordChange = () => {
    if (!errors.password && inputs.password) {
      if (inputs.password !== inputs.herhaalPassword) {
        setErrors({ ...errors, ["herhaalPassword"]: true });
      }
    }
  };

  const handleLandInputChange = () => {
    if ((inputs.useLand + "").length > 3) {
      dispatch(getLanden(inputs.useLand));
    }
  };

  const handlePostcodeInputBlur = () => {};

  return (
    <>
      <Row>
        <Col xs={12} md={{ span: 8, offset: 2 }} l={{ span: 6, offset: 4 }}>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={5} lg={{ span: 3, offset: 2 }}>
                <label htmlFor="login_vn">voornaam:</label>
              </Col>
              <Col xs={12} md={7} lg={5}>
                <input
                  id="login_vn"
                  type="text"
                  name="useVn"
                  onChange={handleInputChange}
                  onBlur={handleVnInputBlur}
                  className={classNames("input", { inputerror: errors.useVn })}
                  value={inputs.useVn || ""}
                />
                {!errors.useVn || (
                  <p className="inputAllertMessage">
                    Geef een geldige voornaam in
                  </p>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={5} lg={{ span: 3, offset: 2 }}>
                <label htmlFor="login_an">achternaam:</label>
              </Col>
              <Col xs={12} md={7} lg={5}>
                <input
                  id="login_an"
                  type="text"
                  name="useAn"
                  onChange={handleInputChange}
                  onBlur={handleAnInputBlur}
                  className={classNames("input", { inputerror: errors.useAn })}
                  value={inputs.useAn || ""}
                />
                {!errors.useAn || (
                  <p className="inputAllertMessage">
                    Geef een geldige achternaam in
                  </p>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={5} lg={{ span: 3, offset: 2 }}>
                <label htmlFor="login_email">email:</label>
              </Col>
              <Col xs={12} md={7} lg={5}>
                <input
                  id="login_email"
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className={classNames("input", { inputerror: errors.email })}
                  value={inputs.email || ""}
                />
                {!errors.email || (
                  <p className="inputAllertMessage">
                    Geef een geldig mailadres in
                  </p>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={5} lg={{ span: 3, offset: 2 }}>
                <label htmlFor="login_wachtwoord">wachtwoord:</label>
              </Col>
              <Col xs={12} md={7} lg={5}>
                <input
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  id="login_wachtwoord"
                  type="password"
                  name="password"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className={classNames("input", {
                    inputerror: errors.password,
                  })}
                  value={inputs.password || ""}
                />
                <p className="inputAllertMessage">
                  Je wachtwoord moet minimaal bevatten: 8 tekens, 1 hoofdletter,
                  1 kleine letter, 1 cijfer
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={5} lg={{ span: 3, offset: 2 }}>
                <label htmlFor="login_herhaal_wachtwoord">
                  herhaal wachtwoord:
                </label>
              </Col>
              <Col xs={12} md={7} lg={5}>
                <input
                  id="login_herhaal_wachtwoord"
                  type="password"
                  name="herhaalPassword"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  onBlur={handleHerhaalPasswordChange}
                  className={classNames("input", {
                    inputerror: errors.herhaalPassword,
                  })}
                  value={inputs.herhaalPassword || ""}
                  required
                />
                {!errors.herhaalPassword || (
                  <p className="inputAllertMessage">
                    De wachtwoorden komen niet overeen
                  </p>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={5} lg={{ span: 3, offset: 2 }}>
                <label htmlFor="login_land">land:</label>
              </Col>
              <Col xs={12} md={7} lg={5}>
                <input
                  id="login_land"
                  type="text"
                  name="useLand"
                  list="dataList"
                  onChange={(e) => {
                    handleInputChange(e);
                    handleLandInputChange();
                  }}
                  className={classNames("input", {
                    inputerror: errors.useLand,
                  })}
                  value={inputs.useLand || ""}
                  required
                />
                <datalist id="dataList">
                  {landen.data.map((land) => (
                    <option key={land.id} value={land.landNaam} />
                  ))}
                </datalist>
              </Col>
            </Row>

            {/* //////////////////////////////// */}
            <Col xs={12} md={5} lg={{ span: 3, offset: 2 }}>
              <label htmlFor="login_gemeente">gemeente:</label>
            </Col>
            <input
              id="login_gemeente"
              type="text"
              name="useGemeente"
              onChange={handleInputChange}
              className={classNames("input", {
                inputerror: errors.useGemeente,
              })}
              value={inputs.useGemeente || ""}
              required
            />

            <label htmlFor="login_postcode">postcode:</label>
            <input
              id="login_postcode"
              type="text"
              name="usePostcode"
              onChange={handleInputChange}
              onBlur={handlePostcodeInputBlur}
              className={classNames("input", {
                inputerror: errors.usePostcode,
              })}
              value={inputs.usePostcode || ""}
              required
            />

            <label htmlFor="login_beroep">Beroep:</label>
            <select
              name="useBeroep"
              id="login_beroep"
              onChange={handleInputChange}
              className={classNames("input", { inputerror: errors.useBeroep })}
              value={inputs.useBeroep || ""}
            >
              <option value="">– – –</option>
              <option value="Student">Student</option>
              <option value="Andere">Andere</option>
            </select>
            {!errors.useBeroep || (
              <p className="inputAllertMessage">Geef een geldig beroep in</p>
            )}

            <label htmlFor="login_school">School:</label>
            <input
              id="login_school"
              type="text"
              name="useSchool"
              onChange={handleInputChange}
              onBlur={handlePostcodeInputBlur}
              className={classNames("input", { inputerror: errors.useSchool })}
              value={inputs.useSchool || ""}
              required
            />
            {!errors.useSchool || (
              <p className="inputAllertMessage">Geef een geldige school in</p>
            )}
            <label htmlFor="login_richting">Richting:</label>
            <input
              id="login_richting"
              type="text"
              name="useRichting"
              onChange={handleInputChange}
              onBlur={handlePostcodeInputBlur}
              className={classNames("input", {
                inputerror: errors.useRichting,
              })}
              value={inputs.useRichting || ""}
              required
            />
            {!errors.useRichting || (
              <p className="inputAllertMessage">Geef een geldige richting in</p>
            )}
            <button type="submit">Registreer</button>
          </form>
        </Col>
      </Row>
    </>
  );
};
