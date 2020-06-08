export default ({ data }) => {
  return data["hydra:member"].map((item) => (
    <>
      <h3>{item.stageSubtitel}</h3>
      <p>{item.stageOmschrijving}</p>
    </>
  ));
};
