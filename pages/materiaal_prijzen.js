import Layout from "../components/Layout";
import Store from "../components/materiaal_prijzen/StoreTable";
import axios from "axios";

export default ({ data }) => {
  return (
    <>
      <Layout
        title="Materiaal & prijzen"
        description="In onze kleine winkel hebben we ter plaatsen volgende materialen ter beschikking"
      >
        <Store data={data}></Store>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}shop_categories`
  );
  const data = res.data;

  return {
    props: { data },
  };
};
