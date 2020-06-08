import Layout from "../../components/Layout";
import axios from "axios";
import Stages from "../../components/info/Stages";

export default ({ data }) => {
  return (
    <>
      <Layout
        title="Stages"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, magni? Quia, illum id? Quos quis perspiciatis molestias at commodi nisi, eligendi vero omnis velit dolorem officia! Architecto laborum error ad."
      >
        <Stages data={data}></Stages>
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}stages`);
  const data = res.data;

  return {
    props: { data },
  };
};
