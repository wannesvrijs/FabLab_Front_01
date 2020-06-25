import Link from "next/link";

export default ({ fabmoment }) => {
  return (
    <div className="fabmoment-card">
      {" "}
      <Link href={`fabmoments/${fabmoment.id}/${fabmoment.slug}`}>
        <img src="/randompic.jpg" alt={fabmoment.fabTitel} />
      </Link>
      <Link href={`fabmoments/${fabmoment.id}/${fabmoment.slug}`}>
        <p className="fabmoment-titel">{fabmoment.fabTitel}</p>
      </Link>
      <p>{fabmoment.fabOmschrijving}</p>
    </div>
  );
};
