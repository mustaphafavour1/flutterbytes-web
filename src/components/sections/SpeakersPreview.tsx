"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Speaker } from "@/data/fallback-speakers";

interface Props {
  speakers: Speaker[];
  pastSpeakers: Speaker[];
}

const SLOT = 8; // speakers per wheel set

/* ── Spinning wheel ── */
function SpeakerWheel({ speakers }: { speakers: Speaker[] }) {
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [activeSlot, setActiveSlot]   = useState(0);
  const [setIdx, setSetIdx]           = useState(0);
  const [wheelDeg, setWheelDeg]       = useState(0);

  const totalSets   = Math.ceil(speakers.length / SLOT);
  const currentSet  = Array.from({ length: SLOT }, (_, i) =>
    speakers[(setIdx * SLOT + i) % speakers.length]
  );
  const displayIdx  = hoveredSlot ?? activeSlot;
  const active      = currentSet[displayIdx];

  /* auto-cycle */
  useEffect(() => {
    if (hoveredSlot !== null) return;
    const id = setInterval(() => {
      setActiveSlot((prev) => {
        const next = (prev + 1) % SLOT;
        if (next === 0) {
          setWheelDeg((d) => d - 360);
          setSetIdx((s) => (s + 1) % totalSets);
        }
        return next;
      });
    }, 2500);
    return () => clearInterval(id);
  }, [hoveredSlot, totalSets]);

  /* geometry */
  const BIG_R   = 240; // outer circle radius
  const SMALL_R = 42;  // speaker avatar radius
  const ORBIT_R = BIG_R - SMALL_R - 6; // center of avatars
  const SIZE    = BIG_R * 2;

  return (
    <div className="flex items-center justify-center w-full" style={{ minHeight: "min(90vh,640px)" }}>
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(30,58,95,0.5)" }}
        />
        {/* Inner ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: SMALL_R + 10,
            border: "1px solid rgba(30,58,95,0.25)",
          }}
        />

        {/* Rotating wheel */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: wheelDeg }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          {currentSet.map((speaker, i) => {
            if (!speaker) return null;
            const angle   = (i / SLOT) * 2 * Math.PI - Math.PI / 2;
            const cx      = BIG_R + ORBIT_R * Math.cos(angle) - SMALL_R;
            const cy      = BIG_R + ORBIT_R * Math.sin(angle) - SMALL_R;
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
                  boxShadow: isActive ? "0 0 18px rgba(42,157,244,0.55)" : "none",
                  /* counter-rotate so avatars stay upright as wheel spins */
                  rotate: -wheelDeg + "deg",
                }}
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredSlot(i)}
                onMouseLeave={() => setHoveredSlot(null)}
              >
                {speaker.photo && !speaker.photo.includes("ui-avatars") ? (
                  <Image
                    src={speaker.photo}
                    alt={speaker.name}
                    fill
                    className="object-cover"
                    sizes={`${SMALL_R * 2}px`}
                  />
                ) : (
                  <div className="w-full h-full bg-fbc-card flex items-center justify-center">
                    <span className="font-gigasans font-bold text-sm text-fbc-sky/70">{initials}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Centre info */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-14">
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
                {/* active indicator line */}
                <div
                  className="w-6 h-0.5 mx-auto mb-3 rounded-full"
                  style={{ background: "#2A9DF4" }}
                />
                <p className="font-gigasans font-bold text-fbc-white text-lg leading-tight mb-1">
                  {active.name}
                </p>
                <p className="text-fbc-muted text-xs">{active.role}</p>
                <p className="text-fbc-blue text-xs font-medium mt-0.5">{active.company}</p>
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
  );
}

export default function SpeakersPreview({ speakers, pastSpeakers }: Props) {
  const [tab, setTab] = useState<"2026" | "past">("2026");
  const allPast = pastSpeakers.length > 0 ? pastSpeakers : speakers;

  return (
    <section id="speakers" className="relative min-h-screen flex flex-col bg-fbc-navy overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(42,157,244,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6 w-full">
        <AnimateOnScroll>
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white mb-2">
            FlutterBytes Speakers so far…
          </h2>
          <p className="text-fbc-muted text-sm mb-8 max-w-xl">
            Engineers, founders, and Flutter enthusiasts who&apos;ve taken the stage across all editions.
          </p>
        </AnimateOnScroll>

        {/* Tabs */}
        <div className="flex gap-2 mb-4" role="tablist">
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
              className="flex flex-col items-center text-center max-w-sm py-20"
            >
              <div className="text-5xl mb-5">🚀</div>
              <h3 className="font-gigasans font-bold text-fbc-white text-2xl mb-3">
                Speakers coming soon
              </h3>
              <p className="text-fbc-muted text-sm leading-relaxed mb-8">
                We&apos;re finalising an incredible lineup of speakers for the 5th edition. Stay tuned.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <a
                  href="#"
                  className="rounded-full px-6 py-3 font-gigasans font-semibold text-sm text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_18px_rgba(42,157,244,0.4)]"
                >
                  Apply to Speak →
                </a>
                <button
                  onClick={() => setTab("past")}
                  className="rounded-full px-6 py-3 font-gigasans font-semibold text-sm border border-fbc-sky/30 text-fbc-sky hover:bg-fbc-sky/10 transition-all"
                >
                  See past speakers
                </button>
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

      <div className="relative z-10 pb-12 text-center">
        <Link
          href="/speakers"
          className="rounded-full px-7 py-3 font-gigasans font-semibold text-sm border border-fbc-sky/30 text-fbc-sky hover:bg-fbc-sky/10 transition-all inline-flex items-center gap-2"
        >
          See all speakers →
        </Link>
      </div>
    </section>
  );
}
