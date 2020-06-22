import axios from "axios";

export default ({ data }) => {
  return <p>{data}</p>;
};

export const getServerSideProps = async (ctx) => {
  const email = ctx.query.e;
  const regkey = ctx.query.r;

  const activatieDetails = {
    email,
    regkey,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}activatie`,
      activatieDetails
    );
    const data = res.data;
    return {
      props: { data },
    };
  } catch (error) {
    const data = error.response.data;
    return {
      props: { data },
    };
  }
};
