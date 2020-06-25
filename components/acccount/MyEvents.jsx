import { parseCookies } from "nookies";
import { useState } from "react";
import axios from "axios";
import { IoMdArrowDown, IoMdArrowForward } from "react-icons/io";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Popover from "react-tiny-popover";

export default ({ inschrijving }) => {
  const [expanded, setExpanded] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const cookies = parseCookies();

  const rotateArrow = () => {
    console.log(inschrijving);
    setExpanded(!expanded);
  };

  const handleButtonClick = async (insId) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}inschrijvings/${insId}`,
        {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        }
      );
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
      setIsDeleted(false);
    }
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
      {!isDeleted && (
        <Accordion allowZeroExpanded={true} onChange={rotateArrow}>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="event-head">
                  <p>{formatDateTitel(inschrijving.insEve.eveStart)}</p>
                  <div className="event-right">
                    <p>{inschrijving.insEve.eveTitel}</p>
                    {expanded ? <IoMdArrowDown /> : <IoMdArrowForward />}
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="event-body">
                <img src="/randompic.jpg" alt={inschrijving.insEve.eveTitel} />
                <div className="event-text">
                  <p className="event-omschrijving">
                    {inschrijving.insEve.eveOmschrijving}
                  </p>
                  <p>Aanvang: {formatDateTime(inschrijving.insEve.eveStart)}</p>
                  <p>
                    Einde: {formatDateTime(inschrijving.insEve.eveStop) || "–"}
                  </p>
                  {event.evePrijs && (
                    <p>Prijs: €{inschrijving.insEve.evePrijs}.00</p>
                  )}
                  <div className="event-inschrijven">
                    {isPopoverOpen && <div className="popover-backdrop"></div>}
                    <Popover
                      isOpen={isPopoverOpen}
                      disableReposition // prevents automatic readjustment of content position that keeps your popover content within your window's bounds
                      onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
                      content={
                        <div>
                          Ben je zeker dat je je wil uitschrijven voor{" "}
                          {inschrijving.insEve.eveTitel}?
                          <button
                            onClick={() => handleButtonClick(inschrijving.id)}
                          >
                            Ja, schrijf me uit.
                          </button>
                        </div>
                      }
                    >
                      <button onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                        {" "}
                        Schrijf me uit
                      </button>
                    </Popover>
                  </div>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};
