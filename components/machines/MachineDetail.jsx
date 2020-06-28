import { useEffect, useState } from "react";
import axios from "axios";
import { imgPrefix } from "../../helpers/helpers";

export default ({ machine }) => {
  const [beschikbaar, setBeschikbaar] = useState(false);

  // as soon as the component is mounted, we query for the machine status and overwrite with new data.
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}machines/${machine.id}`)
      .then((response) => setBeschikbaar(response.data.machBeschikbaar));
  }, []);

  return (
    <div className="mach-container">
      <div className="mach-visuals">
        <img
          src={
            machine.machImgPad
              ? imgPrefix(
                  `machine/images/${machine.machImgPad}`,
                  800,
                  800,
                  "16.1:10"
                )
              : ""
          }
          alt={machine.machNaam}
        />
        <div className="iframe-container">
          <iframe
            src={machine.machVideoPad}
            frameborder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div className="mach-content">
        <div className="mach-titel">
          <div
            className={`stock_indicator ${
              beschikbaar ? "in_stock" : "out_of_stock"
            }`}
          ></div>
          <h2>{machine.machNaam}</h2>
        </div>
        <p className="mach-omschrijving">{machine.machOmschrijving}</p>
        <p>
          <span>afmetingen</span>
          {machine.machAfmeting}
        </p>
        <p>
          <span>mogelijk bestandstypes</span> {machine.machFiles}
        </p>
        <p>
          <span>mogelijk materialen</span> {machine.machMat}
        </p>
      </div>
    </div>
  );
};
