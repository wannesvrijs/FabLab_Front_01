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

export const getServerSideProps = async (ctx) => {
  console.log(ctx.query);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}machine_categories/${ctx.query.id}`
  );
  const data = res.data;

  return {
    props: { data },
  };
};
