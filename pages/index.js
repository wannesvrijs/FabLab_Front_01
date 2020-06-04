import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";
import Nieuws from "../components/main/Nieuws";
import Events from "../components/main/Events";

export default ({ nieuws, events }) => {
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
        <Nieuws data={nieuws}></Nieuws>
        <Events data={events}></Events>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const requestOne = axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}nieuws`);
  const requestTwo = axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}events`);

  const [nieuws, events] = await axios.all([requestOne, requestTwo]);

  return {
    props: {
      nieuws: nieuws.data,
      events: events.data,
    },
  };
};
