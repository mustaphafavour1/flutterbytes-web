import { Users, BrainCircuit, TrendingUp, Heart, MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommitteeSection from "@/components/sections/CommitteeSection";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { getCommittee } from "@/lib/sheets";

export const revalidate = 3600;

export const metadata = {
  title: "About — FlutterBytes Conference 2026",
  description: "The story, mission and people behind Africa's premier Flutter conference.",
};

const values = [
  { Icon: Users, title: "Connection", desc: "Bringing Flutter developers across Africa together under one roof, edition after edition." },
  { Icon: BrainCircuit, title: "Innovation", desc: "Showcasing cutting-edge Flutter and AI developments that push the boundaries of mobile." },
  { Icon: TrendingUp, title: "Growth", desc: "Accelerating the careers and technical skills of mobile engineers at every stage." },
  { Icon: Heart, title: "Community", desc: "Fostering an inclusive, welcoming ecosystem for all developers, beginners and veterans alike." },
];

const editions = [
  { num: "01", year: "2022", theme: "Flutter: Beyond Mobile", location: "The Zone, Gbagada", date: "Nov 2022", stat: "200 Devs" },
  { num: "02", year: "2023", theme: "Flutter Everywhere", location: "The Zone, Gbagada", date: "Oct 2023", stat: "400 Devs · 20 Speakers" },
  { num: "03", year: "2024", theme: "Flutter for the Future", location: "The Zone, Gbagada", date: "Nov 2024", stat: "500 Devs · 28 Speakers" },
  { num: "04", year: "2025", theme: "Flutter: The Framework of the Future", location: "The Zone, Gbagada", date: "Oct–Nov 2025", stat: "600 Devs · 35 Speakers" },
  { num: "05", year: "2026", theme: "Becoming Flutter AI Engineer", location: "The Zone, Gbagada", date: "Oct 30–31, 2026", stat: "You're here 🎉", isCurrent: true },
];

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
      <main className="min-h-screen bg-fbc-light-bg dark:bg-fbc-navy pt-16">
        {/* Hero */}
        <div
          className="relative py-24 bg-fbc-dark overflow-hidden"
          style={{
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
              FlutterBytes started because a few Lagos devs wanted to talk Flutter seriously.
              Turns out, a lot of people wanted the same thing.
              Five editions later, here we are.
            </p>
          </div>
        </div>

        {/* Global stats */}
        <div className="bg-fbc-navy dark:bg-fbc-navy py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {globalStats.map((s) => (
                <div key={s.label} className="text-center p-6 rounded-2xl bg-fbc-card border border-fbc-border">
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
            <h2 className="font-space font-bold text-3xl dark:text-fbc-white text-fbc-light-text mb-6">Our Mission</h2>
            <p className="text-fbc-light-sub dark:text-fbc-muted text-lg leading-relaxed">
              FlutterBytes is Africa&apos;s premier Flutter developer community and conference.
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
            <h2 className="font-space font-bold text-3xl dark:text-fbc-white text-fbc-light-text mb-8">Our Values</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(({ Icon, title, desc }, i) => (
              <AnimateOnScroll key={title} delay={i * 0.1}>
                <div className="rounded-2xl bg-fbc-card dark:bg-fbc-card border border-fbc-border p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-fbc-blue/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-fbc-sky" />
                  </div>
                  <div>
                    <h3 className="font-space font-semibold text-fbc-white mb-1">{title}</h3>
                    <p className="text-fbc-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Vertical timeline */}
        <div className="py-12 pb-24 max-w-3xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <h2 className="font-space font-bold text-3xl dark:text-fbc-white text-fbc-light-text mb-10">
              Five Editions, One Story
            </h2>
          </AnimateOnScroll>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-fbc-border" aria-hidden="true" />
            <div className="space-y-8">
              {editions.map((ed, i) => (
                <AnimateOnScroll key={ed.num} delay={i * 0.1} direction="left">
                  <div className="flex gap-6 items-start">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 font-mono text-xs font-bold ${
                        ed.isCurrent
                          ? "bg-fbc-sky text-fbc-navy"
                          : "bg-fbc-card border border-fbc-border text-fbc-muted"
                      }`}
                    >
                      {ed.num}
                    </div>
                    <div className={`flex-1 rounded-2xl p-5 ${ed.isCurrent ? "bg-fbc-blue/10 border border-fbc-sky/30" : "bg-fbc-card border border-fbc-border"}`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="font-space font-bold text-xl text-fbc-sky">{ed.year}</span>
                          <h3 className="font-space font-semibold text-fbc-white text-sm">{ed.theme}</h3>
                        </div>
                        <span className={`text-xs rounded-full px-2 py-1 flex-shrink-0 ${ed.isCurrent ? "bg-fbc-sky/20 text-fbc-sky" : "bg-fbc-dark text-fbc-muted"}`}>
                          {ed.stat}
                        </span>
                      </div>
                      <div className="flex gap-4 text-fbc-muted text-xs">
                        <span className="flex items-center gap-1"><MapPin size={10} />{ed.location}</span>
                        <span className="flex items-center gap-1"><Calendar size={10} />{ed.date}</span>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
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
