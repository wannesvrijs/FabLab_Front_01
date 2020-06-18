import Link from "next/link";

export default ({ fabmoment }) => {
  return (
    <>
      {" "}
      <p>{fabmoment.fabTitel}</p>
      <Link href={`fabmoments/${fabmoment.id}/${fabmoment.slug}`}>
        <a>
          <span>lees meer...</span>
        </a>
      </Link>
    </>
  );
};
