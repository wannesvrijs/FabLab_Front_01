import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";

export default () => {
  const onCreation = () => {
    console.log(inputs.fabDatum);
  };

  const { inputs, errors, handleInputChange, handleSubmit } = useForm(
    onCreation
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titel">titel:</label>
        <input
          id="titel"
          type="text"
          name="fabTitel"
          onChange={handleInputChange}
          className={classNames("input", { inputerror: errors.fabTitel })}
          value={inputs.fabTitel || ""}
        />
        {!errors.fabTitel || (
          <p className="inputAllertMessage">Geef een titel op</p>
        )}

        <label htmlFor="titel">omschrijving:</label>
        <textarea
          id="omschrijving"
          name="fabOmschrijving"
          onChange={handleInputChange}
          className={classNames("input", {
            inputerror: errors.fabOmschrijving,
          })}
          value={inputs.fabOmschrijving || ""}
        />
        {!errors.fabOmschrijving || (
          <p className="inputAllertMessage">Geef een omschrijving op</p>
        )}

        <label htmlFor="datum">Gerealiseerd op:</label>
        <input
          id="datum"
          type="date"
          name="fabDatum"
          onChange={handleInputChange}
          className={classNames("input", {
            inputerror: errors.fabDatum,
          })}
          value={inputs.fabDatum || ""}
        />

        <button type="submit">Post</button>
      </form>
      <hr />
    </>
  );
};
