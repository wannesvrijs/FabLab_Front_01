import Fabmoments from "../../components/fabmoments/Fabmoments";
import FabmomentsForm from "../../components/fabmoments/FabmomentsForm";
import axios from "axios";
import Layout_skeleton from "../../components/Layout_skeleton";
import Paginator from "../../components/Paginator";

export default ({ data, materiaal, techniek }) => {
  return (
    <>
      <Layout_skeleton
        title="Fabmoments"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non
              omnis beatae labore iste cum fugiat, nobis doloremque ab aut
              quaerat."
      >
        <header className="fabmoments-topper">
          <div className="fabmoments_titel">
            <h1>Fabmoments</h1>
            <p className="topper_content">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non
              omnis beatae labore iste cum fugiat, nobis doloremque ab aut
              quaerat.
            </p>
            <Paginator
              totalItems={data["hydra:totalItems"]}
              classing="paginate-lg"
            ></Paginator>
          </div>
          <FabmomentsForm
            materiaal={materiaal}
            techniek={techniek}
          ></FabmomentsForm>
          <Paginator
            totalItems={data["hydra:totalItems"]}
            classing="paginate-sm"
          ></Paginator>
        </header>
        <main className="fabmoment-overview">
          {data["hydra:member"].map((fabmoment) => (
            <Fabmoments fabmoment={fabmoment}></Fabmoments>
          ))}
          <Paginator
            totalItems={data["hydra:totalItems"]}
            classing="paginate-bottom"
          ></Paginator>
        </main>
      </Layout_skeleton>
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
  if (ctx.query.page) {
    queryParams.push(`page=${ctx.query.page}`);
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
