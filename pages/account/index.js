import Layout from "../../components/Layout";
import MyAccount from "../../components/acccount/MyAccount";
import { withoutAuth, logout } from "../../helpers/helpers";
import { parseCookies } from "nookies";
import { useSelector } from "react-redux";

export default (props) => {
  return (
    <>
      <Layout
        title="Mijn Account Genk"
        description="Een FabLab (Fabrication – of Fabulous – Laboratory) is een kleinschalige werkplaats met een aanbod van computergestuurde gereedschappen met het doel om 'bijna alles' te kunnen maken."
      >
        <MyAccount props={props} />
        <a>
          <span onClick={logout}>logout</span>
        </a>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  withoutAuth(ctx, `/account/login`);
  const cookies = parseCookies(ctx);

  const requestOne = axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}inschrijvings`,
    {
      headers: { Authorization: `Bearer ${cookies.jwtToken}` },
    }
  );
  const requestTwo = axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}machinerechts`,
    {
      headers: { Authorization: `Bearer ${cookies.jwtToken}` },
    }
  );
  const requestThree = axios.get(
    ///////////////////////////////////////////////??????USERIDIDIIDCNDOICNIDCNDICNDICNIDNCUSERID USER ID
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}users/${user.id}`,
    {
      headers: { Authorization: `Bearer ${cookies.jwtToken}` },
    }
  );

  const [inschrijvingen, machinerecht, userdata] = await axios.all([
    requestOne,
    requestTwo,
    requestThree,
  ]);

  return {
    props: {
      inschrijvingen: inschrijvingen.data["hydra:member"],
      machinerecht: machinerecht.data["hydra:member"],
      userdata: userdata.data,
    },
  };
};
