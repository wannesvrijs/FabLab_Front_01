import { useEffect } from "react";

export default ({ inschrijvingen }) => {
  useEffect(() => {
    console.log(inschrijvingen);
  }, []);
  return <p>myevents</p>;
};
