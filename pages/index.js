import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { fetchposts } from "../store/posts";
import { useEffect } from "react";
import Topper from "../components/Topper";
import Navbar from "../components/Navigation";

export default function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchposts());
  }, []);

  return (
    <>
      <Head>
        <title>FabLab Genk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>
      <Topper
        title="FabLab Genk"
        paragraph='Een FabLab (Fabrication – of Fabulous – Laboratory) is een kleinschalige werkplaats met een aanbod van computergestuurde gereedschappen met het doel om "bijna alles" te kunnen maken.'
      ></Topper>
      <main></main>
      <footer>{posts && posts.map((item) => <p key={item}>{item}</p>)}</footer>
    </>
  );
}
