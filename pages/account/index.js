import Layout from "../../components/Layout";
import MyAccount from "../../components/acccount/MyAccount";
import { withoutAuth, logout } from "../../helpers/helpers";

export default (props) => {
  return (
    <>
      <Layout
        title="Mijn Account Genk"
        description="Een FabLab (Fabrication – of Fabulous – Laboratory) is een kleinschalige werkplaats met een aanbod van computergestuurde gereedschappen met het doel om 'bijna alles' te kunnen maken."
      >
        <MyAccount />
        <a>
          <span onClick={logout}>logout</span>
        </a>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  withoutAuth(ctx, `/account/login`);
  return { props: {} };
};
