export default ({ data }) => {
  return (
    <>
      {data.machines.map((machine) => (
        <>
          <img src={machine.machImgPad} alt={machine.machNaam} />
          <h2>{machine.machNaam}</h2>
          <p>{machine.machOmschrijving}</p>
          <p>afmetingen: {machine.machAfmeting}</p>
          <p>mogelijk bestandstypes: {machine.machFiles}</p>
          <p>mogelijk materialen: {machine.machMat}</p>
        </>
      ))}
    </>
  );
};
