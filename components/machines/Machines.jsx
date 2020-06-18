import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default ({ machinecat }) => {
  // we make the static data populate the state
  const [machineCatData, setMachineCatData] = useState(machinecat);

  // as soon as the component is mounted, we query for the machine status and overwrite with new data. #zwarebevalling
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}machines?machMcat.id=${machineCatData.id}`
      )
      .then((response) =>
        setMachineCatData({
          ...machineCatData,
          machines: [
            ...machineCatData.machines.map((machine) => ({
              ...machine,
              machBeschikbaar: response.data["hydra:member"].find(
                (newmachine) => machine.id === newmachine.id
              ).machBeschikbaar,
            })),
          ],
        })
      );
  }, []);

  return (
    <>
      <img src={machineCatData.mcatImgPad} alt={machineCatData.mcatNaam} />
      <h2>{machineCatData.mcatNaam}</h2>
      <p>{machineCatData.mcatOmschrijving}</p>
      {machineCatData.machines.map((machine) => (
        <>
          <p>{machine.machNaam}</p>
          <p>{machine.machBeschikbaar ? "beschikbaar" : "DEFECT"}</p>
        </>
      ))}
      <Link href={`machines/${machineCatData.id}/${machineCatData.slug}`}>
        <a>
          <span>lees meer...</span>
        </a>
      </Link>
    </>
  );
};
