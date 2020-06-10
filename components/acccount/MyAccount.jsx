import MyEvents from "./MyEvents";
import MyFabmoments from "./MyFabmoments";
import MyInfo from "./MyInfo";
import MyRechten from "./MyRechten";
import { useState } from "react";

export default () => {
  const [fab, setFab] = useState(false);
  const [eve, setEve] = useState(false);
  const [recht, setRecht] = useState(false);
  const [info, setInfo] = useState(false);

  const handleShowFabmoments = () => {
    fab ? setFab(false) : setFab(true);
  };
  const handleShowEvents = () => {
    eve ? setEve(false) : setEve(true);
  };
  const handleShowRechten = () => {
    recht ? setRecht(false) : setRecht(true);
  };
  const handleShowInfo = () => {
    info ? setInfo(false) : setInfo(true);
  };

  return (
    <>
      <h2>My fabmoments</h2>
      <button onClick={handleShowFabmoments}>SHOW</button>
      {fab && <MyFabmoments />}

      <h2>My Events</h2>
      <button onClick={handleShowEvents}>SHOW</button>
      {eve && <MyEvents />}

      <h2>My Rechten</h2>
      <button onClick={handleShowRechten}>SHOW</button>
      {recht && <MyRechten />}

      <h2>My Info</h2>
      <button onClick={handleShowInfo}>SHOW</button>
      {info && <MyInfo />}
    </>
  );
};
