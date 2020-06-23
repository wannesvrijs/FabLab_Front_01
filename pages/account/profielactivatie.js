import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";

export default ({ data, error }) => {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (error) {
      if (error.code == 404) {
        setRegister(true);
      }
      if (error.code == 403 || data) {
        setLogin(true);
      }
    }
    if (data) {
      setLogin(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>registratiebevestiging</title>
      </Head>
      <div className={`main-container dark`}>
        <div className="split_content">
          <header className="login-topper">
            <h1>registratiebevestiging</h1>
            <p className="topper_content">{data ? data : error.msg}</p>
            {register && (
              <Link href="/account/registreer">
                <a className="login_registreer">registreer nu</a>
              </Link>
            )}
            {login && (
              <Link href="/account/login">
                <a className="login_registreer">aanmelden</a>
              </Link>
            )}
          </header>
          <main></main>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const email = ctx.query.e;
  const regkey = ctx.query.r;

  const activatieDetails = {
    email,
    regkey,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}activatie`,
      activatieDetails
    );
    const data = res.data;
    const error = null;
    return {
      props: { data, error },
    };
  } catch (err) {
    const error = { msg: err.response.data, code: err.response.status };
    const data = null;
    return {
      props: { data, error },
    };
  }
};
