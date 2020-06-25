import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import Router from "next/router";

export default ({ materiaal, techniek }) => {
  const onSearch = () => {
    const combinedQueryParams = combineParams();
    Router.push(`/fabmoments?${combinedQueryParams}`);
  };

  const { inputs, errors, handleInputChange, handleSubmit } = useForm(onSearch);

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

  const combineParams = () => {
    const queryParams = [];
    if (
      inputs.searchstring !== undefined &&
      inputs.searchstring.trim().length !== 0
    ) {
      queryParams.push(`s=${inputs.searchstring}`);
    }
    if (inputs.techniek) {
      queryParams.push(`t=${inputs.techniek}`);
    }
    if (inputs.materiaal) {
      queryParams.push(`m=${inputs.materiaal}`);
    }
    return queryParams.join("&");
  };

  return (
    <form className="fabmoment-form" onSubmit={handleSubmit}>
      <div class="float-container">
        <label htmlFor="fabmoments_searchfield">zoek op zoekterm: </label>
        <input
          id="fabmoments_searchfield"
          type="text"
          name="searchstring"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          className={classNames("input")}
          value={inputs.searchstring || ""}
        />
      </div>

      <div class="float-container">
        <label htmlFor="techniek">techniek</label>
        <select
          name="techniek"
          id="techniek"
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={classNames("input", { inputerror: errors.useBeroep })}
          value={inputs.techniek || ""}
        >
          <option value=""></option>
          {techniek["hydra:member"].map((techniek) => (
            <option value={techniek.mcatNaam}>{techniek.mcatNaam}</option>
          ))}
        </select>
      </div>

      <div class="float-container">
        <label htmlFor="materiaal">materiaal</label>
        <select
          name="materiaal"
          id="materiaal"
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={classNames("input")}
          value={inputs.materiaal || ""}
        >
          <option value=""></option>

          {materiaal["hydra:member"].map((materiaal) => (
            <option value={materiaal.matNaam}>{materiaal.matNaam}</option>
          ))}
        </select>
      </div>

      <button type="submit">zoek</button>
    </form>
  );
};
