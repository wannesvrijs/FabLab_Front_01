import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import Router from "next/router";
import { useState } from "react";

export default ({ materiaal, techniek }) => {
  const [materialen, setMaterialen] = useState([]);
  const [technieken, setTechnieken] = useState([]);

  const onSearch = () => {
    const combinedQueryParams = combineParams();
    Router.push(`/fabmoments?${combinedQueryParams}`);
  };

  const { inputs, errors, handleInputChange, handleSubmit } = useForm(onSearch);

  const materiaalChangeHandler = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setMaterialen([...materialen, value]);
    } else {
      setMaterialen([...materialen.filter((mat) => mat !== value)]);
    }
  };

  const techniekChangeHandler = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setTechnieken([...technieken, value]);
    } else {
      setTechnieken([...technieken.filter((mat) => mat !== value)]);
    }
  };

  const combineParams = () => {
    const queryParams = [];

    const matQueryParams = materialen.map((mat) => `m=${mat}`).join("&");
    const techQueryParams = technieken.map((tech) => `t=${tech}`).join("&");

    if (
      inputs.searchstring !== undefined &&
      inputs.searchstring.trim().length !== 0
    ) {
      queryParams.push(`s=${inputs.searchstring}`);
    }
    if (matQueryParams.length !== 0) {
      queryParams.push(matQueryParams);
    }
    if (techQueryParams.length !== 0) {
      queryParams.push(techQueryParams);
    }

    return queryParams.join("&");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fabmoments_searchfield">zoek op zoekterm: </label>
      <input
        id="fabmoments_searchfield"
        type="text"
        name="searchstring"
        onChange={handleInputChange}
        className={classNames("input")}
        value={inputs.searchstring || ""}
      />

      <p>techniek</p>
      {techniek["hydra:member"].map((techniek) => (
        <>
          <input
            type="checkbox"
            id={techniek.mcatNaam}
            name={techniek.mcatNaam}
            value={techniek.mcatNaam}
            onChange={techniekChangeHandler}
          />
          <label htmlFor={techniek.mcatNaam}>{techniek.mcatNaam}</label>{" "}
        </>
      ))}

      <p>materiaal</p>
      {materiaal["hydra:member"].map((materiaal) => (
        <>
          <input
            type="checkbox"
            id={materiaal.matNaam}
            name={materiaal.matNaam}
            value={materiaal.matNaam}
            onChange={materiaalChangeHandler}
          />
          <label htmlFor={materiaal.matNaam}>{materiaal.matNaam}</label>{" "}
        </>
      ))}

      <button type="submit">zoek</button>
    </form>
  );
};
