import Contact from "../components/contact/Contact";
import Layout_skeleton from "../components/Layout_skeleton";

export default () => {
  return (
    <Layout_skeleton
      title="Contact"
      description="Neem contact op met ons via mail of telefoon of kom gewoon eens langs."
    >
      <div className="contact">
        <header className="contact-topper">
          <h1>Contact</h1>
          <div className="contactinfo">
            <p>
              <a href="tel:0032471467813">+32 471 467 813</a>
            </p>
            <p>
              <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#102;&#97;&#98;&#108;&#97;&#98;&#103;&#101;&#110;&#107;&#64;&#104;&#111;&#116;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;">
                &#102;&#97;&#98;&#108;&#97;&#98;&#103;&#101;&#110;&#107;&#64;&#104;&#111;&#116;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;
              </a>
            </p>
          </div>
        </header>
        <main>
          <Contact></Contact>
        </main>
      </div>
    </Layout_skeleton>
  );
};
