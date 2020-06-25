import { useEffect, useState } from "react";
import Router from "next/router";

export default ({ totalItems }) => {
  const newPage = (page) => {
    let currentpath = Router.asPath;

    if (!currentpath.includes("?")) {
      Router.push(`${Router.asPath}?page=${page}`);
    }

    if (currentpath.includes("page=")) {
      const last = currentpath.lastIndexOf("=");
      currentpath = currentpath.substring(0, last);
      Router.push(`${currentpath}=${page}`);
    }

    Router.push(`${currentpath}&page=${page}`);
  };

  const totalPages = Math.ceil(totalItems / 8);
  let pagesnrs = [];
  for (let i = 0; i < totalPages; ++i) {
    pagesnrs.push(
      <a
        className="page-nr"
        key={i}
        onClick={(e) => {
          newPage(i + 1);
        }}
      >
        {i + 1}
      </a>
    );
  }

  return <div className="Stars">{pagesnrs}</div>;
};
