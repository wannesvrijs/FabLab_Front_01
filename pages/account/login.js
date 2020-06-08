import LoginForm from "../../components/security/LoginForm";
import Layout from "../../components/Layout";
import Link from "next/link";
import Router from "next/router";
import { parseCookies } from "nookies";

export default ({ stars }) => {
  const cookies = parseCookies();

  if (typeof cookies.jwtToken !== "undefined") {
    Router.push("/account");
  }

  return (
    <>
      <Layout
        title="Login"
        description="Log je hier in om nieuwe fabmoments te creeren, inschrijvingen te raadplegen..."
      >
        <LoginForm></LoginForm>
        <Link href="/account/registreer">
          <a className="login_registreer">
            <span>{stars} registreer nu</span>
          </a>
        </Link>
      </Layout>
    </>
  );
};
