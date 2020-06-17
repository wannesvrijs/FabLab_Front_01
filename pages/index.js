import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";
import Nieuws from "../components/main/Nieuws";
import Event from "../components/main/Event";

export default ({ nieuws, events }) => {
  return (
    <>
      <Layout
        title="FabLab Genk"
        description="Een FabLab (Fabrication – of Fabulous – Laboratory) is een kleinschalige werkplaats met een aanbod van computergestuurde gereedschappen met het doel om 'bijna alles' te kunnen maken."
        titleclass="hoofd"
      >
        <Link href="/info/fablab">
          <a>
            <span>Lees meer</span>
          </a>
        </Link>
        {nieuws.length && nieuws.map((item) => <Nieuws item={item}></Nieuws>)}
        <div className="event">
          <h3>Events</h3>
          {events.length &&
            events.map((event) => <Event event={event}></Event>)}
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const requestOne = axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}nieuws`);
  const requestTwo = axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}events`);

  const [nieuws, events] = await axios.all([requestOne, requestTwo]);

  return {
    props: {
      nieuws: nieuws.data["hydra:member"],
      events: events.data["hydra:member"],
    },
  };
}
