import { parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { persistor } from "../store";

export const withAuth = (ctx, url) => {
  const cookies = parseCookies(ctx);

  if (typeof cookies.jwtToken !== "undefined") {
    ctx.res.statusCode = 302;
    ctx.res.setHeader("Location", url);
  }
};

export const withoutAuth = (ctx, url) => {
  const cookies = parseCookies(ctx);

  if (typeof cookies.jwtToken === "undefined") {
    ctx.res.statusCode = 302;
    ctx.res.setHeader("Location", url);
  }
};

export const isAuth = (ctx) => {
  const cookies = parseCookies(ctx);
  return typeof cookies.jwtToken === "undefined" ? false : true;
};

export const logout = () => {
  // const cookies = parseCookies();
  destroyCookie(null, "jwtToken", { path: "/" });
  persistor.purge();
  Router.push("/");
};

export const textAbstract = (text, length) => {
  if (text == null) {
    return "";
  }
  if (text.length <= length) {
    return text;
  }
  text = text.substring(0, length);
  const last = text.lastIndexOf(" ");
  text = text.substring(0, last);
  return text + "...";
};

//----------------------------------------------- VALIDATION ---------------------------------

export const validateMail = (mail) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
};
