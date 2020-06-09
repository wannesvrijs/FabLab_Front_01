import Link from "next/link";

export default ({ data }) => {
  return data["hydra:member"].map((cat) => (
    <>
      <img src={cat.mcatImgPad} alt={cat.mcatImgAlt} />
      <h2>{cat.mcatNaam}</h2>
      <p>{cat.mcatOmschrijving}</p>
      {cat.machines.map((machine) => (
        <p>{machine.machNaam}</p>
      ))}
      <Link href={`machines/${cat.id}/${cat.slug}`}>
        <a>
          <span>lees meer...</span>
        </a>
      </Link>
    </>
  ));
};
