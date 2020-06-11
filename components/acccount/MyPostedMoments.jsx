import { useSelector } from "react-redux";

export default () => {
  const { myFabmoments } = useSelector((state) => state);

  return (
    <>
      {myFabmoments.data.length > 0 ? (
        myFabmoments.data.map((fabmoment) => <p>{fabmoment.fabTitel}</p>)
      ) : (
        <p>(nog) niets te zien</p>
      )}
    </>
  );
};
