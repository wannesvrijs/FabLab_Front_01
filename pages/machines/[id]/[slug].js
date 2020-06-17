import Layout from "../../../components/Layout";
import axios from "axios";
import MachineDetail from "../../../components/machines/MachineDetail";

export default ({ data }) => {
  return (
    <>
      <Layout title={data.mcatNaam} description={data.mcatOmschrijving}>
        <MachineDetail data={data}></MachineDetail>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}machine_categories`
  );
  const machinecats = res.data["hydra:member"];

  // Get the paths we want to pre-render based on machinecats
  const paths = machinecats.map((machinecat) => ({
    params: { id: machinecat.id.toString(), slug: machinecat.slug },
  }));

  console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}machine_categories/${params.id}`
  );
  const data = res.data;

  return {
    props: { data },
  };
}
