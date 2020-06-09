export default ({ data }) => {
  return data["hydra:member"].map((fabmoment) => (
    <p>{fabmoment.fabOmschrijving}</p>
  ));
};
