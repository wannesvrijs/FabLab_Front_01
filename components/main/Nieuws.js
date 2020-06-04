export default ({ data }) => {
  return data["hydra:member"].length
    ? data["hydra:member"].map((item) => (
        <>
          <h3 className="reading_head">{item.nwsTitel}</h3>
          <p>{item.nwsOmschrijving}</p>
        </>
      ))
    : "";
};
