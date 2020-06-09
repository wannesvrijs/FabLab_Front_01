import Layout from "../../components/Layout";
import Router from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import MyAccount from "../../components/acccount/MyAccount";
import { withoutAuth } from "../../helpers/helpers";

export default (props) => {
  const cookies = parseCookies;

  const logout = () => {
    destroyCookie(null, "jwtToken");
    Router.push("/");
  };

  return (
    <>
      <Layout
        title="Mijn Account Genk"
        description="Een FabLab (Fabrication – of Fabulous – Laboratory) is een kleinschalige werkplaats met een aanbod van computergestuurde gereedschappen met het doel om 'bijna alles' te kunnen maken."
      >
        <MyAccount />
      </Layout>

      <a>
        <span onClick={logout}>logout</span>
      </a>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  withoutAuth(ctx, `/account/login`);
  return { props: {} };
};
