import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import axios from "axios";
import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { setUser } from "../../store/user";
import { useDispatch } from "react-redux";

export default () => {
  const cookies = parseCookies();
  const dispatch = useDispatch();

  const onSignUp = () => {
    const credentials = { email: inputs.email, password: inputs.password };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}login`, credentials)
      .then((response) => {
        setCookie(null, "jwtToken", response.data.token, {
          maxAge: 60 * 60,
          path: "/",
          sameSite: "lax",
        });
        dispatch(setUser(response.data.data));
        Router.push("/account");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { inputs, errors, handleInputChange, handleSubmit } = useForm(onSignUp);

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

  return (
    <>
      <form className="login_form" onSubmit={handleSubmit}>
        <div class="float-container">
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="text"
            name="email"
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={classNames("input", { inputerror: errors.email })}
            value={inputs.email || ""}
          />
          {!errors.email || (
            <p className="inputAllertMessage">Geef een geldig emailadres in</p>
          )}
        </div>

        <div class="float-container">
          <label htmlFor="wachtwoord">wachtwoord:</label>
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
            <p className="inputAllertMessage">Geef een geldig wachtwoord in</p>
          )}
        </div>

        <button type="submit">submit</button>
      </form>
    </>
  );
};
