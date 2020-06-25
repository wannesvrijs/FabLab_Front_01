import Layout from "../../components/Layout";
import Machines from "../../components/machines/Machines";
import axios from "axios";

export default ({ machinecats }) => {
  return (
    <>
      <Layout
        title="Machines"
        description="Lorem ipsum sit dollor amet, moster cols vadum. Hequer lostin vanam"
        mainClass="machine-main"
      >
        {machinecats["hydra:member"].map((machinecat) => (
          <Machines machinecat={machinecat}></Machines>
        ))}
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}machine_categories`
  );
  const machinecats = res.data;

  return {
    props: { machinecats },
  };
};
