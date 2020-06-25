import { useEffect, useState } from "react";
import Router from "next/router";
import classNames from "classnames";

export default ({ totalItems, classing }) => {
  const newPage = (page) => {
    let currentpath = Router.asPath;

    if (!currentpath.includes("?")) {
      Router.push(`${Router.asPath}?page=${page}`);
      return;
    }

    if (currentpath.includes("page=")) {
      const last = currentpath.lastIndexOf("=");
      currentpath = currentpath.substring(0, last);
      Router.push(`${currentpath}=${page}`);
      return;
    }

    Router.push(`${currentpath}&page=${page}`);
  };

  const totalPages = Math.ceil(totalItems / 8);
  let pagesnrs = [];
  for (let i = 0; i < totalPages; ++i) {
    pagesnrs.push(
      <a
        className={classNames("page-nr", {
          page_active:
            Router.asPath.includes("page=") &&
            Router.asPath.split("page=")[1] == i + 1,
        })}
        key={i}
        onClick={(e) => {
          newPage(i + 1);
        }}
      >
        {i + 1}
      </a>
    );
  }

  return (
    <div className={`paginate ${classing}`}>
      <p className="pagination-label">Pagina</p>
      <div className="page-nrs">{pagesnrs}</div>
    </div>
  );
};
