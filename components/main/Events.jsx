import Link from "next/link";

export default ({ data, isAuth }) => {
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
                  isAuth ? (
                    <button onClick={handleButtonClick}>Schrijf me in!</button>
                  ) : (
                    <p className="tiny">
                      <Link href="/account/login">
                        <a>log in </a>
                      </Link>
                      om je in te schrijven
                    </p>
                  )
                ) : (
                  <>
                    <p className="tiny">{event.eveTitel} is reeds volzet</p>
                    {isAuth ? (
                      <button onClick={handleButtonClick}>
                        Zet me op de wachtlijst
                      </button>
                    ) : (
                      <p className="tiny">
                        <Link href="/account/login">
                          <a>log in </a>
                        </Link>
                        om je op de wachtlijst te zetten
                      </p>
                    )}
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
