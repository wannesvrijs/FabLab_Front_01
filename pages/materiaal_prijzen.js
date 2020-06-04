import Layout from "../components/Layout";
import Store from "../components/materiaal_prijzen/StoreTable";

export default () => {
  return (
    <>
      <Layout
        title="Materiaal & prijzen"
        description="In onze kleine winkel hebben we ter plaatsen volgende materialen ter beschikking"
      >
        <Store></Store>
      </Layout>
    </>
  );
};
