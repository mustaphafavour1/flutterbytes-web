"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { AgendaSession } from "@/data/fallback-agenda";

interface Props {
  friday: AgendaSession[];
  saturday: AgendaSession[];
  pastSessions?: AgendaSession[];
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
        className="border-t border-fbc-border/50 hover:bg-fbc-blue/10 transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <td className="px-5 py-4 text-fbc-sky font-mono text-sm whitespace-nowrap">{session.time}</td>
        <td className="px-5 py-4 text-fbc-white text-sm font-medium leading-snug">
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
        <tr className="bg-fbc-dark/60">
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

/* ── GitHub-contribution-style grid for past tab ── */
function PastSessionsGrid({ sessions }: { sessions: AgendaSession[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ROWS = 4;
  const perRow = Math.ceil(sessions.length / ROWS);
  const rows = Array.from({ length: ROWS }, (_, r) =>
    sessions.slice(r * perRow, (r + 1) * perRow)
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let rafId: number;
    let paused = false;
    let resumeId: ReturnType<typeof setTimeout>;
    const pause = () => {
      paused = true;
      clearTimeout(resumeId);
      resumeId = setTimeout(() => { paused = false; }, 2000);
    };
    const tick = () => {
      if (!paused) el.scrollLeft += 0.5;
      rafId = requestAnimationFrame(tick);
    };
    el.addEventListener("wheel", pause, { passive: true });
    el.addEventListener("mousedown", pause, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeId);
      el.removeEventListener("wheel", pause);
      el.removeEventListener("mousedown", pause);
    };
  }, []);

  return (
    <div ref={scrollRef} className="overflow-x-auto scrollbar-hide pb-2">
      <div className="inline-flex flex-col gap-2" style={{ minWidth: "max-content" }}>
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-2">
            {row.map((session, ci) => {
              const idx = ri * perRow + ci;
              const isHovered = hoveredIdx === idx;
              const isNear = hoveredIdx !== null && Math.abs(hoveredIdx - idx) <= 1 && !isHovered;
              return (
                <motion.div
                  key={ci}
                  className="relative flex-shrink-0 rounded-xl cursor-pointer overflow-hidden"
                  style={{ width: 158, height: 70, border: "1px solid rgba(42,157,244,0.07)" }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  animate={{
                    background: isHovered
                      ? "rgba(42,157,244,0.28)"
                      : isNear
                      ? "rgba(42,157,244,0.16)"
                      : "rgba(42,157,244,0.09)",
                    borderColor: isHovered
                      ? "rgba(42,157,244,0.50)"
                      : "rgba(42,157,244,0.07)",
                  }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="p-2.5 h-full flex flex-col justify-between">
                    <p className="text-fbc-white/80 text-[10px] font-medium leading-snug line-clamp-2">
                      {session.session}
                    </p>
                    <p className="text-fbc-muted/50 text-[9px] truncate">{session.speaker.split(",")[0]}</p>
                  </div>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.16 }}
                        className="absolute bottom-0 left-0 right-0 px-2.5 py-1.5 flex items-center justify-between"
                        style={{ background: "rgba(42,157,244,0.50)" }}
                      >
                        <span className="text-white text-[10px] font-bold">{session.time}</span>
                        <span className="text-white/90 text-[10px] font-semibold">{session.hall}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

type TabId = "past" | "friday" | "saturday";

export default function AgendaPageContent({ friday, saturday, pastSessions }: Props) {
  const [tab, setTab] = useState<TabId>("past");

  const combinedPast = pastSessions ?? [...friday, ...saturday];

  const tabs: { id: TabId; label: string }[] = [
    { id: "past", label: "Past Editions" },
    { id: "friday", label: "Friday, Oct 30" },
    { id: "saturday", label: "Saturday, Oct 31" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap" role="tablist" aria-label="Conference days">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
              tab === id
                ? "bg-fbc-blue text-white shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                : "bg-fbc-card border border-fbc-border text-fbc-muted hover:text-fbc-white"
            }`}
          >
            {label}
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
          {tab === "past" ? (
            <div className="rounded-3xl overflow-hidden border border-fbc-border bg-fbc-card/40 backdrop-blur p-6">
              <p className="text-fbc-muted text-sm mb-6">
                A combined view of all sessions from past FlutterBytes editions.
              </p>
              <PastSessionsGrid sessions={combinedPast} />
            </div>
          ) : (
            <div className="rounded-3xl overflow-hidden border border-fbc-border bg-fbc-card/40 backdrop-blur">
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
                    {(tab === "friday" ? friday : saturday).map((s, i) => (
                      <SessionRow key={i} session={s} day={tab} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
