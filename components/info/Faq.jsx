export default ({ data }) => {
  return data["hydra:member"].map((item) => {
    return (
      <>
        <h3>{item.faqcatNaam}</h3>
        <ul>
          {item.faqs.map((faq) => (
            <>
              <li>{faq.faqVraag}</li>
              <li>
                <div
                  dangerouslySetInnerHTML={{ __html: faq.faqAntwoord }}
                ></div>
              </li>
            </>
          ))}
        </ul>
      </>
    );
  });
};
