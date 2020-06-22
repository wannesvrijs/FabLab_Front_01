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
        topperClass="main-topper"
      >
        <section className="nieuws">
          <h3>nieuws</h3>
          <p className="nws_allert">!</p>
          {nieuws.length && nieuws.map((item) => <Nieuws item={item}></Nieuws>)}
        </section>
        <div className="event-container">
          <h3>Events</h3>
          <section className="event">
            {events.length &&
              events.map((event) => <Event event={event}></Event>)}
          </section>
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
