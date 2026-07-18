import { getSpeakers, getPastSpeakers } from "@/lib/sheets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpeakersPageContent from "./SpeakersPageContent";

export const revalidate = 60;

export const metadata = {
  title: "Speakers — FlutterBytes Conference 2026",
  description: "Meet the world-class engineers and Flutter experts speaking at FlutterBytes Conference 2026.",
};

export default async function SpeakersPage() {
  const [speakers, pastSpeakers] = await Promise.all([getSpeakers(), getPastSpeakers()]);
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-fbc-navy pt-16">
        {/* Hero */}
        <div
          className="relative py-20 bg-fbc-dark overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-fbc-blue/20 blur-[100px] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            <span className="inline-block font-mono text-xs uppercase tracking-widest text-fbc-blue border border-fbc-border rounded-full px-3 py-1 mb-4">
              FBC 2026 · Edition 05
            </span>
            <h1 className="font-space font-bold text-4xl md:text-6xl text-fbc-white mb-3 leading-tight">
              Meet the Speakers
            </h1>
            <p className="text-fbc-muted text-lg max-w-xl mb-6">
              Hand-picked engineers, founders and Flutter enthusiasts from across Africa and beyond who&apos;ve taken the FlutterBytes stage.
            </p>
          </div>
        </div>

        <SpeakersPageContent speakers={speakers} pastSpeakers={pastSpeakers} />
      </main>
      <Footer />
    </>
  );
}
