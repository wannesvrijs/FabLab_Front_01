import Layout from "../../components/Layout";
import Registerform from "../../components/security/Registerform";
import Link from "next/link";
import { withAuth } from "../../helpers/helpers";

export default (props) => {
  return (
    <>
      <Layout
        title="Registreer"
        description="Registreer je om nieuwe fabmoments te creeren, inschrijvingen te maken..."
      >
        <Registerform></Registerform>
        <Link href="/account/registreer">
          <a className="login_registreer">
            <span>login</span>
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
