import Layout from "../components/Layout";
import Registerform from "../components/security/Registerform";

export default () => {
  return (
    <>
      <Layout
        title="Registreer"
        description="Registreer je om nieuwe fabmoments te creeren, inschrijvingen te maken..."
      >
        <Registerform></Registerform>
      </Layout>
    </>
  );
};
