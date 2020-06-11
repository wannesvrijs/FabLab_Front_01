import Dropzone from "../dropzone/Dropzone";
import MyFabForm from "./MyFabForm";
import MyPostedMoments from "./MyPostedMoments.jsx";
import { useDispatch } from "react-redux";
import { createFabmoments } from "../../store/myFabmoments";

export default () => {
  const dispatch = useDispatch();

  const onCreation = () => {
    dispatch(
      createFabmoments({
        fabTitel: inputs.fabTitel,
        fabOmschrijving: inputs.fabOmschrijving,
        fabDatum: inputs.fabDatum,
        fabMats: materialen.map((materiaal) => ({ fabmatMat: materiaal })),
        fabmaches: machines.map((machine) => ({ fabmachMach: machine })),
      })
    );
  };

  return (
    <>
      <MyPostedMoments />
      <Dropzone />
      <MyFabForm onCreation={onCreation} />
    </>
  );
};
