import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import Router from "next/router";

export default () => {
  const onSearch = () => {
    Router.push(`/fabmoments?searchstring=${inputs.searchstring}`);
  };

  const { inputs, errors, handleInputChange, handleSubmit } = useForm(onSearch);

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
      <button type="submit">zoek</button>
    </form>
  );
};
