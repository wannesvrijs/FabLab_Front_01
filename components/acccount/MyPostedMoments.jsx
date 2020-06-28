import { imgPrefix, textAbstract } from "../../helpers/helpers";

export default ({ fabmoment }) => {
  return (
    <div className="fabmoment-card">
      <img
        src={
          fabmoment.fabImgs.length > 0
            ? imgPrefix(
                `fabmoments/images/${fabmoment.fabImgs[0].fabimgImgPad}`,
                300,
                300,
                "1.3:1"
              )
            : ""
        }
        alt={fabmoment.fabTitel}
      />
      <p>{fabmoment.fabTitel}</p>
      <p>{textAbstract(fabmoment.fabOmschrijving, 120)}</p>
    </div>
  );
};
