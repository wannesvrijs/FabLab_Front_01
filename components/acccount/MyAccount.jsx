import MyEvents from "./MyEvents";
import MyFabmoments from "./MyFabmoments";
import MyInfo from "./MyInfo";
import MyRechten from "./MyRechten";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFabmoments } from "../../store/myfabmoments";

export default () => {
  const [fab, setFab] = useState(false);
  const [eve, setEve] = useState(false);
  const [recht, setRecht] = useState(false);
  const [info, setInfo] = useState(false);

  const dispatch = useDispatch();
  const { myfabmoments, user } = useSelector((state) => state);

  const handleShowFabmoments = () => {
    fab ? setFab(false) : setFab(true);
    if (myfabmoments.data.length === 0) {
      dispatch(getFabmoments(user.id));
    }
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
