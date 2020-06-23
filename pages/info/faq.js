import Layout from "../../components/Layout";
import axios from "axios";
import Faq from "../../components/info/Faq";

export default ({ data }) => {
  return (
    <>
      <Layout
        title="Faq"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, magni? Quia, illum id? Quos quis perspiciatis molestias at commodi nisi, eligendi vero omnis velit dolorem officia! Architecto laborum error ad."
      >
        {data["hydra:member"].map((faqcat) => (
          <Faq key={faqcat["@id"]} faqcat={faqcat}></Faq>
        ))}
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}faq_categories`
  );
  const data = res.data;

  return {
    props: { data },
  };
};
