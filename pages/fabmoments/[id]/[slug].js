import Layout from "../../../components/Layout";
import axios from "axios";
import FabDetail from "../../../components/fabmoments/FabDetail";

export default ({ fabmoment }) => {
  return (
    <>
      <Layout title={fabmoment.fabTitel} description={""}>
        <FabDetail fabmoment={fabmoment}></FabDetail>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}fabmoments?fabIsPosted=true`
  );
  const fabmoments = res.data["hydra:member"];

  // Get the paths we want to pre-render based on machinecats
  const paths = fabmoments.map((fabmoment) => ({
    params: { id: fabmoment.id.toString(), slug: fabmoment.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}fabmoments/${params.id}`
  );
  const fabmoment = res.data;

  return {
    props: { fabmoment },
  };
}
