import { useEffect } from "react";

export default ({ userdata }) => {
  useEffect(() => {
    console.log(userdata);
  }, []);
  return <p>myInfo</p>;
};
