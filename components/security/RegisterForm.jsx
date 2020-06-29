import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import axios from "axios";
import landenList from "../../store/landenList.json";
import Router from "next/router";
import { useState } from "react";

export default () => {
  const onSignUp = () => {
    const credentials = {
      useVn: inputs.useVn,
      useAn: inputs.useAn,
      email: inputs.email,
      password: inputs.password,
      useGeboorte: inputs.useGeboorte,
      useLand: inputs.useLand,
      useGemeente: inputs.useGemeente,
      usePostcode: inputs.usePostcode,
      useBeroep: inputs.useBeroep,
      useSchool: inputs.useSchool,
      useRichting: inputs.useRichting,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users`, credentials)
      .then((response) => {
        console.log(response);
        Router.push(`/account/registreer/succes?e=${inputs.email}`);
      })
      .catch((error) => {
        console.log(error);
        //reformat error response message to similar format as the errors-state {fieldname : errormesage, ...}
        if (error.response.status === 400) {
          let newViolationObject = {};
          error.response.data.violations.map(
            (violation) =>
              (newViolationObject = {
                ...newViolationObject,
                [violation.propertyPath]: violation.message,
              })
          );
          setViolations(newViolationObject);
          setError("Vul alle velden correct in.");
        } else {
          setError("Er liep iets mis, probeer later opnieuw.");
        }
      });
  };

  const {
    inputs,
    errors,
    setErrors,
    handleInputChange,
    handleSubmit,
  } = useForm(onSignUp);
  const [error, setError] = useState("");
  const [violations, setViolations] = useState({});

  //handle the label class for inputstyling
  //handle deleting the violation
  const handleFocus = (e) => {
    const { [e.target.name]: undefined, ...rest } = violations;
    setViolations(rest);
    const target = e.target;
    target.parentNode.classList.add("float-active");
  };

  //handle the label class for inputstyling
  const handleBlur = (e) => {
    const target = e.target;
    if (!target.value) {
      target.parentNode.classList.remove("float-active");
    }
  };

  //handle all erros or validation errors coming from the server
  const violationAndErrorHandler = (name, errormsg) => {
    if (errors[name] && errors[name] == true) {
      return <p className="inputAllertMessage">{errormsg}</p>;
    }
    if (violations[name]) {
      return <p className="inputAllertMessage">{violations[name]}</p>;
    }
  };

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

  const handlePasswordBlur = () => {
    if (inputs.password && inputs.password.length < 8) {
      setErrors({ ...errors, ["password"]: true, ["herhaalPassword"]: false });
    } else {
      setErrors({ ...errors, ["password"]: false });
    }
  };

  const handleHerhaalPasswordBlur = () => {
    if (!errors.password && inputs.password) {
      if (inputs.password !== inputs.herhaalPassword) {
        setErrors({ ...errors, ["herhaalPassword"]: true });
      } else {
        setErrors({ ...errors, ["herhaalPassword"]: false });
      }
    } else {
      setErrors({ ...errors, ["herhaalPassword"]: false });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="register_form">
        <div className="float-container">
          <label htmlFor="vn">voornaam</label>
          <input
            id="vn"
            type="text"
            name="useVn"
            onChange={handleInputChange}
            onBlur={(e) => {
              handleVnInputBlur(e);
              handleBlur(e);
            }}
            onFocus={handleFocus}
            className={classNames("input", {
              inputerror: errors.useVn || violations.useVn,
            })}
            value={inputs.useVn || ""}
          />
          {violationAndErrorHandler("useVn", "Vul een geldige voornaam in.")}
        </div>

        <div className="float-container">
          <label htmlFor="login_an">achternaam</label>
          <input
            id="login_an"
            type="text"
            name="useAn"
            onChange={handleInputChange}
            onBlur={(e) => {
              handleAnInputBlur(e);
              handleBlur(e);
            }}
            onFocus={handleFocus}
            className={classNames("input", {
              inputerror: errors.useAn || violations.useAn,
            })}
            value={inputs.useAn || ""}
          />
          {violationAndErrorHandler("useAn", "Vul een geldige achternaam in.")}
        </div>

        <div className="float-container">
          <label htmlFor="login_email">email</label>
          <input
            id="login_email"
            type="email"
            name="email"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={classNames("input", {
              inputerror: errors.email || violations.email,
            })}
            value={inputs.email || ""}
          />
          {violationAndErrorHandler("email", "Vul een geldig mailadres in.")}
        </div>

        <div className="float-container">
          <label htmlFor="login_wachtwoord">wachtwoord</label>
          <input
            id="login_wachtwoord"
            type="password"
            name="password"
            onChange={handleInputChange}
            onBlur={(e) => {
              handlePasswordBlur(e);
              handleBlur(e);
            }}
            onFocus={handleFocus}
            className={classNames("input", {
              inputerror: errors.password || violations.password,
            })}
            value={inputs.password || ""}
          />
          {violationAndErrorHandler(
            "password",
            "Je wachtwoord moet minimaal 8 tekens bevatten."
          )}
        </div>

        <div className="float-container">
          <label htmlFor="login_herhaal_wachtwoord">herhaal wachtwoord</label>
          <input
            id="login_herhaal_wachtwoord"
            type="password"
            name="herhaalPassword"
            onChange={handleInputChange}
            onBlur={(e) => {
              handleHerhaalPasswordBlur(e);
              handleBlur(e);
            }}
            onFocus={handleFocus}
            className={classNames("input", {
              inputerror: errors.herhaalPassword || violations.herhaalPassword,
            })}
            value={inputs.herhaalPassword || ""}
          />
          {violationAndErrorHandler(
            "herhaalPassword",
            "De wachtwoorden komen niet overeen."
          )}
        </div>
        {/* ------------------------------------------------ Persoonsgegevens ---------------------------------- */}

        <div className="splitter"></div>
        <div className="float-container">
          <label htmlFor="login_tel">Telefoonnummer</label>
          <input
            id="login_tel"
            type="text"
            name="useTel"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={classNames("input")}
            value={inputs.useTel || ""}
          />
          {violationAndErrorHandler("useTel", "")}
        </div>

        <div className="float-container">
          <label htmlFor="login_geboorte">Geboortedatum</label>
          <input
            id="login_geboorte"
            type="date"
            name="useGeboorte"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={classNames("input", "input-geboorte", {
              inputerror: errors.useGeboorte || violations.useGeboorte,
            })}
            value={inputs.useGeboorte || ""}
          />
          {violationAndErrorHandler(
            "useGeboorte",
            "Vul een geldige geboortedatum in."
          )}
        </div>

        <div className="float-container">
          <label htmlFor="login_land">land</label>
          <input
            id="login_land"
            type="text"
            name="useLand"
            list="dataList"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={classNames("input", {
              inputerror: errors.useLand || violations.useLand,
            })}
            value={inputs.useLand || ""}
          />
          {inputs.useLand && inputs.useLand.length > 2 && (
            <datalist id="dataList">
              {landenList.map((land, index) => (
                <option key={index} value={land.NL_SHORT} />
              ))}
            </datalist>
          )}
          {violationAndErrorHandler("useLand", "Vul een geldig land in.")}
        </div>

        <div className="float-container">
          <label htmlFor="login_gemeente">gemeente</label>
          <input
            id="login_gemeente"
            type="text"
            name="useGemeente"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={classNames("input", {
              inputerror: errors.useGemeente || violations.useGemeente,
            })}
            value={inputs.useGemeente || ""}
          />
          {violationAndErrorHandler(
            "useGemeente",
            "Vul een geldige gemeente in."
          )}
        </div>

        <div className="float-container">
          <label htmlFor="login_postcode">postcode</label>
          <input
            id="login_postcode"
            type="text"
            name="usePostcode"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={classNames("input", {
              inputerror: errors.usePostcode || violations.usePostcode,
            })}
            value={inputs.usePostcode || ""}
          />
          {violationAndErrorHandler(
            "usePostcode",
            "Vul een geldige postcode in."
          )}
        </div>

        {/* ------------------------------------------------ EXTRA INFO ---------------------------------- */}

        <div className="splitter"></div>
        <div className="float-container">
          <label htmlFor="login_beroep">Beroep</label>
          <select
            name="useBeroep"
            id="login_beroep"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={classNames("input", {
              inputerror: errors.useBeroep || violations.useBeroep,
            })}
            value={inputs.useBeroep || ""}
          >
            <option value=""></option>
            <option value="Student">Student</option>
            <option value="Andere">Andere</option>
          </select>
          {violationAndErrorHandler("useBeroep", "Vul een geldig beroep in.")}
        </div>

        {inputs.useBeroep === "Student" && (
          <>
            <div className="float-container">
              <label htmlFor="login_school">School</label>
              <input
                id="login_school"
                type="text"
                name="useSchool"
                onChange={handleInputChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={classNames("input", {
                  inputerror: errors.useSchool || violations.useSchool,
                })}
                value={inputs.useSchool || ""}
              />
              {violationAndErrorHandler(
                "useSchool",
                "Vul een geldige school in."
              )}
            </div>

            <div className="float-container">
              <label htmlFor="login_richting">Richting</label>
              <input
                id="login_richting"
                type="text"
                name="useRichting"
                onChange={handleInputChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={classNames("input", {
                  inputerror: errors.useRichting || violations.useRichting,
                })}
                value={inputs.useRichting || ""}
              />
              {violationAndErrorHandler(
                "useRichting",
                "Vul een geldige richting in."
              )}
            </div>
          </>
        )}
        {error && <p className="tiny error-dark">{error}</p>}

        <button type="submit">Registreer</button>
      </form>
    </>
  );
};
