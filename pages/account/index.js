import MyAccount from "../../components/acccount/MyAccount";
import { withoutAuth, logout } from "../../helpers/helpers";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Layout_skeleton from "../../components/Layout_skeleton";

export default (props) => {
  return (
    <>
      <Layout_skeleton title="Mijn profiel" style="dark">
        <header className="login-topper account-overview-topper">
          <h1>Mijn Profiel</h1>
          <p className="topper_content">
            <a>
              <span onClick={logout}>logout</span>
            </a>
          </p>
        </header>
        <main className="account-overview">
          <MyAccount props={props} />
        </main>
      </Layout_skeleton>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  withoutAuth(ctx, `/account/login`);
  const cookies = parseCookies(ctx);

  const useId = jwt_decode(cookies.jwtToken).id;

  const requestOne = axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}inschrijvings`,
    {
      headers: { Authorization: `Bearer ${cookies.jwtToken}` },
    }
  );
  const requestTwo = axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}machine_rechts`,
    {
      headers: { Authorization: `Bearer ${cookies.jwtToken}` },
    }
  );
  const requestThree = axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}users/${useId}`,
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
