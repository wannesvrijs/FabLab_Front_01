import Registerform from "../../components/security/Registerform";
import Link from "next/link";
import { withAuth } from "../../helpers/helpers";
import Layout_skeleton from "../../components/Layout_skeleton";

export default (props) => {
  return (
    <>
      <Layout_skeleton
        title="Registreer"
        description="Registreer of meld je aan"
        style="dark"
      >
        <div className="split_content">
          <header className="login-topper">
            <h1>Registreren</h1>
            <p className="topper_content">
              Registreer of{" "}
              <Link href="/account/login">
                <a className="login_registreer">meld je aan</a>
              </Link>
            </p>
          </header>
          <main>
            <Registerform></Registerform>
          </main>
        </div>
      </Layout_skeleton>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  withAuth(ctx, `/account`);
  return { props: {} };
};
