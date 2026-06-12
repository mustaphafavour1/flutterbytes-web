"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { AgendaSession } from "@/data/fallback-agenda";

interface Props {
  friday: AgendaSession[];
  saturday: AgendaSession[];
}

function buildCalendarUrl(session: AgendaSession, day: "friday" | "saturday"): string {
  const date = day === "friday" ? "20261030" : "20261031";
  const [startRaw] = session.time.split("–");
  const start = startRaw.replace(":", "");
  const title = encodeURIComponent(session.session);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}T${start.padStart(4, "0")}00/${date}T${start.padStart(4, "0")}00&location=Zone+Tech+Park,+Gbagada,+Lagos`;
}

function SessionRow({ session, day }: { session: AgendaSession; day: "friday" | "saturday" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr
        className="border-t border-fbc-border/50 hover:bg-fbc-blue/10 dark:hover:bg-fbc-blue/10 transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <td className="px-5 py-4 text-fbc-sky font-mono text-sm whitespace-nowrap">{session.time}</td>
        <td className="px-5 py-4 text-fbc-white dark:text-fbc-white text-light-text text-sm font-medium leading-snug">
          <span className="flex items-center gap-2">
            {session.session}
            <ChevronDown
              size={14}
              className={`text-fbc-muted transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </span>
        </td>
        <td className="px-5 py-4 text-fbc-muted text-sm">{session.speaker}</td>
        <td className="px-5 py-4">
          <span className="text-xs bg-fbc-blue/15 text-fbc-sky border border-fbc-border rounded-full px-3 py-1 whitespace-nowrap">
            {session.hall}
          </span>
        </td>
        <td className="px-5 py-4 no-print">
          <a
            href={buildCalendarUrl(session, day)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-fbc-muted hover:text-fbc-sky transition-colors inline-flex items-center gap-1 text-xs"
            aria-label={`Add ${session.session} to Google Calendar`}
          >
            <ExternalLink size={12} />
            <span className="hidden sm:inline">Calendar</span>
          </a>
        </td>
      </tr>
      {open && session.tags && session.tags.length > 0 && (
        <tr className="bg-fbc-dark/60 dark:bg-fbc-dark/60">
          <td colSpan={5} className="px-5 py-3">
            <div className="flex flex-wrap gap-2">
              {session.tags.map((t) => (
                <span key={t} className="text-xs rounded-full px-3 py-1 bg-fbc-blue/15 text-fbc-sky border border-fbc-border">
                  {t}
                </span>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AgendaPageContent({ friday, saturday }: Props) {
  const [tab, setTab] = useState<"friday" | "saturday">("friday");
  const sessions = tab === "friday" ? friday : saturday;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Tabs */}
      <div className="flex gap-2 mb-8" role="tablist" aria-label="Conference days">
        {(["friday", "saturday"] as const).map((day) => (
          <button
            key={day}
            role="tab"
            aria-selected={tab === day}
            onClick={() => setTab(day)}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
              tab === day
                ? "bg-fbc-blue text-white shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                : "bg-fbc-card border border-fbc-border text-fbc-muted hover:text-fbc-white"
            }`}
          >
            {day === "friday" ? "Friday, Oct 30" : "Saturday, Oct 31"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="rounded-3xl overflow-hidden border border-fbc-border bg-fbc-card/40 dark:bg-fbc-card/40 backdrop-blur">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-fbc-blue/20">
                    <th className="text-left px-5 py-4 text-fbc-sky text-xs font-semibold uppercase tracking-wider">Time</th>
                    <th className="text-left px-5 py-4 text-fbc-sky text-xs font-semibold uppercase tracking-wider">Session</th>
                    <th className="text-left px-5 py-4 text-fbc-sky text-xs font-semibold uppercase tracking-wider">Speaker</th>
                    <th className="text-left px-5 py-4 text-fbc-sky text-xs font-semibold uppercase tracking-wider">Hall</th>
                    <th className="text-left px-5 py-4 text-fbc-sky text-xs font-semibold uppercase tracking-wider no-print">+Cal</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s, i) => (
                    <SessionRow key={i} session={s} day={tab} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
