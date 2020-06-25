import Layout_skeleton from "../components/Layout_skeleton";
import StoreTableSection from "../components/materiaal_prijzen/StoreTableSection";
import axios from "axios";

export default ({ data }) => {
  return (
    <>
      <Layout_skeleton
        title="Materiaal & prijzen"
        description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non
              omnis beatae labore iste cum fugiat, nobis doloremque ab aut
              quaerat."
      >
        <div className="split_content">
          <header className="shop-topper">
            <h1>Materiaal & Prijzen</h1>
            <p className="topper_content">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non
              omnis beatae labore iste cum fugiat, nobis doloremque ab aut
              quaerat.
            </p>
          </header>
          <main>
            <section className="store-table">
              <div className="store-table-header">
                <h2>Prijslijst</h2>
                <p className="error">
                  <span className="stock_indicator out_of_stock"></span> = niet
                  beschikbaar
                </p>
              </div>
              {data["hydra:member"].map((categorie) => (
                <StoreTableSection categorie={categorie}></StoreTableSection>
              ))}
            </section>
          </main>
        </div>
      </Layout_skeleton>
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
