import { useCookies } from "react-cookie";
import Axios from "axios";

export default () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const authStr = "Bearer " + cookies.jwt;

  return (
    <>
      <h1>Account</h1>
    </>
  );
};
