export default ({ data }) => {
  const handleButtonClick = () => {
    console.log("ingeschreven!");
  };

  return data["hydra:member"].length ? (
    <table>
      {data["hydra:member"].map((event) => (
        <>
          <tr>
            <td>{event.eveStart}</td>
            <td>{event.eveTitel}</td>
          </tr>
          <tr>
            <td>
              <img src={event.eveImgPad} alt={event.eveImgAlt} />
            </td>
            <td>
              <p>{event.eveOmschrijving}</p>
              <p>Aanvang: {event.eveStart}</p>
              <p>Einde: {event.eveStop || "–"}</p>
              {event.evePrijs && <p>Prijs: {event.evePrijs}</p>}
              {event.eveMaxPers && (
                <p>Max. aantal deelnemers: {event.eveMaxPers}</p>
              )}
              {event.eveMetInschrijvingen &&
                (event.inschrijvings.length < event.eveMaxPers ? (
                  <button onClick={handleButtonClick}>Schrijf me in!</button>
                ) : (
                  <>
                    <p className="tiny">{event.eveTitel} is reeds volzet</p>
                    <button onClick={handleButtonClick}>
                      Zet me op de wachtlijst
                    </button>
                  </>
                ))}
            </td>
          </tr>
        </>
      ))}
    </table>
  ) : (
    ""
  );
};
