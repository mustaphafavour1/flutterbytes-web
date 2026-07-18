"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Speaker } from "@/data/fallback-speakers";

interface Props {
  speakers: Speaker[];
  pastSpeakers: Speaker[];
}

const SLOT     = 8;
const INTERVAL = 5000; // ms per slot

/* ── Spinning wheel ── */
function SpeakerWheel({ speakers }: { speakers: Speaker[] }) {
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [activeSlot, setActiveSlot]   = useState(0);
  const [setIdx, setSetIdx]           = useState(0);
  const [wheelDeg, setWheelDeg]       = useState(0);
  const [spinDir, setSpinDir]         = useState<-1 | 1>(-1); // -1=ccw (default), 1=cw
  const [msLeft, setMsLeft]           = useState(INTERVAL);
  const [failed, setFailed]           = useState<Set<string>>(new Set());
  const lastTickRef                   = useRef<number>(Date.now());
  const markFailed = (name: string) => setFailed((prev) => new Set(prev).add(name));

  const totalSets  = Math.ceil(speakers.length / SLOT);
  const currentSet = Array.from({ length: SLOT }, (_, i) =>
    speakers[(setIdx * SLOT + i) % speakers.length]
  );
  const displayIdx = hoveredSlot ?? activeSlot;
  const active     = currentSet[displayIdx];

  /* auto-cycle slots */
  useEffect(() => {
    if (hoveredSlot !== null) return;
    const id = setInterval(() => {
      lastTickRef.current = Date.now();
      setMsLeft(INTERVAL);
      setActiveSlot((prev) => {
        const next = (prev + 1) % SLOT;
        if (next === 0) {
          const extraRevs = Math.floor(Math.random() * 3); // 0-2 bonus revolutions
          setWheelDeg((d) => d + spinDir * (360 + extraRevs * 360));
          setSetIdx((s) => (s + 1) % totalSets);
        } else {
          setWheelDeg((d) => d + spinDir * (360 / SLOT));
        }
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(id);
  }, [hoveredSlot, totalSets, spinDir]);

  /* countdown tick */
  useEffect(() => {
    if (hoveredSlot !== null) return;
    const id = setInterval(() => {
      const elapsed = Date.now() - lastTickRef.current;
      setMsLeft(Math.max(0, INTERVAL - elapsed));
    }, 100);
    return () => clearInterval(id);
  }, [hoveredSlot, activeSlot]);

  /* manual spin */
  const manualSpin = (dir: -1 | 1) => {
    setSpinDir(dir);
    const revs = 1 + Math.floor(Math.random() * 3);
    setWheelDeg((d) => d + dir * revs * 360);
    setSetIdx((s) => (s + 1) % totalSets);
    setActiveSlot(0);
    lastTickRef.current = Date.now();
    setMsLeft(INTERVAL);
  };

  /* geometry — bigger wheel */
  const BIG_R   = 310;
  const SMALL_R = 52;
  const ORBIT_R = BIG_R - SMALL_R - 6;
  const SIZE    = BIG_R * 2;

  const secsLeft = Math.ceil(msLeft / 1000);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6" style={{ minHeight: "min(90vh,680px)", overflow: "hidden" }}>
      <div className="transform scale-[0.55] sm:scale-[0.75] md:scale-90 lg:scale-100 origin-top">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(30,58,95,0.5)" }}
        />
        {/* Inner ring */}
        <div
          className="absolute rounded-full"
          style={{ inset: SMALL_R + 10, border: "1px solid rgba(30,58,95,0.25)" }}
        />

        {/* Rotating wheel */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: wheelDeg }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          {currentSet.map((speaker, i) => {
            if (!speaker) return null;
            const angle    = (i / SLOT) * 2 * Math.PI - Math.PI / 2;
            const cx       = BIG_R + ORBIT_R * Math.cos(angle) - SMALL_R;
            const cy       = BIG_R + ORBIT_R * Math.sin(angle) - SMALL_R;
            const isActive = displayIdx === i;
            const initials = speaker.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

            return (
              <motion.div
                key={`${setIdx}-${i}`}
                className="absolute rounded-full overflow-hidden cursor-pointer border-2"
                style={{
                  width: SMALL_R * 2,
                  height: SMALL_R * 2,
                  left: cx,
                  top: cy,
                  borderColor: isActive ? "#2A9DF4" : "#1E3A5F",
                  boxShadow: isActive ? "0 0 22px rgba(42,157,244,0.55)" : "none",
                  rotate: -wheelDeg + "deg",
                }}
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredSlot(i)}
                onMouseLeave={() => setHoveredSlot(null)}
              >
                {speaker.photo && !speaker.photo.includes("ui-avatars") && !failed.has(speaker.name) ? (
                  <Image
                    src={speaker.photo}
                    alt={speaker.name}
                    fill
                    className="object-cover"
                    sizes={`${SMALL_R * 2}px`}
                    onError={() => markFailed(speaker.name)}
                  />
                ) : (
                  <div className="w-full h-full bg-fbc-card flex items-center justify-center">
                    <span className="font-gigasans font-bold text-sm text-fbc-blue/70">{initials}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Centre info */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-16">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <div className="w-6 h-0.5 mx-auto mb-3 rounded-full" style={{ background: "#2A9DF4" }} />
                <p className="font-gigasans font-bold text-fbc-white text-lg leading-tight mb-1">
                  {active.name}
                </p>
                {active.role && <p className="text-fbc-muted text-xs">{active.role}</p>}
                {active.company && <p className="text-fbc-blue text-xs font-medium mt-0.5">{active.company}</p>}
                {active.tags && active.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3 justify-center">
                    {active.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] rounded-full px-2 py-0.5 border border-fbc-border"
                        style={{ background: "rgba(42,157,244,0.12)", color: "#38BDF8" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>

      {/* Controls + countdown */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          {/* CCW button */}
          <button
            onClick={() => manualSpin(-1)}
            className="w-10 h-10 rounded-full border border-fbc-border text-fbc-muted hover:text-fbc-blue hover:border-fbc-sky/50 transition-all flex items-center justify-center"
            aria-label="Spin counter-clockwise"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>

          <p className="text-fbc-muted/50 text-[11px] text-center" style={{ minWidth: 130 }}>
            {hoveredSlot !== null ? "Hover paused" : `Wheel spins in ${secsLeft}s`}
          </p>

          {/* CW button */}
          <button
            onClick={() => manualSpin(1)}
            className="w-10 h-10 rounded-full border border-fbc-border text-fbc-muted hover:text-fbc-blue hover:border-fbc-sky/50 transition-all flex items-center justify-center"
            aria-label="Spin clockwise"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        {hoveredSlot === null && (
          <div className="w-32 h-0.5 bg-fbc-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-fbc-sky/50 rounded-full"
              style={{ width: `${(1 - msLeft / INTERVAL) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function SpeakersPreview({ speakers, pastSpeakers }: Props) {
  const [tab, setTab] = useState<"2026" | "past">("past");
  const allPast = pastSpeakers.length > 0 ? pastSpeakers : speakers;

  return (
    <section id="speakers" className="relative min-h-screen flex flex-col sec-plain overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(42,157,244,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-6 w-full">
        <AnimateOnScroll>
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white mb-2 text-center">
            FlutterBytes Speakers so far…
          </h2>
          <p className="text-fbc-muted text-sm mb-8 text-center max-w-xl mx-auto">
            Engineers, founders, and Flutter enthusiasts who&apos;ve taken the stage across all editions.
          </p>
        </AnimateOnScroll>

        {/* Tabs */}
        <div className="flex gap-2 mb-12 justify-center" role="tablist">
          {([["2026", "2026 Speakers"], ["past", "Past Editions"]] as const).map(([val, label]) => (
            <button
              key={val}
              role="tab"
              aria-selected={tab === val}
              onClick={() => setTab(val)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                tab === val
                  ? "bg-fbc-blue text-white shadow-[0_0_14px_rgba(42,157,244,0.4)]"
                  : "bg-fbc-card border border-fbc-border text-fbc-muted hover:text-fbc-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pb-12">
        <AnimatePresence mode="wait">
          {tab === "2026" ? (
            <motion.div
              key="2026"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="w-full relative"
            >
              {/* Wheel in background, dimmed */}
              <div className="opacity-30 pointer-events-none select-none">
                <SpeakerWheel speakers={allPast} />
              </div>
              {/* Coming-soon overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-fbc-card/90 backdrop-blur-xl rounded-2xl px-8 py-8 text-center border border-fbc-border max-w-xs shadow-2xl">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="font-gigasans font-bold text-fbc-white text-xl mb-2">
                    Speakers coming soon
                  </h3>
                  <p className="text-fbc-muted text-sm leading-relaxed mb-6">
                    We&apos;re finalising an incredible lineup for the 5th edition. Stay tuned.
                  </p>
                  <a
                    href="https://sessionize.com/flutterbytes-conference-2026/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-6 py-2.5 font-gigasans font-semibold text-sm text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_18px_rgba(42,157,244,0.4)] inline-block"
                  >
                    Apply to Speak →
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="past"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <SpeakerWheel speakers={allPast} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 pb-16 text-center">
        <Link
          href="/speakers"
          className="rounded-full px-7 py-3 font-gigasans font-semibold text-sm border border-fbc-sky/30 text-fbc-blue hover:bg-fbc-sky/10 transition-all inline-flex items-center gap-2"
        >
          See all speakers →
        </Link>
      </div>
    </section>
  );
}
