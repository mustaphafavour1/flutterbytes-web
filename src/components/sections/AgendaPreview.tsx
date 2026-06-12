"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { AgendaSession } from "@/data/fallback-agenda";

interface Props {
  friday: AgendaSession[];
  saturday: AgendaSession[];
}

function AgendaTable({ sessions }: { sessions: AgendaSession[] }) {
  const preview = sessions.slice(0, 5);
  return (
    <div className="rounded-3xl overflow-hidden border border-fbc-border bg-fbc-card/40 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead>
            <tr className="bg-fbc-blue/20">
              <th className="text-left px-5 py-4 text-fbc-sky text-xs font-semibold uppercase tracking-wider">Time</th>
              <th className="text-left px-5 py-4 text-fbc-sky text-xs font-semibold uppercase tracking-wider">Session</th>
              <th className="text-left px-5 py-4 text-fbc-sky text-xs font-semibold uppercase tracking-wider">Speaker</th>
              <th className="text-left px-5 py-4 text-fbc-sky text-xs font-semibold uppercase tracking-wider">Hall</th>
            </tr>
          </thead>
          <tbody>
            {preview.map((s, i) => (
              <tr
                key={i}
                className={`border-t border-fbc-border/50 hover:bg-fbc-blue/10 transition-colors ${
                  i % 2 === 1 ? "bg-white/[0.02]" : ""
                }`}
              >
                <td className="px-5 py-4 text-fbc-sky font-mono text-sm whitespace-nowrap">{s.time}</td>
                <td className="px-5 py-4 text-fbc-white text-sm leading-snug font-medium">{s.session}</td>
                <td className="px-5 py-4 text-fbc-muted text-sm">{s.speaker}</td>
                <td className="px-5 py-4">
                  <span className="text-xs bg-fbc-blue/15 text-fbc-sky border border-fbc-border rounded-full px-3 py-1 whitespace-nowrap">
                    {s.hall}
                  </span>
                </td>
              </tr>
            ))}
            {/* More sessions row */}
            <tr className="border-t border-fbc-border/50 bg-fbc-dark/40">
              <td colSpan={4} className="px-5 py-4 text-center text-fbc-muted text-sm">
                20+ more sessions —{" "}
                <a href="/agenda" className="text-fbc-sky font-semibold hover:underline">
                  View full agenda →
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AgendaPreview({ friday, saturday }: Props) {
  const [tab, setTab] = useState<"friday" | "saturday">("friday");

  return (
    <section id="agenda" className="relative py-24 bg-fbc-dark dark:bg-fbc-dark overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-space font-bold text-3xl md:text-5xl text-fbc-white mb-2">
            What&apos;s on the schedule
          </h2>
          <p className="text-fbc-muted text-base mb-8">
            Two days. Thirty-something sessions. Zero excuse to not level up.
          </p>
        </AnimateOnScroll>

        {/* Tabs */}
        <AnimateOnScroll delay={0.1}>
          <div className="flex gap-2 mb-8" role="tablist" aria-label="Conference days">
            {(["friday", "saturday"] as const).map((day) => (
              <button
                key={day}
                role="tab"
                aria-selected={tab === day}
                aria-controls={`${day}-panel`}
                onClick={() => setTab(day)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  tab === day
                    ? "bg-fbc-blue text-white shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                    : "bg-fbc-card text-fbc-muted border border-fbc-border hover:text-fbc-white hover:border-fbc-sky/40"
                }`}
              >
                {day === "friday" ? "Friday, Oct 30" : "Saturday, Oct 31"}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <div
            role="tabpanel"
            id={`${tab}-panel`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AgendaTable sessions={tab === "friday" ? friday : saturday} />
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
