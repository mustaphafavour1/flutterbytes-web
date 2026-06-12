import { getSpeakers } from "@/lib/sheets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpeakersPageContent from "./SpeakersPageContent";

export const revalidate = 3600;

export const metadata = {
  title: "Speakers — FlutterBytes Conference 2026",
  description: "Meet the world-class engineers and Flutter experts speaking at FlutterBytes Conference 2026.",
};

export default async function SpeakersPage() {
  const speakers = await getSpeakers();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-fbc-light-bg dark:bg-fbc-navy pt-16">
        {/* Hero */}
        <div
          className="relative py-20 bg-fbc-dark dark:bg-fbc-dark overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-fbc-blue/20 blur-[100px] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            <span className="inline-block font-mono text-xs uppercase tracking-widest text-fbc-sky border border-fbc-border rounded-full px-3 py-1 mb-4">
              FBC 2026 · Edition 05
            </span>
            <h1 className="font-space font-bold text-4xl md:text-6xl text-fbc-white mb-3 leading-tight">
              Meet the Speakers
            </h1>
            <p className="text-fbc-muted text-lg max-w-xl">
              Hand-picked engineers, founders and Flutter enthusiasts from across Africa and beyond.
            </p>
          </div>
        </div>

        <SpeakersPageContent speakers={speakers} />

        {/* Apply to speak CTA */}
        <div className="py-20 text-center">
          <h2 className="font-space font-bold text-2xl text-fbc-light-text dark:text-fbc-white mb-3">
            Want to be on this list next year?
          </h2>
          <p className="text-fbc-light-sub dark:text-fbc-muted mb-6">
            Applications for FlutterBytes 2027 speakers will open after this edition.
          </p>
          <a
            href="mailto:speakers@flutterbytes.ng"
            className="rounded-full px-8 py-3.5 font-space font-semibold border border-fbc-sky/40 text-fbc-sky hover:bg-fbc-sky/10 transition-all inline-block"
          >
            Apply to speak at the next edition →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
