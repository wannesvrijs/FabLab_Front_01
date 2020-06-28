import Link from "next/link";
import { imgPrefix, textAbstract } from "../../helpers/helpers";

export default ({ fabmoment }) => {
  return (
    <div className="fabmoment-card">
      {" "}
      <Link href={`fabmoments/${fabmoment.id}/${fabmoment.slug}`}>
        <img
          src={
            fabmoment.fabImgs.length > 0
              ? imgPrefix(
                  `fabmoments/images/${fabmoment.fabImgs[0].fabimgImgPad}`,
                  800,
                  800,
                  "16.1:10"
                )
              : ""
          }
          alt={fabmoment.fabTitel}
        />
      </Link>
      <Link href={`fabmoments/${fabmoment.id}/${fabmoment.slug}`}>
        <p className="fabmoment-titel">{fabmoment.fabTitel}</p>
      </Link>
      <p>{textAbstract(fabmoment.fabOmschrijving, 120)}</p>
    </div>
  );
};
