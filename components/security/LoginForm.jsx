import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import axios from "axios";
import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { setUser } from "../../store/user";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { validateMail } from "../../helpers/helpers";

export default () => {
  const cookies = parseCookies();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const onSignUp = () => {
    const credentials = { email: inputs.email, password: inputs.password };

    if (Object.values(errors).includes(true)) {
      setError("Vul alle velden correct in.");
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}login`, credentials)
      .then((response) => {
        setCookie(null, "jwtToken", response.data.token, {
          maxAge: 60 * 60,
          path: "/",
          sameSite: "lax",
        });
        dispatch(setUser(response.data.data));
        console.log(response.data.data);
        Router.push("/account");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError(`Er werd geen geldig profiel gevonden voor ${inputs.email}`);
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

  const handleFocus = (e) => {
    const target = e.target;
    target.parentNode.classList.add("float-active");
  };

  const handleBlur = (e) => {
    const target = e.target;
    if (!target.value) {
      target.parentNode.classList.remove("float-active");
    }
  };

  const validateLoginMail = (e) => {
    if (!validateMail(e.target.value)) {
      setErrors({ ...errors, ["email"]: true });
    }
  };

  return (
    <>
      <form className="login_form" onSubmit={handleSubmit}>
        <div className="float-container">
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="text"
            name="email"
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={(e) => {
              handleBlur(e);
              validateLoginMail(e);
            }}
            className={classNames("input", { inputerror: errors.email })}
            value={inputs.email || ""}
          />
          {!errors.email || (
            <p className="inputAllertMessage">Vul een geldig emailadres in.</p>
          )}
        </div>

        <div className="float-container">
          <label htmlFor="wachtwoord">wachtwoord</label>
          <input
            id="wachtwoord"
            type="password"
            name="password"
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={classNames("input", {
              inputerror: errors.password,
            })}
            value={inputs.password || ""}
          />
          {!errors.password || (
            <p className="inputAllertMessage">Vul een geldig wachtwoord in.</p>
          )}
        </div>

        {error && <p className="tiny error-dark">{error}</p>}

        <button type="submit">Aanmelden</button>
      </form>
    </>
  );
};
