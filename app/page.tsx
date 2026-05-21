"use client";
import BentoGallery from "./components/gallery";
import { Hero } from "./components/hero";
import { Marquee } from "./components/marquee";
import Menu from "./components/menu";
import ReservationWidget from "./components/reservation";





export default function Home() {
  return (
        <div>
          <Hero/>
          <Marquee/>
          <Menu/>
          <BentoGallery/>
          <ReservationWidget/>
    </div>
  );
}
