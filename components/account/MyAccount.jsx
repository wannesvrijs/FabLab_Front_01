import MyEvents from "./MyEvents";
import MyFabmoments from "./MyFabmoments";
import MyInfo from "./MyInfo";
import MyRechten from "./MyRechten";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFabmoments } from "../../store/myFabmoments";
import { getFabCreators } from "../../store/myFabCreators";
import { logout } from "../../helpers/helpers";

export default ({ props: { inschrijvingen, machinerecht, userdata } }) => {
  const [fab, setFab] = useState(false);
  const [eve, setEve] = useState(false);
  const [recht, setRecht] = useState(false);
  const [info, setInfo] = useState(false);

  const dispatch = useDispatch();
  const { myFabmoments, user, myFabCreators } = useSelector((state) => state);

  const handleShowFabmoments = () => {
    fab ? setFab(false) : setFab(true);
    if (
      myFabmoments.data.length === 0 ||
      myFabCreators.materials.length === 0 ||
      myFabCreators.technieken.length === 0
    ) {
      dispatch(getFabmoments(user.id));
      dispatch(getFabCreators());
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
      <h2 onClick={handleShowFabmoments}>Fabmoments</h2>
      {fab && <MyFabmoments />}

      <h2 onClick={handleShowEvents}>Agenda</h2>
      <section className="event account-event">
        {eve && (
          <div className="account-event-box">
            {inschrijvingen.map((inschrijving, i) => (
              <MyEvents inschrijving={inschrijving} key={i} />
            ))}
          </div>
        )}
      </section>

      <h2 onClick={handleShowRechten}>Machinerecht</h2>
      <section className="event account-event account-recht">
        {recht && (
          <div className="account-event-box">
            {machinerecht.map((mrecht, i) => (
              <MyRechten mrecht={mrecht} key={i} />
            ))}
          </div>
        )}
      </section>

      {/* <h2 onClick={handleShowInfo}>Mijn Details</h2>
      {info && <MyInfo userdata={userdata} />} */}

      <a className="logggggg">
        <span onClick={logout}>Afmelden</span>
      </a>
    </>
  );
};
