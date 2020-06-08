import Layout from "../../components/Layout";
import axios from "axios";
import FablabInfo from "../../components/info/FablabInfo";

export default ({ data }) => {
  return (
    <>
      <Layout
        title="Wat is Fablab?"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, magni? Quia, illum id? Quos quis perspiciatis molestias at commodi nisi, eligendi vero omnis velit dolorem officia! Architecto laborum error ad."
      >
        <FablabInfo data={data}></FablabInfo>
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}fablab_infos`
  );
  const data = res.data;

  return {
    props: { data },
  };
};
