import Link from "next/link";
import { parseCookies } from "nookies";
import { useState } from "react";
import classNames from "classnames";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default ({ event }) => {
  const [bodyIsActive, setBodyIsActive] = useState(false);
  const [isIngeschreven, setIsIngeschreven] = useState(false);
  const cookies = parseCookies();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    setIsIngeschreven(
      event.inschrijvings.some(
        (inschrijving) => inschrijving.insUse === `/api/users/${user.id}`
      )
    );
  }, []);

  const isAuth = () => {
    return typeof cookies.jwtToken === "undefined" ? false : true;
  };

  const handleButtonClick = async (insEve) => {
    setIsIngeschreven(!isIngeschreven);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}inschrijvings`,
      { insEve },
      {
        headers: { Authorization: `Bearer ${cookies.jwtToken}` },
      }
    );
    const data = res.data;
  };

  const toggleNews = () => {
    setBodyIsActive(bodyIsActive ? false : true);
  };

  const formatDateTitel = (datum) => {
    const d = new Date(datum);
    const date = d.toLocaleDateString("en-GB");
    return date.split("/").slice(0, 2).join(" – ");
  };

  const formatDateTime = (datum) => {
    const d = new Date(datum);
    const weekdagen = [
      "zondag",
      "maandag",
      "dinsdag",
      "woensdag",
      "donderdag",
      "vrijdag",
      "zaterdag",
    ];
    const maanden = [
      "januari",
      "februari",
      "maart",
      "april",
      "mei",
      "juni",
      "juli",
      "augustus",
      "september",
      "oktober",
      "november",
      "december",
    ];
    const dagdatum = d.getDate();
    const weekdag = weekdagen[d.getDay()];
    const maand = maanden[d.getMonth()];
    const jaar = d.getFullYear();

    const uur = d
      .toLocaleString("en-GB")
      .split(", ")[1]
      .split(":")
      .slice(0, 2)
      .join(".");
    return `${weekdag} ${dagdatum} ${maand} ${jaar}, ${uur} uur`;
  };

  return (
    <>
      <div className="event-head">
        <p>{formatDateTitel(event.eveStart)}</p>
        <div className="event-right">
          <p>{event.eveTitel}</p>
          <a className="arrow" onClick={toggleNews}>
            VVV
          </a>
        </div>
      </div>
      <div
        className={classNames("event-body", {
          "event-active": bodyIsActive,
        })}
      >
        <img src={event.eveImgPad} alt={event.eveTitel} />
        <div className="event-text">
          <p className="event-omschrijving">{event.eveOmschrijving}</p>
          <p>Aanvang: {formatDateTime(event.eveStart)}</p>
          <p>Einde: {formatDateTime(event.eveStop) || "–"}</p>
          {event.evePrijs && <p>Prijs: €{event.evePrijs}.00</p>}
          {event.eveMaxPers && (
            <p>Max. aantal deelnemers: {event.eveMaxPers}</p>
          )}
          <div className="event-inschrijven">
            {event.eveMetInschrijvingen &&
              (event.inschrijvings.length < event.eveMaxPers ? (
                isAuth() ? (
                  isIngeschreven ? (
                    <p>
                      je bent reeds ingeschreven, wijzig inschrijvingen op je
                      account
                    </p>
                  ) : (
                    <button onClick={() => handleButtonClick(event["@id"])}>
                      Schrijf me in!
                    </button>
                  )
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
                  {isAuth() ? (
                    isIngeschreven ? (
                      <p>
                        je bent reeds ingeschreven, wijzig inschrijvingen op je
                        account
                      </p>
                    ) : (
                      <button onClick={() => handleButtonClick(event["@id"])}>
                        zet me op de wachtlijst
                      </button>
                    )
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
          </div>
        </div>
      </div>
    </>
  );
};
