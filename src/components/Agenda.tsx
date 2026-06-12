"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";

interface Session {
  time: string;
  title: string;
  anchor: string;
  hall: string;
}

const fridaySessions: Session[] = [
  { time: "09:00–10:00", title: "Registration", anchor: "N/A", hall: "Main Hall" },
  { time: "10:00–10:10", title: "Opening & Welcome", anchor: "Hosts", hall: "Main Hall" },
  { time: "10:10–10:25", title: "Lightning Talk 1: Building AI-Augmented Flutter Apps", anchor: "TBA", hall: "Main Hall" },
  { time: "10:30–11:00", title: "Opening Keynote: The Flutter AI Engineer in 2026", anchor: "TBA", hall: "Main Hall" },
  { time: "11:05–11:30", title: "Integrating LLMs into Mobile Workflows", anchor: "TBA", hall: "Main Hall" },
];

const saturdaySessions: Session[] = [
  { time: "09:00–09:30", title: "Day 2 Welcome & Highlights", anchor: "Hosts", hall: "Main Hall" },
  { time: "09:30–10:00", title: "AI-First UI Design with Flutter", anchor: "TBA", hall: "Main Hall" },
  { time: "10:05–10:30", title: "On-Device ML: Flutter & TensorFlow Lite", anchor: "TBA", hall: "Main Hall" },
  { time: "10:35–11:00", title: "Workshop: Building Your First AI Flutter App", anchor: "TBA", hall: "Workshop Hall" },
  { time: "11:05–11:30", title: "Flutter for Web: Beyond the Browser", anchor: "TBA", hall: "Main Hall" },
];

function SessionRow({ session, index }: { session: Session; index: number }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b border-white/5 hover:bg-white/5 transition-colors group"
    >
      <td className="px-4 py-4 text-fbc-200 font-mono text-sm font-medium whitespace-nowrap">
        {session.time}
      </td>
      <td className="px-4 py-4 text-white font-medium text-sm leading-snug">
        {session.title}
      </td>
      <td className="px-4 py-4 text-white/60 text-sm">{session.anchor}</td>
      <td className="px-4 py-4">
        <span className="inline-flex items-center rounded-full bg-fbc-400/30 px-3 py-1 text-xs text-fbc-100 font-medium">
          {session.hall}
        </span>
      </td>
    </motion.tr>
  );
}

export default function Agenda() {
  const [activeTab, setActiveTab] = useState<"friday" | "saturday">("friday");

  const sessions = activeTab === "friday" ? fridaySessions : saturdaySessions;

  return (
    <section id="agenda" className="relative py-20 bg-fbc-500 overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(42,157,244,1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="mb-10">
            <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-white mb-2">
              Agenda for FlutterBytes Conference 2026
            </h2>
            <p className="text-white/50 text-base">
              Two days packed with sessions, workshops, and networking.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Tabs */}
        <AnimateOnScroll delay={0.1}>
          <div className="flex gap-2 mb-8" role="tablist" aria-label="Conference days">
            {(["friday", "saturday"] as const).map((day) => (
              <button
                key={day}
                role="tab"
                aria-selected={activeTab === day}
                aria-controls={`${day}-panel`}
                onClick={() => setActiveTab(day)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  activeTab === day
                    ? "bg-fbc-200 text-white shadow-lg shadow-fbc-200/30"
                    : "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white"
                }`}
              >
                {day === "friday" ? "Friday Agenda" : "Saturday Agenda"}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Table */}
        <AnimateOnScroll delay={0.15}>
          <div
            className="rounded-3xl overflow-hidden border border-white/10"
            role="tabpanel"
            id={`${activeTab}-panel`}
            aria-label={`${activeTab} sessions`}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(90deg, #1167B1 0%, #2A9DF4 100%)",
                    }}
                  >
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Timeline
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Session Title
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Anchor(s)
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Hall
                    </th>
                  </tr>
                </thead>
                <AnimatePresence mode="wait">
                  <motion.tbody
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-fbc-500/80"
                  >
                    {sessions.map((session, i) => (
                      <SessionRow key={session.time} session={session} index={i} />
                    ))}
                    {/* More sessions row */}
                    <tr className="border-t border-fbc-400/30 bg-fbc-400/10">
                      <td colSpan={4} className="px-4 py-5 text-center">
                        <span className="text-white/50 text-sm">
                          20+ more sessions —{" "}
                          <a
                            href="#"
                            className="text-fbc-200 font-semibold hover:underline"
                          >
                            Full agenda of the event →
                          </a>
                        </span>
                      </td>
                    </tr>
                  </motion.tbody>
                </AnimatePresence>
              </table>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
