import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import axios from "axios";
import landenList from "../../store/landenList.json";
import Router from "next/router";

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
        Router.push("/account/login");
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

  const handlePasswordBlur = () => {
    if (inputs.password && inputs.password.length < 8) {
      setErrors({ ...errors, ["password"]: true });
    }
  };

  const handleHerhaalPasswordBlur = () => {
    if (!errors.password && inputs.password) {
      if (inputs.password !== inputs.herhaalPassword) {
        setErrors({ ...errors, ["herhaalPassword"]: true });
      }
    }
  };

  const handlePostcodeInputBlur = () => {};

  return (
    <>
      {/* ------------------------------------------------ login + welkom ---------------------------------- */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="vn">voornaam:</label>
        <input
          id="vn"
          type="text"
          name="useVn"
          onChange={handleInputChange}
          onBlur={handleVnInputBlur}
          className={classNames("input", { inputerror: errors.useVn })}
          value={inputs.useVn || ""}
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
        />
        {!errors.email || (
          <p className="inputAllertMessage">Geef een geldig mailadres in</p>
        )}

        <label htmlFor="login_wachtwoord">wachtwoord:</label>
        <input
          id="login_wachtwoord"
          type="password"
          name="password"
          onChange={(e) => {
            handleInputChange(e);
          }}
          onBlur={handlePasswordBlur}
          className={classNames("input", {
            inputerror: errors.password,
          })}
          value={inputs.password || ""}
        />
        <p
          className={classNames("TODOCLASS", {
            inputAllertMessage: errors.password,
          })}
        >
          Je wachtwoord moet minimaal 8 tekens bevatten
        </p>

        <label htmlFor="login_herhaal_wachtwoord">herhaal wachtwoord:</label>
        <input
          id="login_herhaal_wachtwoord"
          type="password"
          name="herhaalPassword"
          onChange={(e) => {
            handleInputChange(e);
          }}
          onBlur={handleHerhaalPasswordBlur}
          className={classNames("input", {
            inputerror: errors.herhaalPassword,
          })}
          value={inputs.herhaalPassword || ""}
        />
        {!errors.herhaalPassword || (
          <p className="inputAllertMessage">
            De wachtwoorden komen niet overeen
          </p>
        )}
        {/* ------------------------------------------------ Persoonsgegevens ---------------------------------- */}

        <label htmlFor="login_geboorte">Geboortedatum:</label>
        <input
          id="login_geboorte"
          type="date"
          name="useGeboorte"
          onChange={handleInputChange}
          className={classNames("input", {
            inputerror: errors.useGeboorte,
          })}
          value={inputs.useGeboorte || ""}
        />

        <label htmlFor="login_land">land:</label>
        <input
          id="login_land"
          type="text"
          name="useLand"
          list="dataList"
          onChange={handleInputChange}
          className={classNames("input", {
            inputerror: errors.useLand,
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

        <label htmlFor="login_gemeente">gemeente:</label>
        <input
          id="login_gemeente"
          type="text"
          name="useGemeente"
          onChange={handleInputChange}
          className={classNames("input", {
            inputerror: errors.useGemeente,
          })}
          value={inputs.useGemeente || ""}
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
        />

        {/* ------------------------------------------------ EXTRA INFO ---------------------------------- */}

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
        />
        {!errors.useRichting || (
          <p className="inputAllertMessage">Geef een geldige richting in</p>
        )}

        <button type="submit">Registreer</button>
      </form>
    </>
  );
};
