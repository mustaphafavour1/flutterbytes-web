"use client";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import CountdownTimer from "@/components/CountdownTimer";

const INFO_CELLS = [
  { num: "35",   label: "Speakers",     icon: "🎤" },
  { num: "600+", label: "Flutter Devs", icon: "👥" },
  { num: "32",   label: "Sessions",     icon: "💡" },
  { num: "2",    label: "Days",         icon: "📅" },
  { num: "5th",  label: "Edition",      icon: "🏆" },
  { num: "AI",   label: "Focus",        icon: "🤖" },
];

function InfoCell({ cell }: { cell: typeof INFO_CELLS[0] }) {
  return (
    <motion.div
      className="group flex flex-col gap-1 p-4 rounded-xl cursor-default"
      whileHover={{
        backgroundColor: "rgba(42,157,244,0.06)",
        boxShadow: "0 0 22px rgba(42,157,244,0.10)",
      }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-xl mb-0.5">{cell.icon}</span>
      <div className="font-gigasans font-black text-3xl text-fbc-sky leading-none tracking-tight">
        {cell.num}
      </div>
      <div className="text-fbc-muted text-xs font-medium mt-0.5">{cell.label}</div>
    </motion.div>
  );
}

export default function EventSnapshot() {
  return (
    <section id="event-info" className="relative bg-fbc-dark overflow-hidden">
      <div className="flex flex-col lg:flex-row" style={{ minHeight: "72vh" }}>

        {/* ── Left: event info ── */}
        <div className="flex-1 px-8 sm:px-12 lg:px-16 py-20 flex flex-col justify-center border-r border-white/[0.05]">
          <AnimateOnScroll>
            {/* Section micro-label */}
            <p className="font-mono text-[10px] uppercase tracking-widest text-fbc-muted/40 mb-10">
              — The Event
            </p>

            {/* Date + time */}
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-1">
                <Calendar size={14} className="text-fbc-sky/50 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-gigasans font-bold text-3xl md:text-4xl text-fbc-white leading-tight">
                    Friday &amp; Saturday
                  </h2>
                  <p className="font-gigasans font-semibold text-fbc-blue text-xl mt-0.5">
                    October 30th &amp; 31st, 2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-[22px] mt-2">
                <Clock size={12} className="text-fbc-muted/40" />
                <span className="text-fbc-muted text-sm">9:00 AM WAT on both days</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/[0.06] mb-6" />

            {/* 2 × 3 info grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mb-6">
              {INFO_CELLS.map((cell) => (
                <InfoCell key={cell.label} cell={cell} />
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/[0.06] mb-6" />

            {/* Countdown + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-fbc-muted/40 mb-2">
                  Countdown
                </p>
                <Suspense fallback={<div className="h-10" />}>
                  <CountdownTimer />
                </Suspense>
              </div>
              <a
                href="#tickets"
                className="rounded-full px-6 py-3 font-gigasans font-semibold text-sm text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_20px_rgba(42,157,244,0.35)]"
              >
                Pick Up a Ticket →
              </a>
            </div>
          </AnimateOnScroll>
        </div>

        {/* ── Right: Google Map ── */}
        <div className="w-full lg:w-[45%] relative min-h-[400px] lg:min-h-0">
          <iframe
            src="https://maps.google.com/maps?q=Zone+Tech+Park,+Gbagada,+Lagos,+Nigeria&output=embed&z=15"
            title="Zone Tech Park, Gbagada, Lagos"
            className="absolute inset-0 w-full h-full border-0 grayscale-[20%]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Address popover */}
          <div className="absolute bottom-5 left-5 bg-fbc-navy/92 backdrop-blur-md rounded-xl px-4 py-3 border border-white/[0.08] flex items-start gap-2.5 max-w-[250px] shadow-lg">
            <MapPin size={13} className="text-fbc-sky mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-fbc-white text-xs font-semibold">Zone Tech Park</p>
              <p className="text-fbc-muted text-[11px] mt-0.5 leading-snug">
                Off Gbagada Express, Gbagada, Lagos
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
