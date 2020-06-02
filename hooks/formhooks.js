import { useState } from "react";

export const useForm = (callback) => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    callback();
  };

  const handleInputChange = (event) => {
    event.persist();

    event.target.value
      ? [
          setInputs({ ...inputs, [event.target.name]: event.target.value }),
          setErrors({ ...errors, [event.target.name]: false }),
        ]
      : [
          setInputs({ ...inputs, [event.target.name]: event.target.value }),
          setErrors({ ...errors, [event.target.name]: true }),
        ];
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setErrors,
    errors,
  };
};

// export const useField = (str = "", errorSupport = false) => {
//   const [value, setValue] = useState(str);
//   const [error, setError] = useState(false);
//   const onChange = (e) => {
//     setError(false);
//     setValue(e.target.value);
//   };
//   if (errorSupport) {
//     return { value, onChange, error, setError, setValue };
//   } else {
//     return { value, onChange };
//   }
// };
