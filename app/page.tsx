"use client";
import BentoGallery from "./components/gallery";
import { Hero } from "./components/hero";
import { Marquee } from "./components/marquee";
import Menu from "./components/menu";





export default function Home() {
  return (
        <div>
          <Hero/>
          <Menu/>
          <BentoGallery/>
          <Marquee/>
    </div>
  );
}
