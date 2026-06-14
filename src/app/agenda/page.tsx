import { getAgenda } from "@/lib/sheets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgendaPageContent from "./AgendaPageContent";

export const revalidate = 3600;

export const metadata = {
  title: "Event Agenda — FlutterBytes Conference 2026",
  description: "Full two-day conference agenda for FlutterBytes 2026. October 30–31, Lagos.",
};

export default async function AgendaPage() {
  const [friday, saturday] = await Promise.all([
    getAgenda("Friday"),
    getAgenda("Saturday"),
  ]);

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
            <span className="inline-block font-mono text-xs uppercase tracking-widest text-fbc-sky border border-fbc-border rounded-full px-3 py-1 mb-4">
              October 30–31, 2026
            </span>
            <h1 className="font-space font-bold text-4xl md:text-6xl text-fbc-white mb-3">
              Event Agenda
            </h1>
            <p className="text-fbc-muted text-lg max-w-xl">
              Two days. Thirty-something sessions. Zero excuse to not level up.
            </p>
          </div>
        </div>

        <AgendaPageContent friday={friday} saturday={saturday} />
      </main>
      <Footer />
    </>
  );
}
