import Dropzone from "../dropzone/Dropzone";
import MyFabForm from "./MyFabForm";
import MyPostedMoments from "./MyPostedMoments.jsx";

export default () => {
  return (
    <>
      <MyPostedMoments />
      <Dropzone />
      <MyFabForm />
    </>
  );
};
