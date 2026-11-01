import { getAgenda } from "@/lib/sheets";
import { resolveSpeakerPhotos } from "@/lib/speaker-photos";
import { agendaSpeakerNames } from "@/data/agenda-2026";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgendaPageContent from "./AgendaPageContent";

export const revalidate = 60;

export const metadata = {
  title: "Event Agenda — FlutterBytes Conference 2026",
  description:
    "Full two-day agenda for FlutterBytes 2026: keynotes, workshops, sessions and lightning talks across three halls. November 6–7, Zonetech Park, Gbagada, Lagos.",
};

export default async function AgendaPage() {
  const [friday, saturday] = await Promise.all([getAgenda("Friday"), getAgenda("Saturday")]);

  // Speaker photos from /public/speakers_2026 (initials when there's no photo).
  const photos: Record<string, string> = {};
  for (const s of resolveSpeakerPhotos(agendaSpeakerNames().map((name) => ({ name, role: "", company: "" })), "speakers_2026")) {
    if (s.photo) photos[s.name] = s.photo;
  }

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
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-fbc-sky/10 blur-[80px] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            <span className="inline-block font-mono text-xs uppercase tracking-widest text-fbc-blue border border-fbc-border rounded-full px-3 py-1 mb-4">
              November 6–7, 2026 · Zonetech Park, Lagos
            </span>
            <h1 className="font-space font-bold text-4xl md:text-6xl text-fbc-white mb-3">
              Event Agenda
            </h1>
            <p className="text-fbc-muted text-lg max-w-xl">
              Two days. Three halls. 38 speakers. Zero excuse to not level up.
            </p>
          </div>
        </div>

        <AgendaPageContent photos={photos} pastSessions={[...friday, ...saturday]} serverNow={Date.now()} />
      </main>
      <Footer />
    </>
  );
}
