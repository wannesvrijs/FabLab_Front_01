import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { textAbstract } from "../../helpers/helpers";
import { imgPrefix } from "../../helpers/helpers";

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
    <div className="mcat-container">
      <Link href={`machines/${machineCatData.id}/${machineCatData.slug}`}>
        <a>
          <img
            src={
              machineCatData.mcatImgPad
                ? imgPrefix(
                    `machine/images/${machineCatData.mcatImgPad}`,
                    800,
                    800,
                    "16.1:10"
                  )
                : ""
            }
          />
        </a>
      </Link>
      <div className="mcat-content">
        <h2 className="mcat-titel">{machineCatData.mcatNaam}</h2>
        <p className="mcat-omschrijving">
          {textAbstract(machineCatData.mcatOmschrijving, 140)}
        </p>
        {machineCatData.machines.map((machine) => (
          <div className="machine-item">
            <div
              className={`stock_indicator ${
                machine.machBeschikbaar ? "in_stock" : "out_of_stock"
              }`}
            ></div>
            <p>
              {machine.machNaam}{" "}
              {machine.machBeschikbaar ? (
                ""
              ) : (
                <span className="error">(niet beschikbaar)</span>
              )}
            </p>
          </div>
        ))}
        <Link href={`machines/${machineCatData.id}/${machineCatData.slug}`}>
          <button>
            <a>
              <span>lees meer...</span>
            </a>
          </button>
        </Link>
      </div>
    </div>
  );
};
