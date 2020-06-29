import { useForm } from "../../hooks/formhooks";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createFabmoments } from "../../store/myFabmoments";
import Dropzone from "./Dropzone";
import TextareaAutosize from "react-textarea-autosize";

export default ({ setCreateNew }) => {
  const onCreation = () => {
    dispatch(
      createFabmoments({
        textual: {
          fabTitel: inputs.fabTitel,
          fabOmschrijving: inputs.fabOmschrijving,
          fabDatum: inputs.fabDatum,
          fabMats: materialen.map((materiaal) => ({ fabmatMat: materiaal })),
          fabMaches: [
            {
              fabmachMcat: inputs.fabTechniek,
            },
          ],
        },
        files: validFiles,
      })
    );
  };

  const { myFabCreators, myFabmoments } = useSelector((state) => state);
  const {
    inputs,
    errors,
    handleInputChange,
    handleSubmit,
    setErrors,
    setInputs,
  } = useForm(onCreation);
  const [materialen, setMaterialen] = useState([]);
  const [error, setError] = useState("");
  const [violations, setViolations] = useState({});

  //dropzone states
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);

  const dispatch = useDispatch();

  //set violations as soon as the error is set
  useEffect(() => {
    setViolations(myFabmoments.error);
    setError("Vul alle velden correct in.");
  }, [myFabmoments.error]);

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

  const annuleer = () => {
    setErrors({});
    setInputs({});
    setError("");
    setValidFiles([]);
    setUnsupportedFiles([]);
    setViolations({});
    setCreateNew(false);
  };

  const dropzoneProps = {
    validFiles,
    setValidFiles,
    unsupportedFiles,
    setUnsupportedFiles,
    violations,
    setViolations,
  };

  return (
    <div className="my-fabcreation">
      {/* {unsupportedFiles.length === 0 && validFiles.length > 0 && (
        <p>valid files have been added</p>
      )} */}
      <div className="dropzone-container">
        <Dropzone {...dropzoneProps} />
      </div>
      <div className="my-fabform-container">
        <div className="input-datum-container">
          <div className="float-container">
            <label htmlFor="datum">Gerealiseerd op</label>
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
        </div>

        <form onSubmit={handleSubmit}>
          <div className="float-container">
            <label htmlFor="titel">titel</label>
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

          <div className="float-container omschrijving-container">
            <label className="label-textarea" htmlFor="omschrijving">
              Omschrijving
            </label>
            <TextareaAutosize
              minRows="2"
              maxRows="10"
              id="omschrijving"
              name="fabOmschrijving"
              onChange={handleInputChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={classNames("input", {
                inputerror:
                  errors.fabOmschrijving || violations.fabOmschrijving,
              })}
              value={inputs.fabOmschrijving || ""}
            />
            {violationAndErrorHandler(
              "fabOmschrijving",
              "Vul een geldige omschrijving in."
            )}
          </div>

          <div className="float-container">
            <label htmlFor="fabTechniek">Techniek</label>
            <select
              name="fabTechniek"
              id="fabTechniek"
              onChange={(e) => {
                handleInputChange(e);
                //todo
                // techniekChangeHandler(e);
              }}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={classNames("input", {
                inputerror: errors.fabTechniek || violations.fabTechniek,
              })}
              value={inputs.fabTechniek || ""}
            >
              <option value=""></option>
              {myFabCreators.technieken.map((techniek) => (
                <option
                  key={techniek.id}
                  value={`/api/machine_categories/${techniek.id}`}
                >
                  {techniek.mcatNaam}
                </option>
              ))}
            </select>
            {violationAndErrorHandler("fabTechniek", "Kies een techniek.")}
          </div>

          <div className="splitter"></div>

          <p className="checkbox-titel">Gebruikte materialen</p>
          <div className="checkboxes">
            {myFabCreators.materials.map((materiaal) => (
              <div className="checkbox" key={materiaal.id}>
                <input
                  type="checkbox"
                  id={materiaal.matNaam}
                  name={materiaal.matNaam}
                  value={`/api/materiaals/${materiaal.id}`}
                  onChange={materiaalChangeHandler}
                />
                <label htmlFor={materiaal.matNaam}>{materiaal.matNaam}</label>{" "}
              </div>
            ))}
          </div>
          <div className="fabform-button-container">
            <button type="submit">Toevoegen</button>
            <button type="button" className="error-button" onClick={annuleer}>
              Annuleren
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
