import { useEffect, useState } from "react";

export default ({ totalItems }) => {
  const totalPages = Math.ceil(totalItems / 8);
  const [arrayOfNumbers, setArrayOfNumbers] = useState([]);

  useEffect(() => {
    for (let i = 0; i < totalPages; i++) {
      setArrayOfNumbers([...arrayOfNumbers, `${i + 1}`]);
    }
  }, []);

  return arrayOfNumbers.map((nr) => <a>{nr}</a>);
};
