import LoginForm from "../../components/security/LoginForm";
import Link from "next/link";
import { withAuth, isAuth } from "../../helpers/helpers";
import Layout_skeleton from "../../components/Layout_skeleton";

export default () => {
  return (
    <>
      <Layout_skeleton
        title="Login"
        description="Meld aan of registreer nu"
        style="dark"
      >
        <div className="split_content">
          <header className="login-topper">
            <h1>Aanmelden</h1>
            <p className="topper_content">
              Meld aan of{" "}
              <Link href="/account/registreer">
                <a className="login_registreer">registreer nu</a>
              </Link>
            </p>
          </header>
          <main>
            <LoginForm></LoginForm>
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
