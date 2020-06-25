import axios from "axios";
import MachineDetail from "../../../components/machines/MachineDetail";
import Layout_skeleton from "../../../components/Layout_skeleton";
import Link from "next/link";

export default ({ data }) => {
  return (
    <>
      <Layout_skeleton
        title={data.mcatNaam}
        description={data.mcatOmschrijving}
      >
        <header className="machine-detail-topper">
          <h1>{data.mcatNaam}</h1>
          <p className="topper_content">{data.mcatOmschrijving}</p>
          <Link href="/machines">
            <button>
              <a>ga terug</a>
            </button>
          </Link>
        </header>
        <main className="machine-detail-main">
          {data.machines.map((machine) => (
            <MachineDetail machine={machine}></MachineDetail>
          ))}
        </main>
      </Layout_skeleton>
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
