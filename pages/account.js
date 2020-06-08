import Layout from "../components/Layout";
import Router from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";

export default ({ nieuws, events }) => {
  const cookies = parseCookies();

  const logout = () => {
    if (typeof cookies.jwtToken !== "undefined") {
      destroyCookie(null, "jwtToken");
      Router.push("/");
    }
  };

  return (
    <>
      <Layout
        title="Mijn Account Genk"
        description="Een FabLab (Fabrication – of Fabulous – Laboratory) is een kleinschalige werkplaats met een aanbod van computergestuurde gereedschappen met het doel om 'bijna alles' te kunnen maken."
      ></Layout>

      <a>
        <span onClick={logout}>logout</span>
      </a>
    </>
  );
};
