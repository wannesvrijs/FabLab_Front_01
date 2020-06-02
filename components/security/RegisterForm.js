import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import axios from "axios";
import Router from "next/router";
import { useCookies } from "react-cookie";
import { useState } from "react";

export default () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const onSignUp = () => {
    const credentials = {
      email: inputs.email,
      password: inputs.password,
      useLand: "/api/lands/4",
      useGemeente: inputs.useGemeente,
      useVn: inputs.useVn,
      useAn: inputs.useAn,
      useGeboorte: inputs.useGeboorte,
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

  const handleLandInputChange = () => {};

  const handlePostcodeInputBlur = () => {};

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login_vn">voornaam:</label>
        <input
          id="login_vn"
          type="text"
          name="useVn"
          onChange={handleInputChange}
          onBlur={handleVnInputBlur}
          className={classNames("input", { inputerror: errors.useVn })}
          value={inputs.useVn || ""}
          required
        />
        {!errors.useVn || (
          <p className="inputAllertMessage">Geef een geldige voornaam in</p>
        )}

        <label htmlFor="login_an">achternaam:</label>
        <input
          id="login_an"
          type="text"
          name="useAn"
          onChange={handleInputChange}
          onBlur={handleAnInputBlur}
          className={classNames("input", { inputerror: errors.useAn })}
          value={inputs.useAn || ""}
          required
        />
        {!errors.useAn || (
          <p className="inputAllertMessage">Geef een geldige achternaam in</p>
        )}

        <label htmlFor="login_email">email:</label>
        <input
          id="login_email"
          type="email"
          name="email"
          onChange={handleInputChange}
          className={classNames("input", { inputerror: errors.email })}
          value={inputs.email || ""}
          required
        />
        {!errors.email || (
          <p className="inputAllertMessage">Geef een geldig mailadres in</p>
        )}
        <label htmlFor="login_wachtwoord">wachtwoord:</label>
        <input
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          id="login_wachtwoord"
          type="password"
          name="password"
          onChange={(e) => {
            handleInputChange(e);
          }}
          className={classNames("input", { inputerror: errors.password })}
          value={inputs.password || ""}
          required
        />
        <p className="inputAllertMessage">
          Je wachtwoord moet minimaal bevatten: 8 tekens, 1 hoofdletter, 1
          kleine letter, 1 cijfer
        </p>

        <label htmlFor="login_herhaal_wachtwoord">herhaal wachtwoord:</label>
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

        <label htmlFor="login_land">land:</label>
        <input
          id="login_land"
          type="text"
          name="useLand"
          list="dataList"
          onChange={(e) => {
            handleInputChange(e);
            handleLandInputChange();
          }}
          className={classNames("input", { inputerror: errors.useLand })}
          value={inputs.useLand || ""}
          required
        />
        <datalist id="dataList">
          {["belgie", "argentinie", "leonie"].map((item, key) => (
            <option key={key} value={item} />
          ))}
        </datalist>

        {/*
         <label htmlFor="login_herhaal_wachtwoord">gemeente:</label>
            <input
          id="login_gemeente"
          type="password"
          name="herhaalPassword"
          onChange={handleInputChange}
          onBlur={handleHerhaalPassword}
          className={classNames("input", { inputerror: errorHerhaalPassword })}
          value={inputs.herhaalPassword || ""}
          required
        /> */}
        {/* <label htmlFor="login_postcode">postcode:</label>
        <input
          id="login_postcode"
          type="text"
          name="usePostcode"
          onChange={handleInputChange}
          onBlur={handlePostcodeInputBlur}
          className={classNames("input", { inputerror: errors.usePostcode })}
          value={inputs.usePostcode || ""}
          required
        /> */}
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
          className={classNames("input", { inputerror: errors.useRichting })}
          value={inputs.useRichting || ""}
          required
        />
        {!errors.useRichting || (
          <p className="inputAllertMessage">Geef een geldige richting in</p>
        )}

        <button type="submit">Registreer</button>
      </form>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  );
};
