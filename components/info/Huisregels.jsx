export default ({ data }) => {
  return data["hydra:member"].map((item) => (
    <>
      <h3>{item.regNaam}</h3>
      {item.regOmschrijving && <p>{item.regOmschrijving}</p>}
    </>
  ));
};
