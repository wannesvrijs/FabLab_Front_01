import MyFabForm from "./MyFabForm";
import MyPostedMoments from "./MyPostedMoments.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default () => {
  const { myFabmoments } = useSelector((state) => state);
  const [createNew, setCreateNew] = useState(false);

  return (
    <>
      {createNew && <MyFabForm setCreateNew={setCreateNew} />}
      {!createNew && (
        <div className="my-fabmoments-carousel">
          <div
            className="upload-box-container"
            onClick={() => setCreateNew(true)}
          >
            <div className="upload-box">
              <AiOutlinePlus />
              <span>nieuw fabmoment</span>
            </div>
          </div>
          {myFabmoments.data.length > 0 ? (
            myFabmoments.data.map((fabmoment) => (
              <MyPostedMoments fabmoment={fabmoment} key={fabmoment["@id"]} />
            ))
          ) : (
            <p>(nog) geen aangemaakte fabmoments</p>
          )}
        </div>
      )}
    </>
  );
};
