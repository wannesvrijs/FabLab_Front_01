import Link from "next/link";
import { parseCookies } from "nookies";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { IoMdArrowDown, IoMdArrowForward } from "react-icons/io";
import { imgPrefix } from "../../helpers/helpers";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

export default ({ event }) => {
  const [isIngeschreven, setIsIngeschreven] = useState(false);
  const [expanded, setExpanded] = useState(false);
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

  const rotateArrow = () => {
    setExpanded(!expanded);
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
    <Accordion allowZeroExpanded={true} onChange={rotateArrow}>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            <div className="event-head">
              <p>{formatDateTitel(event.eveStart)}</p>
              <div className="event-right">
                <p>{event.eveTitel}</p>
                {expanded ? <IoMdArrowDown /> : <IoMdArrowForward />}
              </div>
            </div>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="event-body">
            <img
              src={
                event.eveImgPad
                  ? imgPrefix(
                      `events/images/${event.eveImgPad}`,
                      800,
                      800,
                      "16.1:10"
                    )
                  : ""
              }
              alt={event.eveTitel}
            />
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
                        <p className="tiny">
                          je bent ingeschreven, wijzig inschrijvingen op de
                          accountpagina
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
                      {isAuth() ? (
                        isIngeschreven ? (
                          <p className="tiny">
                            je bent ingeschreven, wijzig inschrijvingen op de
                            accountpagina
                          </p>
                        ) : (
                          <button
                            onClick={() => handleButtonClick(event["@id"])}
                          >
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
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};
