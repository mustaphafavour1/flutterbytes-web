"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AgendaSession } from "@/data/fallback-agenda";

interface Props {
  friday: AgendaSession[];
  saturday: AgendaSession[];
  pastSessions?: AgendaSession[];
}

/* ── Coming-soon overlay for upcoming day tabs ── */
function AgendaComingSoon({ sessions }: { sessions: AgendaSession[] }) {
  const ROWS = 4;
  const perRow = Math.ceil(sessions.length / ROWS);
  const rows = Array.from({ length: ROWS }, (_, r) =>
    sessions.slice(r * perRow, (r + 1) * perRow)
  );

  return (
    <div className="relative">
      <div className="pointer-events-none select-none" style={{ filter: "blur(5px)", opacity: 0.25 }}>
        <div className="overflow-x-hidden pb-2">
          <div className="inline-flex flex-col gap-2" style={{ minWidth: "max-content" }}>
            {rows.map((row, ri) => (
              <div key={ri} className="flex gap-2">
                {row.map((session, ci) => (
                  <div
                    key={ci}
                    className="relative flex-shrink-0 rounded-xl"
                    style={{
                      width: 270,
                      height: 135,
                      border: "1px solid rgba(42,157,244,0.08)",
                      background: "rgba(42,157,244,0.04)",
                    }}
                  >
                    <div className="p-3 h-full flex flex-col justify-between">
                      <p style={{ color: "rgb(var(--color-muted) / 0.6)", fontSize: 10, fontWeight: 500 }} className="line-clamp-2 leading-snug">{session.session}</p>
                      <div style={{ opacity: 0, borderTop: "1px solid rgba(42,157,244,0.22)", paddingTop: 4 }}>
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: 9, color: "#38BDF8", fontWeight: 600 }}>{session.time}</span>
                          <span style={{ fontSize: 9, color: "rgb(var(--color-muted))" }}>{session.hall}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: 9, color: "rgb(var(--color-muted) / 0.4)" }} className="truncate">{session.speaker.split(",")[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-fbc-card/95 backdrop-blur-xl rounded-2xl px-8 py-7 text-center border border-fbc-border max-w-xs shadow-2xl">
          <div className="text-3xl mb-3">🛠️</div>
          <h3 className="font-gigasans font-bold text-fbc-white text-lg mb-2">Agenda in the works</h3>
          <p className="text-fbc-muted text-sm leading-relaxed">
            We&apos;re curating the best sessions. Check back soon.
          </p>
        </div>
      </div>
    </div>
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
              return (
                <div
                  key={ci}
                  className="relative flex-shrink-0 rounded-xl cursor-pointer"
                  style={{
                    width: 270,
                    height: 135,
                    border: `1px solid ${isHovered ? "rgba(42,157,244,0.35)" : "rgba(42,157,244,0.08)"}`,
                    background: isHovered ? "rgba(42,157,244,0.16)" : "rgba(42,157,244,0.04)",
                    transition: "border-color 0.18s, background 0.18s",
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="p-3 h-full flex flex-col justify-between">
                    <p style={{ color: isHovered ? "rgb(var(--color-white) / 0.9)" : "rgb(var(--color-muted) / 0.6)", fontSize: 10, fontWeight: 500 }} className="line-clamp-2 leading-snug">{session.session}</p>
                    <div style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.18s", borderTop: "1px solid rgba(42,157,244,0.22)", paddingTop: 4 }}>
                      <div className="flex items-center justify-between">
                        <span style={{ fontSize: 9, color: "#38BDF8", fontWeight: 600 }}>{session.time}</span>
                        <span style={{ fontSize: 9, color: "rgb(var(--color-muted))" }}>{session.hall}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 9, color: isHovered ? "rgb(var(--color-muted) / 0.8)" : "rgb(var(--color-muted) / 0.4)" }} className="truncate">{session.speaker.split(",")[0]}</p>
                  </div>
                </div>
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
            <div className="rounded-3xl overflow-hidden border border-fbc-border bg-fbc-card/40 backdrop-blur p-6">
              <AgendaComingSoon sessions={combinedPast} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
