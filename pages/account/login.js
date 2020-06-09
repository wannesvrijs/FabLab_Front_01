import LoginForm from "../../components/security/LoginForm";
import Layout from "../../components/Layout";
import Link from "next/link";
import { withAuth, isAuth } from "../../helpers/helpers";

export default () => {
  return (
    <>
      <Layout
        title="Login"
        description="Log je hier in om nieuwe fabmoments te creeren, inschrijvingen te raadplegen..."
      >
        <LoginForm></LoginForm>
        <Link href="/account/registreer">
          <a className="login_registreer">
            <span>registreer nu</span>
          </a>
        </Link>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  withAuth(ctx, `/account`);
  return { props: {} };
};
