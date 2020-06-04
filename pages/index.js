import Layout from "../components/Layout";
import Link from "next/link";

export default () => {
  return (
    <>
      <Layout
        title="FabLab Genk"
        description="Een FabLab (Fabrication – of Fabulous – Laboratory) is een kleinschalige werkplaats met een aanbod van computergestuurde gereedschappen met het doel om 'bijna alles' te kunnen maken."
        titleclass="hoofd"
      >
        <Link href="/registreer">
          <a className="login_registreer">
            <span>registreer nu</span>
          </a>
        </Link>
      </Layout>
    </>
  );
};
