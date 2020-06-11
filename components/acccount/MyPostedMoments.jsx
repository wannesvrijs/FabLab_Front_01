import { useSelector } from "react-redux";

export default () => {
  const { myfabmoments } = useSelector((state) => state);

  return (
    <>
      {myfabmoments.data.length > 0 ? (
        myfabmoments.data.map((fabmoment) => <p>{fabmoment.fabTitel}</p>)
      ) : (
        <p>(nog) niets te zien</p>
      )}
    </>
  );
};
