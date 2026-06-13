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

  /* slow auto-scroll */
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

/* ── Coming-soon version ── */
function AgendaComingSoon({ sessions }: { sessions: AgendaSession[] }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none select-none"
        style={{ filter: "blur(5px)", opacity: 0.25 }}
      >
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
  const [tab, setTab] = useState<"friday" | "saturday">("friday");
  const sessions = tab === "friday" ? friday : saturday;

  return (
    <section id="agenda" className="relative py-24 bg-fbc-dark overflow-hidden">
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
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white mb-2">
            What&apos;s on the schedule
          </h2>
          <p className="text-fbc-muted text-sm mb-8">
            Two days. Thirty-something sessions. Zero excuse to not level up.
          </p>
        </AnimateOnScroll>

        {/* Day tabs */}
        <AnimateOnScroll delay={0.1}>
          <div className="flex gap-2 mb-6" role="tablist">
            {(["friday", "saturday"] as const).map((day) => (
              <button
                key={day}
                role="tab"
                aria-selected={tab === day}
                onClick={() => setTab(day)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  tab === day
                    ? "bg-fbc-blue text-white shadow-[0_0_14px_rgba(42,157,244,0.4)]"
                    : "bg-fbc-card text-fbc-muted border border-fbc-border hover:text-fbc-white"
                }`}
              >
                {day === "friday" ? "Friday, Oct 30" : "Saturday, Oct 31"}
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
              {agendaVisible
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
