import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createFabmoments } from "../../store/myFabmoments";
import Dropzone from "./Dropzone";

export default ({ newFabmoment, setNewFabmoment }) => {
  const onCreation = () => {
    dispatch(
      createFabmoments({
        textual: {
          fabTitel: inputs.fabTitel,
          fabOmschrijving: inputs.fabOmschrijving,
          fabDatum: inputs.fabDatum,
          fabMats: materialen.map((materiaal) => ({ fabmatMat: materiaal })),
          fabMaches: machines.map((machine) => ({ fabmachMach: machine })),
        },
        files: validFiles,
      })
    );
  };

  const { myFabCreators } = useSelector((state) => state);
  const {
    inputs,
    errors,
    handleInputChange,
    handleSubmit,
    setErrors,
  } = useForm(onCreation);
  const [materialen, setMaterialen] = useState([]);
  const [machines, setMachines] = useState([]);

  //dropzone states
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [error, setError] = useState("");
  const [violations, setViolations] = useState({});

  const dispatch = useDispatch();

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

  const dropzoneProps = {
    validFiles,
    setValidFiles,
    unsupportedFiles,
    setUnsupportedFiles,
  };

  return (
    <>
      {unsupportedFiles.length === 0 && validFiles.length > 0 && (
        <p>valid files have been added</p>
      )}

      <Dropzone {...dropzoneProps} />

      <form onSubmit={handleSubmit}>
        <div className="float-container">
          <label htmlFor="titel">titel:</label>
          <input
            id="titel"
            type="text"
            name="fabTitel"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={classNames("input", {
              inputerror: errors.fabTitel || violations.fabTitel,
            })}
            value={inputs.fabTitel || ""}
          />
          {violationAndErrorHandler("fabTitel", "Vul een geldige titel in.")}
        </div>

        <div className="float-container">
          <label htmlFor="titel">omschrijving:</label>
          <div
            contentEditable="true"
            id="omschrijving"
            name="fabOmschrijving"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={classNames("input div-edit", {
              inputerror: errors.fabOmschrijving || violations.fabOmschrijving,
            })}
            value={inputs.fabOmschrijving || ""}
          />
          {violationAndErrorHandler(
            "fabOmschrijving",
            "Vul een geldige omschrijving in."
          )}
        </div>

        <div className="float-container">
          <label htmlFor="datum">Gerealiseerd op:</label>
          <input
            id="datum"
            type="date"
            name="fabDatum"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={classNames("input", "input-geboorte", {
              inputerror: errors.fabDatum || violations.fabDatum,
            })}
            value={inputs.fabDatum || ""}
          />
          {violationAndErrorHandler("fabDatum", "Vul een geldige datum in.")}
        </div>

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
