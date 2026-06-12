"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const editions = [
  {
    num: "01",
    year: "2022",
    theme: "Flutter: Beyond Mobile",
    location: "The Zone, Gbagada",
    date: "Nov 2022",
    highlight: "200 Devs",
    bg: "from-indigo-900 to-blue-800",
    badge: null,
    isCurrent: false,
  },
  {
    num: "02",
    year: "2023",
    theme: "Flutter Everywhere",
    location: "The Zone, Gbagada",
    date: "Oct 2023",
    highlight: "400 Devs · 20 Speakers",
    bg: "from-blue-900 to-cyan-800",
    badge: null,
    isCurrent: false,
  },
  {
    num: "03",
    year: "2024",
    theme: "Flutter for the Future",
    location: "The Zone, Gbagada",
    date: "Nov 2024",
    highlight: "500 Devs · 28 Speakers",
    bg: "from-cyan-900 to-teal-800",
    badge: null,
    isCurrent: false,
  },
  {
    num: "04",
    year: "2025",
    theme: "Flutter: The Framework of the Future",
    location: "The Zone, Gbagada",
    date: "Oct 31 & Nov 1, 2025",
    highlight: "600 Devs · 35 Speakers · 32 Sessions",
    bg: "from-teal-900 to-emerald-800",
    badge: "Previous Edition",
    isCurrent: false,
  },
  {
    num: "05",
    year: "2026",
    theme: "Becoming Flutter AI Engineer",
    location: "The Zone, Gbagada",
    date: "Oct 30 & 31, 2026",
    highlight: "You're here. 🎉",
    bg: "from-blue-600 via-indigo-500 to-cyan-400",
    badge: "This Edition",
    isCurrent: true,
  },
];

export default function FiveEditions() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 330 : -330, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const idx = Math.round(el.scrollLeft / 330);
      setActive(Math.min(idx, editions.length - 1));
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  return (
    <section id="editions" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="mb-3">
            <h2 className="font-space font-bold text-3xl md:text-5xl text-fbc-light-text dark:text-fbc-white">
              Five Years. One Community. Zero Chill.
            </h2>
          </div>
          <p className="text-fbc-light-sub dark:text-fbc-muted text-base mb-8 max-w-xl">
            From 200 devs in a room debating Flutter&apos;s future to 600 engineers building it. Here&apos;s how we got here.
          </p>
        </AnimateOnScroll>

        {/* Scroll arrows (desktop) */}
        <div className="hidden md:flex gap-2 mb-5 justify-end">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-fbc-border flex items-center justify-center text-fbc-muted hover:text-fbc-white hover:border-fbc-sky transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-fbc-border flex items-center justify-center text-fbc-muted hover:text-fbc-white hover:border-fbc-sky transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          role="list"
          aria-label="FlutterBytes editions timeline"
        >
          {editions.map((ed, i) => (
            <motion.div
              key={ed.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="snap-start flex-shrink-0 w-[300px] rounded-3xl border flex flex-col overflow-hidden"
              style={
                ed.isCurrent
                  ? {
                      borderColor: "#38BDF8",
                      boxShadow: "0 0 30px rgba(56,189,248,0.2)",
                    }
                  : {
                      borderColor: "#1E3A5F",
                    }
              }
              role="listitem"
            >
              {/* Image area */}
              <div className={`h-40 bg-gradient-to-br ${ed.bg} relative flex items-end justify-between p-4`}>
                <span
                  className="font-space font-black text-6xl text-white/15 absolute top-2 left-3 leading-none select-none"
                  aria-hidden="true"
                >
                  {ed.num}
                </span>
                {ed.badge && (
                  <span
                    className={`absolute top-3 right-3 text-xs font-semibold rounded-full px-3 py-1 ${
                      ed.isCurrent
                        ? "bg-fbc-sky text-fbc-navy"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {ed.badge}
                  </span>
                )}
                <span className="font-space font-black text-3xl text-white relative z-10">
                  {ed.year}
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 bg-fbc-card dark:bg-fbc-card p-5">
                <h3 className="font-space font-semibold text-fbc-white text-sm leading-snug mb-3">
                  {ed.theme}
                </h3>
                <div className="space-y-1.5 text-xs text-fbc-muted mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={11} className="flex-shrink-0" />
                    {ed.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={11} className="flex-shrink-0" />
                    {ed.date}
                  </div>
                </div>
                <div
                  className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                    ed.isCurrent
                      ? "bg-fbc-sky/15 text-fbc-sky border border-fbc-sky/30"
                      : "bg-fbc-dark text-fbc-muted"
                  }`}
                >
                  {ed.highlight}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot progress — mobile */}
        <div className="flex justify-center gap-2 mt-4 md:hidden" role="group" aria-label="Edition progress">
          {editions.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                scrollRef.current?.scrollTo({ left: i * 330, behavior: "smooth" });
                setActive(i);
              }}
              className={`rounded-full transition-all ${
                active === i ? "w-6 h-2 bg-fbc-sky" : "w-2 h-2 bg-fbc-border"
              }`}
              aria-label={`Go to edition ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
