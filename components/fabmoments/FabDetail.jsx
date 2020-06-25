import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/Md";

export default ({ fabmoment }) => {
  const [arrayPosition, setArrayPosition] = useState(0);

  // const imgArray = [
  //   <img src="/randompic.jpg" alt="0" />,
  //   <img src="/generic.png" alt="1" />,
  // ];

  const imgArray = fabmoment.fabImgs.map((img) => (
    <img
      key={img.id}
      src={img.fabimgImgPad}
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
    return date.split("/").join("–");
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
          <h2>{fabmoment.fabTitel}</h2>
          <p>{fabmoment.fabOmschrijving}</p>
          <p>{formatDate(fabmoment.fabDatum)}</p>
          <p>materialen</p>
          <p>
            {fabmoment.fabMats.map((mat) => mat.fabmatMat.matNaam).join(", ")}
          </p>
          <p>Machines</p>
          {fabmoment.fabMaches.map((mach) => (
            <p>
              {mach.fabmachMach.machNaam}{" "}
              <span className="tiny">{`(${mach.fabmachMach.machMcat.mcatNaam})`}</span>
            </p>
          ))}
        </div>
      </div>
    </>
  );
};
