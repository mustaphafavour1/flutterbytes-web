"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";

const editions = [
  {
    num: "01",
    year: "2022",
    theme: "Flutter: Beyond Mobile",
    location: "The Zone, Gbagada, Lagos",
    date: "Nov 2022",
    highlight: "200 Devs",
    gradient: "from-sky-400 to-blue-600",
    badge: null,
    isCurrent: false,
  },
  {
    num: "02",
    year: "2023",
    theme: "Flutter Everywhere",
    location: "The Zone, Gbagada, Lagos",
    date: "Oct 2023",
    highlight: "400 Devs · 20 Speakers",
    gradient: "from-blue-500 to-indigo-600",
    badge: null,
    isCurrent: false,
  },
  {
    num: "03",
    year: "2024",
    theme: "Flutter for the Future",
    location: "The Zone, Gbagada, Lagos",
    date: "Nov 2024",
    highlight: "500 Devs · 28 Speakers",
    gradient: "from-fbc-300 to-fbc-400",
    badge: null,
    isCurrent: false,
  },
  {
    num: "04",
    year: "2025",
    theme: "Flutter: The Framework of the Future",
    location: "The Zone, Gbagada, Lagos",
    date: "Oct 31 & Nov 1, 2025",
    highlight: "600 Devs · 35 Speakers · 32 Sessions",
    gradient: "from-fbc-200 to-fbc-300",
    badge: "Previous Edition",
    isCurrent: false,
  },
  {
    num: "05",
    year: "2026",
    theme: "Becoming Flutter AI Engineer",
    location: "The Zone, Gbagada, Lagos",
    date: "Oct 30 & 31, 2026",
    highlight: "You're here. 🎉",
    gradient: "from-fbc-200 to-fbc-400",
    badge: "This Edition",
    isCurrent: true,
  },
];

export default function FiveEditions() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
  };

  return (
    <section id="editions" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="mb-3">
            <h2 className="section-title">5 Years of FlutterBytes</h2>
          </div>
          <p className="text-fbc-500/60 text-base mb-10 max-w-xl">
            From a small Lagos meetup to Africa&apos;s biggest Flutter conference.
          </p>
        </AnimateOnScroll>

        {/* Scroll arrows */}
        <div className="hidden md:flex gap-2 mb-6 justify-end">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-fbc-500 hover:bg-fbc-200 hover:text-white transition-all"
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-fbc-500 hover:bg-fbc-200 hover:text-white transition-all"
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          role="list"
          aria-label="Conference editions timeline"
        >
          {editions.map((ed, i) => (
            <motion.div
              key={ed.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`snap-start flex-shrink-0 w-[300px] sm:w-[320px] rounded-3xl overflow-hidden flex flex-col ${
                ed.isCurrent
                  ? "animate-pulse-glow"
                  : ""
              }`}
              style={
                ed.isCurrent
                  ? {
                      border: "2px solid rgba(42,157,244,0.7)",
                      boxShadow:
                        "0 0 30px rgba(42,157,244,0.4), 0 0 60px rgba(42,157,244,0.15)",
                      animation:
                        "pulseGlow 2.5s ease-in-out infinite",
                    }
                  : { border: "1px solid rgba(255,255,255,0.5)" }
              }
              role="listitem"
            >
              {/* Photo area */}
              <div
                className={`h-40 bg-gradient-to-br ${ed.gradient} relative flex items-end p-4`}
              >
                {/* Edition number */}
                <span
                  className="absolute top-4 left-4 font-gigasans font-black text-5xl leading-none text-white/20 select-none"
                  aria-hidden="true"
                >
                  {ed.num}
                </span>
                {/* Badge */}
                {ed.badge && (
                  <span
                    className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold ${
                      ed.isCurrent
                        ? "bg-fbc-200 text-white"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {ed.badge}
                  </span>
                )}
                {/* Year overlay */}
                <span className="font-gigasans font-black text-3xl text-white/90 relative z-10">
                  {ed.year}
                </span>
              </div>

              {/* Card body */}
              <div className="flex-1 bg-white/80 backdrop-blur-sm p-5">
                <h3 className="font-gigasans font-bold text-fbc-500 text-base leading-snug mb-3">
                  {ed.theme}
                </h3>
                <div className="space-y-1.5 text-sm text-fbc-500/60">
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {ed.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {ed.date}
                  </div>
                </div>
                {/* Highlight stat */}
                <div
                  className={`mt-4 rounded-xl px-3 py-2 text-sm font-semibold ${
                    ed.isCurrent
                      ? "bg-fbc-200/15 text-fbc-200"
                      : "bg-fbc-100 text-fbc-400"
                  }`}
                >
                  {ed.highlight}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint on mobile */}
        <p className="md:hidden text-center text-fbc-500/40 text-xs mt-2">
          Swipe to explore all editions →
        </p>
      </div>
    </section>
  );
}
