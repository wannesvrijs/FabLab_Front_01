import { useState } from "react";
import { IoMdArrowDown, IoMdArrowForward } from "react-icons/io";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

export default ({ faqcat }) => {
  const [expanded, setExpanded] = useState(false);

  const rotateArrow = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Accordion allowZeroExpanded={true} onChange={rotateArrow}>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <h3>{faqcat.faqcatNaam}</h3>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <ul className="list-unstyled">
              {faqcat.faqs.map((faq) => (
                <li key={faq["@id"]}>
                  <h2>{faq.faqVraag}</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: faq.faqAntwoord }}
                  ></div>
                </li>
              ))}
            </ul>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
