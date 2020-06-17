import MyFabForm from "./MyFabForm";
import MyPostedMoments from "./MyPostedMoments.jsx";
import { useSelector } from "react-redux";

export default () => {
  const { myFabmoments } = useSelector((state) => state);

  return (
    <>
      <MyFabForm />

      {myFabmoments.data.length > 0 ? (
        myFabmoments.data.map((fabmoment) => (
          <MyPostedMoments fabmoment={fabmoment} />
        ))
      ) : (
        <p>(nog) geen aangemaakte fabmoments</p>
      )}
    </>
  );
};
