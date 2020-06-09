import Layout from "../../components/Layout";
import Fabmoments from "../../components/fabmoments/Fabmoments";
import FabmomentsForm from "../../components/fabmoments/FabmomentsForm";
import axios from "axios";

export default ({ data }) => {
  return (
    <>
      <Layout
        title="Fabmoments"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, magni? Quia, illum id? Quos quis perspiciatis molestias at commodi nisi, eligendi vero omnis velit dolorem officia! Architecto laborum error ad."
      >
        <Fabmoments data={data}></Fabmoments>
        <FabmomentsForm></FabmomentsForm>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const omschrijving =
    ctx.query.searchstring === "undefined"
      ? ""
      : `fabOmschrijving=${ctx.query.searchstring}&`;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}fabmoments?${omschrijving}`
  );
  const data = res.data;

  return {
    props: { data },
  };
};
