import Link from "next/link";

export default ({ machinecat }) => {
  return (
    <>
      <img src={machinecat.mcatImgPad} alt={machinecat.mcatNaam} />
      <h2>{machinecat.mcatNaam}</h2>
      <p>{machinecat.mcatOmschrijving}</p>
      {machinecat.machines.map((machine) => (
        <p>{machine.machNaam}</p>
      ))}
      <Link href={`machines/${machinecat.id}/${machinecat.slug}`}>
        <a>
          <span>lees meer...</span>
        </a>
      </Link>
    </>
  );
};
