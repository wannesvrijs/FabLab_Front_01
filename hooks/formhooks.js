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
    setInputs,
    inputs,
    setErrors,
    errors,
  };
};
