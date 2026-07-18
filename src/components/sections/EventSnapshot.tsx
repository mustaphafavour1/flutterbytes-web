"use client";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import CountdownTimer from "@/components/CountdownTimer";

const INFO_CELLS = [
  { num: "35",   label: "Speakers"     },
  { num: "600+", label: "Flutter Devs" },
  { num: "32",   label: "Sessions"     },
  { num: "2",    label: "Days"         },
  { num: "5th",  label: "Edition"      },
  { num: "5",    label: "Countries"    },
];

function InfoCell({ cell }: { cell: typeof INFO_CELLS[0] }) {
  return (
    <motion.div
      className="group flex flex-col gap-1 p-4 sm:p-5 cursor-default"
      style={{ background: "transparent" }}
      whileHover={{
        boxShadow: "0 0 28px rgba(42,157,244,0.20), inset 0 0 16px rgba(42,157,244,0.06)",
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="font-gigasans font-semibold text-3xl sm:text-4xl text-fbc-blue leading-none tracking-tight">
        {cell.num}
      </div>
      <div className="text-fbc-muted text-xs font-medium mt-1">{cell.label}</div>
    </motion.div>
  );
}

export default function EventSnapshot() {
  return (
    <section
      id="event-info"
      className="relative overflow-hidden sec-plain"
    >
      <div className="flex flex-col lg:flex-row" style={{ minHeight: "78vh" }}>

        {/* ── Left: event info ── */}
        <div className="flex-1 px-4 sm:px-8 lg:px-16 py-16 sm:py-20 flex flex-col border-r border-fbc-border/60">
          <AnimateOnScroll>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-fbc-muted/40 mb-8">
                — The Event
              </p>

              {/* Date + time */}
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-1">
                  <Calendar size={14} className="text-fbc-blue/50 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="font-gigasans font-bold text-2xl sm:text-3xl md:text-4xl text-fbc-white leading-tight">
                      Friday &amp; Saturday
                    </h2>
                    <p className="font-gigasans font-semibold text-fbc-blue text-lg sm:text-xl mt-0.5">
                      October 30th &amp; 31st, 2026
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-[22px] mt-2">
                  <Clock size={12} className="text-fbc-muted/40" />
                  <span className="text-fbc-muted text-sm">9:00 AM WAT on both days</span>
                </div>
              </div>

              <div className="border-t border-fbc-border/50 mb-4" />

              {/* 2 × 3 info grid — no fill, dividers via borders */}
              <div className="grid grid-cols-3 mb-4 border border-fbc-border/50 rounded-xl overflow-hidden">
                {INFO_CELLS.map((cell, i) => (
                  <div
                    key={cell.label}
                    style={{
                      borderRight: i % 3 !== 2 ? "1px solid rgb(var(--color-border) / 0.5)" : "none",
                      borderBottom: i < 3 ? "1px solid rgb(var(--color-border) / 0.5)" : "none",
                    }}
                  >
                    <InfoCell cell={cell} />
                  </div>
                ))}
              </div>

              <div className="border-t border-fbc-border/50 mb-6" />

              {/* Countdown + ticket button on same row */}
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-fbc-muted/40 mb-3">
                  Countdown
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <Suspense fallback={<div className="h-12" />}>
                      <CountdownTimer />
                    </Suspense>
                  </div>
                  <a
                    href="https://sessionize.com/flutterbytes-conference-2026/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-5 py-2.5 font-gigasans font-semibold text-xs text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_16px_rgba(42,157,244,0.35)] whitespace-nowrap flex-shrink-0"
                  >
                    Apply to Speak →
                  </a>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* ── Right: Google Map ── */}
        <div className="w-full lg:w-[45%] relative min-h-[300px] sm:min-h-[400px] lg:min-h-0">
          <iframe
            src="https://maps.google.com/maps?q=Zone+Tech+Park,+Gbagada,+Lagos,+Nigeria&output=embed&z=15"
            title="Zone Tech Park, Gbagada, Lagos"
            className="absolute inset-0 w-full h-full border-0 grayscale-[20%]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute bottom-5 left-5 bg-fbc-navy/92 backdrop-blur-md rounded-xl px-4 py-3 border border-fbc-border/60 flex items-start gap-2.5 max-w-[220px] shadow-lg">
            <MapPin size={13} className="text-fbc-blue mt-0.5 flex-shrink-0" />
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
