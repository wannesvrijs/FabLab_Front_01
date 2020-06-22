export default ({ item }) => {
  return (
    <div className="nws_Content">
      <h2>{item.nwsTitel}</h2>
      <p>{item.nwsOmschrijving}</p>
    </div>
  );
};
