export default ({ data }) => {
  return data["hydra:member"].map((item) => (
    <>
      <h3>{item.infoSubtitel}</h3>
      <div dangerouslySetInnerHTML={{ __html: item.infoOmschrijving }}></div>
    </>
  ));
};
