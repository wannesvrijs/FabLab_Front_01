import LoginForm from "../components/security/LoginForm.jsx";
import Layout from "../components/Layout";
import Link from "next/link";

export default () => {
  return (
    <>
      <Layout
        title="Login"
        description="Log je hier in om nieuwe fabmoments te creeren, inschrijvingen te raadplegen..."
      >
        <LoginForm></LoginForm>
        <Link href="/registreer">
          <a className="login_registreer">
            <span>registreer nu</span>
          </a>
        </Link>
      </Layout>
    </>
  );
};
