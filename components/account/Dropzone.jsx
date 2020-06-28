import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { forceShort } from "../../helpers/helpers";
import { AiOutlinePlus } from "react-icons/ai";

export default ({
  validFiles,
  setValidFiles,
  unsupportedFiles,
  setUnsupportedFiles,
  violations,
  setViolations,
}) => {
  const fileInputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let filteredArr = selectedFiles.reduce((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setValidFiles([...filteredArr]);
  }, [selectedFiles]);

  const violationAndErrorHandler = (name) => {
    if (violations[name]) {
      return (
        <p className="inputAllertMessage">
          Een van de bestanden is te groot, de maximale grootte is 2MB
        </p>
      );
    }
  };

  const filesSelected = () => {
    const { fabimgImgFile: undefined, ...rest } = violations;
    setViolations(rest);
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        files[i]["invalid"] = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage("File type not permitted");
        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const fileSize = (size) => {
    if (size === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseInt(Math.ceil(size / Math.pow(k, i))) + " " + sizes[i];
  };

  const removeFile = (name) => {
    const { fabimgImgFile: undefined, ...rest } = violations;
    setViolations(rest);
    const index = validFiles.findIndex((e) => e.name === name);
    const index2 = selectedFiles.findIndex((e) => e.name === name);
    const index3 = unsupportedFiles.findIndex((e) => e.name === name);
    validFiles.splice(index, 1);
    selectedFiles.splice(index2, 1);
    setValidFiles([...validFiles]);
    setSelectedFiles([...selectedFiles]);
    if (index3 !== -1) {
      unsupportedFiles.splice(index3, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };

  return (
    <>
      {unsupportedFiles.length ? (
        <p className="error">Please remove all unsupported files.</p>
      ) : (
        ""
      )}
      <div className="upload-box" onClick={fileInputClicked}>
        <AiOutlinePlus />
        <span>Upload afbeeldingen</span>
      </div>
      <input
        ref={fileInputRef}
        className="file-input"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        multiple
        onChange={filesSelected}
      />

      <div className="file-display-container">
        {validFiles.map((data, i) => (
          <div className="file-status-bar" key={i}>
            {/* keep this check for browsers not supporting the 'accept' */}
            <div
              className="left"
              onClick={data.invalid ? () => removeFile(data.name) : ""}
            >
              <img className="detail-img" src={URL.createObjectURL(data)} />
              <p className={`file-name ${data.invalid ? "file-error" : ""}`}>
                {`${forceShort(data.name, 20)}${data.name.split(".").pop()}`}
                <span className="tiny"> ({fileSize(data.size)})</span>
              </p>
              {/* keep this check for browsers not supporting the 'accept' */}
              {data.invalid && (
                <span className="file-error-message">({errorMessage})</span>
              )}
            </div>
            <MdClose
              className="file-remove"
              onClick={() => removeFile(data.name)}
            />
          </div>
        ))}
        {violationAndErrorHandler("fabimgImgFile")}
      </div>
    </>
  );
};
