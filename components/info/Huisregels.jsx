export default ({ data }) => {
  return data["hydra:member"].map((item) => (
    <>
      <h3>{item.regNaam}</h3>
      <div dangerouslySetInnerHTML={{ __html: item.regOmschrijving }}></div>
    </>
  ));
};
