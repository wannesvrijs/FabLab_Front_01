import { useEffect } from "react";

export default ({ machinerecht }) => {
  useEffect(() => {
    console.log(machinerecht);
  }, []);
  return <p>myRechten</p>;
};
