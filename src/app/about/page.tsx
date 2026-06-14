import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommitteeSection from "@/components/sections/CommitteeSection";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FiveEditions from "@/components/sections/FiveEditions";
import AboutValueCards from "@/components/AboutValueCards";
import { getCommittee } from "@/lib/sheets";

export const revalidate = 3600;

export const metadata = {
  title: "About — FlutterBytes Conference 2026",
  description: "The story, mission and people behind Africa's premier Flutter conference.",
};

const globalStats = [
  { value: "5", label: "Editions" },
  { value: "2,300+", label: "Total Attendees" },
  { value: "100+", label: "Total Sessions" },
  { value: "15+", label: "Cities Represented" },
];

export default async function AboutPage() {
  const committee = await getCommittee();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-fbc-navy pt-16">
        {/* Hero */}
        <div
          className="relative py-24 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #050E1F 0%, #0A1628 100%)",
            backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-fbc-sky/10 blur-[80px] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="font-space font-bold text-4xl md:text-6xl text-fbc-white mb-6 leading-tight">
              About us
            </h1>
            <p className="text-fbc-muted text-lg md:text-xl leading-relaxed max-w-2xl">
              We started FlutterBytes because a couple of us writing Flutter in Lagos wanted to meet other Flutter devs.
              Turns out, a LOT of people wanted the same thing. Five editions later, here we are — and we&apos;re just getting started.
            </p>
          </div>
        </div>

        {/* Global stats */}
        <div className="bg-fbc-navy py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {globalStats.map((s) => (
                <div key={s.label} className="text-center p-6 rounded-[999px] bg-fbc-card border border-fbc-border">
                  <div className="font-space font-bold text-4xl text-fbc-sky">{s.value}</div>
                  <div className="text-fbc-muted text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <h2 className="font-space font-bold text-3xl text-fbc-white mb-6">Our Mission</h2>
            <p className="text-fbc-muted text-lg leading-relaxed">
              We&apos;ve built Africa&apos;s premier Flutter developer community and conference.
              We bring together mobile engineers, tech enthusiasts, and industry leaders to celebrate,
              learn, and grow together. We believe the next generation of world-class mobile apps
              will be built right here in Africa — and we&apos;re here to make sure the developers
              building them have the knowledge, network, and inspiration they need.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Values */}
        <div className="py-12 pb-24 max-w-5xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <h2 className="font-space font-bold text-3xl text-fbc-white mb-8">Our Values</h2>
          </AnimateOnScroll>
          <AboutValueCards />
        </div>

        {/* Five Editions horizontal scroll */}
        <div className="pb-12">
          <FiveEditions />
        </div>

        {/* Committee */}
        <div id="committee">
          <CommitteeSection members={committee} />
        </div>
      </main>
      <Footer />
    </>
  );
}
