import Layout from "../../components/Layout";
import Machines from "../../components/machines/Machines";
import axios from "axios";

export default ({ data }) => {
  return (
    <>
      <Layout
        title="Machines"
        description="Lorem ipsum sit dollor amet, moster cols vadum. Hequer lostin vanam"
      >
        <Machines data={data}></Machines>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}machine_categories`
  );
  const data = res.data;

  return {
    props: { data },
  };
};
