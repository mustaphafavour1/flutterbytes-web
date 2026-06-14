"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { AgendaSession } from "@/data/fallback-agenda";

interface Props {
  friday: AgendaSession[];
  saturday: AgendaSession[];
  agendaVisible: boolean;
}

/* ── GitHub-contribution-style agenda grid ── */
function AgendaGrid({ sessions }: { sessions: AgendaSession[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const preview = sessions.slice(0, Math.ceil(sessions.length / 2));
  const ROWS = 4;
  const perRow = Math.ceil(preview.length / ROWS);
  const rows = Array.from({ length: ROWS }, (_, r) =>
    preview.slice(r * perRow, (r + 1) * perRow)
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
                    width: 180,
                    height: 90,
                    border: `1px solid ${isHovered ? "rgba(42,157,244,0.35)" : "rgba(42,157,244,0.08)"}`,
                    background: "rgba(42,157,244,0.07)",
                    transition: "border-color 0.18s",
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="p-2.5 h-full flex flex-col justify-between">
                    <p className="text-fbc-white/80 text-[10px] font-medium leading-snug line-clamp-2">
                      {session.session}
                    </p>
                    {/* Time + hall — always in layout, opacity toggles on hover so speaker stays at bottom */}
                    <div
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.18s",
                        borderTop: "1px solid rgba(42,157,244,0.22)",
                        paddingTop: 4,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-fbc-sky font-semibold" style={{ fontSize: 9 }}>{session.time}</span>
                        <span className="text-fbc-muted" style={{ fontSize: 9 }}>{session.hall}</span>
                      </div>
                    </div>
                    <p className="text-fbc-muted/50 truncate" style={{ fontSize: 9 }}>
                      {session.speaker.split(",")[0]}
                    </p>
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

/* ── Coming-soon version ── */
function AgendaComingSoon({ sessions }: { sessions: AgendaSession[] }) {
  return (
    <div className="relative">
      <div className="pointer-events-none select-none" style={{ filter: "blur(5px)", opacity: 0.25 }}>
        <AgendaGrid sessions={sessions} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-fbc-card/95 backdrop-blur-xl rounded-2xl px-8 py-7 text-center border border-fbc-border max-w-xs shadow-2xl">
          <div className="text-3xl mb-3">🛠️</div>
          <h3 className="font-gigasans font-bold text-fbc-white text-lg mb-2">Agenda in the works</h3>
          <p className="text-fbc-muted text-sm leading-relaxed">
            We&apos;re curating the best sessions for you.<br />Check back soon.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AgendaPreview({ friday, saturday, agendaVisible }: Props) {
  const [tab, setTab] = useState<"past" | "friday" | "saturday">("past");
  const sessions = tab === "friday" ? friday : tab === "saturday" ? saturday : [...friday, ...saturday];

  return (
    <section id="agenda" className="relative py-16 sm:py-24 md:py-32 bg-fbc-dark overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(42,157,244,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white mb-3 text-center">
            What&apos;s on the schedule
          </h2>
          <p className="text-fbc-muted text-sm mb-8 text-center max-w-xl mx-auto leading-relaxed">
            A line up of sessions that will literally equip you to become A Flutter AI engineer.
          </p>
        </AnimateOnScroll>

        {/* Day tabs */}
        <AnimateOnScroll delay={0.1}>
          <div className="flex gap-2 mb-6 justify-center" role="tablist">
            {([
              ["past",     "Past Editions"],
              ["friday",   "Friday, Oct 30"],
              ["saturday", "Saturday, Oct 31"],
            ] as const).map(([val, label]) => (
              <button
                key={val}
                role="tab"
                aria-selected={tab === val}
                onClick={() => setTab(val)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  tab === val
                    ? "bg-fbc-blue text-white shadow-[0_0_14px_rgba(42,157,244,0.4)]"
                    : "bg-fbc-card text-fbc-muted border border-fbc-border hover:text-fbc-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {tab === "past"
                ? <AgendaGrid sessions={sessions} />
                : agendaVisible
                  ? <AgendaGrid sessions={sessions} />
                  : <AgendaComingSoon sessions={sessions} />
              }
            </motion.div>
          </AnimatePresence>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="mt-8 text-center">
            <Link
              href="/agenda"
              className="rounded-full px-7 py-3 font-gigasans font-semibold border border-fbc-sky/30 text-fbc-sky hover:bg-fbc-sky/10 transition-all text-sm inline-flex items-center gap-2"
            >
              View full agenda →
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
