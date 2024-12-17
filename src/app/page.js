import Image from "next/image";
import IPAC from "./components/home/ipac";
import Contactus from "./components/home/contactus";
import Hero from "./components/home/hero";
import Gallery from "./components/home/gallery";
export default function Home() {
  return (
    <div >
       <Hero/>
      <IPAC/>
      <Gallery/>
      <Contactus/>
    </div>
  );
}
