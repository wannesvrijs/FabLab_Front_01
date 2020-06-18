import { useEffect, useState } from "react";
import axios from "axios";

export default ({ machine }) => {
  const [beschikbaar, setBeschikbaar] = useState(false);

  // as soon as the component is mounted, we query for the machine status and overwrite with new data.
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}machines/${machine.id}`)
      .then((response) => setBeschikbaar(response.data.machBeschikbaar));
  }, []);

  return (
    <>
      <img src={machine.machImgPad} alt={machine.machNaam} />
      <h2>{machine.machNaam}</h2>
      <p>{machine.machOmschrijving}</p>
      <p>afmetingen: {machine.machAfmeting}</p>
      <p>mogelijk bestandstypes: {machine.machFiles}</p>
      <p>mogelijk materialen: {machine.machMat}</p>
      <p>beschikbaar: {beschikbaar ? "JA" : "NEE"} </p>
    </>
  );
};
