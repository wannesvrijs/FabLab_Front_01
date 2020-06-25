import Link from "next/link";
import Head from "next/head";

export default ({ email }) => {
  return (
    <>
      <Head>
        <title>registratie_succes</title>
      </Head>
      <div className={`main-container dark`}>
        <div className="split_content">
          <header className="login-topper">
            <h1>Registreren</h1>
            <p className="topper_content">
              Uw registratie werd ontvangen. Activeer uw profiel via de link die
              werd verstuurd naar: {email}
            </p>
          </header>
          <main></main>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const email = ctx.query.e;

  return {
    props: { email },
  };
};
