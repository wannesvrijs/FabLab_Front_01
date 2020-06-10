import Layout from "../../components/Layout";
import Fabmoments from "../../components/fabmoments/Fabmoments";
import FabmomentsForm from "../../components/fabmoments/FabmomentsForm";
import axios from "axios";

export default ({ data, materiaal, techniek }) => {
  return (
    <>
      <Layout
        title="Fabmoments"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, magni? Quia, illum id? Quos quis perspiciatis molestias at commodi nisi, eligendi vero omnis velit dolorem officia! Architecto laborum error ad."
      >
        <Fabmoments data={data}></Fabmoments>
        <FabmomentsForm
          materiaal={materiaal}
          techniek={techniek}
        ></FabmomentsForm>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const queryParams = [];

  if (ctx.query.s) {
    queryParams.push(`fabOmschrijving=${ctx.query.s}`);
  }
  if (ctx.query.m) {
    if (typeof ctx.query.m === "object") {
      const matQueryParams = ctx.query.m
        .map((mat) => `fabMats.fabmatMat.matNaam=${mat}`)
        .join("&");
      queryParams.push(matQueryParams);
    } else {
      queryParams.push(`fabMats.fabmatMat.matNaam=${ctx.query.m}`);
    }
  }
  if (ctx.query.t) {
    if (typeof ctx.query.t === "object") {
      const techQueryParams = ctx.query.t
        .map((tech) => `fabMaches.fabmachMach.machMcat.mcatNaam=${tech}`)
        .join("&");
      queryParams.push(techQueryParams);
    } else {
      queryParams.push(
        `fabMaches.fabmachMach.machMcat.mcatNaam=${ctx.query.t}`
      );
    }
  }

  const joinedQueryParams = queryParams.join("&");

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}fabmoments?${joinedQueryParams}`
  );

  const requestOne = axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}machine_categories`
  );
  const requestTwo = axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}materiaals`
  );

  const [techres, matres] = await axios.all([requestOne, requestTwo]);

  const data = res.data;
  const techniek = techres.data;
  const materiaal = matres.data;

  return {
    props: { data, materiaal, techniek },
  };
};
