import Image from "next/image";
import IPAC from "./components/home/ipac";
import Contactus from "./components/home/contactus";
import Hero from "./components/home/hero";
import Gallery from "./components/home/gallery";
import Heading from "./components/heading";

export default function Home() {
  return (
    <div >
       <Hero/>
      <Heading heading={"About us"} route={"/about"}/>
      <IPAC/>
      <Gallery/>
      <Heading heading={"Contact us"} route={"/contact"}/>
      <Contactus/>
    </div>
  );
}
