export default (props) => {
  return <p>winkelform</p>;
};

export async function getStaticProps() {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
