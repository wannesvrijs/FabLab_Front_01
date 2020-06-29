import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { imgPrefix } from "../../helpers/helpers";

export default ({ fabmoment }) => {
  const [arrayPosition, setArrayPosition] = useState(0);

  const imgArray = fabmoment.fabImgs.map((img) => (
    <img
      key={img.id}
      src={imgPrefix(`fabmoments/images/${img.fabimgImgPad}`, 800, 800)}
      alt={`${fabmoment.fabTitel}-${img.fabimgImgPad}`}
    />
  ));

  const changeImage = (step) => {
    if (arrayPosition + step == -1) {
      setArrayPosition(imgArray.length - 1);
      return;
    }
    if (arrayPosition + step == imgArray.length) {
      setArrayPosition(0);
      return;
    }
    setArrayPosition(arrayPosition + step);
  };

  const formatDate = (datum) => {
    const d = new Date(datum);
    const date = d.toLocaleDateString("en-GB");
    return date.split("/").splice(0, 2).join("-");
  };

  return (
    <>
      <div className="fabmoment-detail-container">
        <div className="fabmoment-carousel">
          {imgArray[arrayPosition]}
          <MdKeyboardArrowLeft
            className="carousel-prev"
            onClick={() => changeImage(-1)}
          />
          <MdKeyboardArrowRight
            className="carousel-next"
            onClick={() => changeImage(1)}
          />
        </div>
        <div className="fab-detail-content">
          <h2>
            {fabmoment.fabTitel} <span>{formatDate(fabmoment.fabDatum)}</span>
          </h2>
          <p className="fab-detail-omschrijving">{fabmoment.fabOmschrijving}</p>
          <p>
            <span>materialen</span>
            {fabmoment.fabMats.map((mat) => mat.fabmatMat.matNaam).join(", ")}
          </p>
          <p>
            <span>Technieken</span>
            {fabmoment.fabMaches
              .map((mach) => mach.fabmachMcat.mcatNaam)
              .join(", ")}
          </p>
        </div>
      </div>
    </>
  );
};
