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
import { getSpeakers, getAgenda, getCommittee, getPastSpeakers } from "@/lib/sheets";
import { getGalleryYears, getTestimonialPairs } from "@/lib/gallery-photos";

export const revalidate = 60;

export default async function Home() {
  const [speakers, friday, saturday, committee, pastSpeakers] = await Promise.all([
    getSpeakers(),
    getAgenda("Friday"),
    getAgenda("Saturday"),
    getCommittee(),
    getPastSpeakers(),
  ]);
  const galleryYears = getGalleryYears();
  const testimonials = getTestimonialPairs();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FiveEditions />
        <EventSnapshot />
        <AgendaPreview pastSessions={[...friday, ...saturday]} />
        <SpeakersPreview speakers={speakers} pastSpeakers={pastSpeakers} />
        <GallerySection years={galleryYears} testimonials={testimonials} />
        <SponsorsSection />
        <CommitteeSection members={committee} />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
