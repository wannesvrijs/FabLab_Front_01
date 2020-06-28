import { useState } from "react";

export default ({ mrecht }) => {
  const formatDateTitel = (datum) => {
    const d = new Date(datum);
    const date = d.toLocaleDateString("en-GB");
    return date.split("/").slice(0, 3).join("–");
  };

  return (
    <>
      <div className="event-head">
        <p>{formatDateTitel(mrecht.createdAt)}</p>
        <div className="event-right">
          <p>{mrecht.mrechMach.machNaam}</p>
        </div>
      </div>
    </>
  );
};
