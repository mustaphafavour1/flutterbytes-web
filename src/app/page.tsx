import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import EventSnapshot from "@/components/sections/EventSnapshot";
import FiveEditions from "@/components/sections/FiveEditions";
import AgendaPreview from "@/components/sections/AgendaPreview";
import SpeakersPreview from "@/components/sections/SpeakersPreview";
import GallerySection from "@/components/sections/GallerySection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import CommitteeSection from "@/components/sections/CommitteeSection";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { getSpeakers, getAgenda, getCommittee } from "@/lib/sheets";

export const revalidate = 3600;

export default async function Home() {
  const [speakers, friday, saturday, committee] = await Promise.all([
    getSpeakers(),
    getAgenda("Friday"),
    getAgenda("Saturday"),
    getCommittee(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EventSnapshot />
        <FiveEditions />
        <AgendaPreview friday={friday} saturday={saturday} />
        <SpeakersPreview speakers={speakers} />
        <GallerySection />
        <SponsorsSection />
        <CommitteeSection members={committee} />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
