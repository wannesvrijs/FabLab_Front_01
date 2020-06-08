import Layout from "../../components/Layout";
import axios from "axios";
import Huisregels from "../../components/info/Huisregels";

export default ({ data }) => {
  return (
    <>
      <Layout
        title="Huisregels"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, magni? Quia, illum id? Quos quis perspiciatis molestias at commodi nisi, eligendi vero omnis velit dolorem officia! Architecto laborum error ad."
      >
        <Huisregels data={data}></Huisregels>
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}regels`);
  const data = res.data;

  return {
    props: { data },
  };
};
