"use client";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import EventInfo from "@/components/EventInfo";
import Agenda from "@/components/Agenda";
import Speakers from "@/components/Speakers";
import FiveEditions from "@/components/FiveEditions";
import Sponsors from "@/components/Sponsors";
import Gallery from "@/components/Gallery";
import Committee from "@/components/Committee";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <EventInfo />
      <Agenda />
      <Speakers />
      <FiveEditions />
      <Sponsors />
      <Gallery />
      <Committee />
      <About />
      <Footer />
    </main>
  );
}
