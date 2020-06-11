import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createFabmoments } from "../../store/myFabmoments";

export default () => {
  const onCreation = () => {
    dispatch(
      createFabmoments({
        fabTitel: inputs.fabTitel,
        fabOmschrijving: inputs.fabOmschrijving,
        fabDatum: inputs.fabDatum,
        fabMats: materialen.map((materiaal) => ({ fabmatMat: materiaal })),
        fabMaches: machines.map((machine) => ({ fabmachMach: machine })),
      })
    );
  };

  const { myFabCreators } = useSelector((state) => state);
  const { inputs, errors, handleInputChange, handleSubmit } = useForm(
    onCreation
  );
  const [materialen, setMaterialen] = useState([]);
  const [machines, setMachines] = useState([]);
  const dispatch = useDispatch();

  const materiaalChangeHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setMaterialen([...materialen, value]);
    } else {
      setMaterialen([...materialen.filter((mat) => mat !== value)]);
    }
  };

  const machineChangeHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setMachines([...machines, value]);
    } else {
      setMachines([...machines.filter((mach) => mach !== value)]);
    }
  };

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

        <p>Gebruikte materialen</p>
        {myFabCreators.materials.map((materiaal) => (
          <>
            <input
              type="checkbox"
              id={materiaal.matNaam}
              name={materiaal.matNaam}
              value={materiaal["@id"]}
              onChange={materiaalChangeHandler}
            />
            <label htmlFor={materiaal.matNaam}>{materiaal.matNaam}</label>{" "}
          </>
        ))}

        <p>Gebruikte machines</p>
        {myFabCreators.machines.map((machine) => (
          <>
            <input
              type="checkbox"
              id={machine.machNaam}
              name={machine.machNaam}
              value={machine["@id"]}
              onChange={machineChangeHandler}
            />
            <label htmlFor={machine.machNaam}>
              {machine.machNaam}
              <span className="tiny">{` (${machine.machMcat.mcatNaam})`}</span>
            </label>{" "}
          </>
        ))}
        <button type="submit">Post</button>
      </form>
      <hr />
    </>
  );
};
