import Layout from "../../components/Layout";
import Registerform from "../../components/security/Registerform";
import Link from "next/link";
import Router from "next/router";
import { parseCookies } from "nookies";

export default () => {
  const cookies = parseCookies();

  if (typeof cookies.jwtToken !== "undefined") {
    Router.push("/account");
  }

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
