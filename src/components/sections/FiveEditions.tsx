"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";

// ─── Data ────────────────────────────────────────────────────────────────────

const editionData = [
  {
    year: "2022",
    theme: "First Edition of the Conference",
    date: "November 2022",
    attendees: "~500 devs showed up",
    above: true,
    isCurrent: false,
  },
  {
    year: "2023",
    theme: "Africa Flutterverse: A Journey of Learning, Sharing, and Growing",
    date: "October 2023",
    attendees: "400+ Devs · 20 Speakers",
    above: false,
    isCurrent: false,
  },
  {
    year: "2024",
    theme: "Beyond Borders: The Global Impact of African Flutter Engineers",
    date: "November 2024",
    attendees: "500+ Devs · 28 Speakers",
    above: true,
    isCurrent: false,
  },
  {
    year: "2025",
    theme: "Flutter: The Framework of the Future",
    date: "Oct 31 – Nov 1, 2025",
    attendees: "600+ Devs · 35 Speakers · 32 Sessions",
    above: false,
    isCurrent: false,
  },
  {
    year: "2026",
    theme: "Becoming Flutter AI Engineer",
    date: "Oct 30–31, 2026",
    attendees: "You're here! 🎉",
    above: true,
    isCurrent: true,
  },
];

// ─── Wave path computation ────────────────────────────────────────────────────

const INTRO_W = 280;
const ITEM_W  = 550;  // wider — ~2 editions per typical viewport
const CY      = 270;
const PEAK_Y  = 140;
const TROUGH_Y = 400;
const FUTURE_W = 380;
const OUTRO_W  = 300;
const TOTAL_W  = INTRO_W + 5 * ITEM_W + FUTURE_W + OUTRO_W; // 3710

const anchors: [number, number][] = [
  [0, CY],
  [INTRO_W, CY],
  ...editionData.map((ed, i): [number, number] => [
    INTRO_W + i * ITEM_W + ITEM_W / 2,
    ed.above ? PEAK_Y : TROUGH_Y,
  ]),
  [INTRO_W + 5 * ITEM_W + 190, CY],
  [TOTAL_W, CY],
];

function buildWavePath(pts: [number, number][]): string {
  let path = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    path += ` C ${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return path;
}

const WAVE_PATH = buildWavePath(anchors);

// ─── Flag icon SVG ───────────────────────────────────────────────────────────

function FlagIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" className="mb-2" aria-hidden="true">
      <rect x="0" y="0" width="2" height="18" rx="1" fill="rgba(148,163,184,0.5)" />
      <path d="M2 1 L20 6.5 L2 12 Z" fill={color} fillOpacity={0.9} />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FiveEditions() {
  const scrollRef    = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number | null>(null);
  const pausedRef    = useRef(false);
  const resumeRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const step = () => {
      if (!pausedRef.current && el) {
        if (el.scrollLeft + el.clientWidth < el.scrollWidth) {
          el.scrollLeft += 0.5;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    const pause = () => {
      pausedRef.current = true;
      if (resumeRef.current) clearTimeout(resumeRef.current);
      resumeRef.current = setTimeout(() => { pausedRef.current = false; }, 2500);
    };

    el.addEventListener("wheel",     pause, { passive: true });
    el.addEventListener("touchmove", pause, { passive: true });
    el.addEventListener("mousedown", pause);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeRef.current) clearTimeout(resumeRef.current);
      el.removeEventListener("wheel",     pause);
      el.removeEventListener("touchmove", pause);
      el.removeEventListener("mousedown", pause);
    };
  }, []);

  return (
    <section id="editions" style={{ backgroundColor: "#0A1628" }} className="py-32">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <AnimateOnScroll>
          <h2 className="font-gigasans font-black text-3xl md:text-5xl text-white leading-tight">
            5 Years, 1 community, Continuous Growth &amp; Impact
          </h2>
          <p className="text-fbc-muted text-base mt-3 max-w-2xl leading-relaxed">
            It started as a simple WhatsApp group for Flutter developers in Nigeria.
            When we announced our first-ever meetup, over 500 people showed up — and from that
            moment, FlutterBytes became something much bigger than any of us imagined.
          </p>
        </AnimateOnScroll>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="relative" style={{ width: TOTAL_W, height: 540 }}>

          {/* SVG Wave */}
          <svg
            className="absolute inset-0"
            width={TOTAL_W}
            height={540}
            style={{ pointerEvents: "none" }}
          >
            {/* Glow layer */}
            <path
              d={WAVE_PATH}
              fill="none"
              stroke="#2A9DF4"
              strokeWidth={4}
              strokeOpacity={0.06}
            />
            {/* Main wave */}
            <path
              id="fbc-wave-path"
              d={WAVE_PATH}
              fill="none"
              stroke="#1E3A5F"
              strokeWidth={1.5}
              strokeOpacity={0.5}
            />
            {/* Animated dot — slower */}
            <circle r={5} fill="#2A9DF4">
              <animateMotion dur="55s" repeatCount="indefinite">
                <mpath href="#fbc-wave-path" />
              </animateMotion>
            </circle>
          </svg>

          {/* Intro caption */}
          <div
            className="absolute"
            style={{
              left: 0, top: 0, width: 280, height: 540,
              display: "flex", alignItems: "center",
              maskImage: "linear-gradient(to right, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0) 100%)",
            }}
          >
            <p
              className="text-fbc-muted text-xs italic leading-relaxed"
              style={{ paddingLeft: 24, paddingRight: 20 }}
            >
              What started as a WhatsApp group for Flutter devs in Nigeria quickly
              turned into something none of us expected...
            </p>
          </div>

          {/* Edition milestones */}
          {editionData.map((ed, i) => {
            const cx       = INTRO_W + i * ITEM_W + ITEM_W / 2;
            const anchorY  = ed.above ? PEAK_Y : TROUGH_Y;
            const flagLeft = cx - 120;
            const isAbove  = ed.above;

            const flagTop    = isAbove ? 20 : 330;
            const poleTop    = isAbove ? 218 : anchorY;
            const poleBottom = isAbove ? anchorY : 330;
            const poleHeight = Math.abs(poleBottom - poleTop);

            const flagBg     = ed.isCurrent ? "rgba(42,157,244,0.15)" : "rgba(15,30,56,0.85)";
            const flagBorder = ed.isCurrent ? "1px solid rgba(42,157,244,0.4)" : "1px solid rgba(30,58,95,0.5)";
            const yearColor  = ed.isCurrent ? "#2A9DF4" : "rgba(148,163,184,0.35)";
            const flagColor  = ed.isCurrent ? "#2A9DF4" : "#1E3A5F";
            const dotFill    = ed.isCurrent ? "#2A9DF4" : "#0A1628";
            const dotBorder  = ed.isCurrent ? "#2A9DF4" : "#1E3A5F";
            const transformOrigin = isAbove ? "top center" : "bottom center";

            return (
              <div key={ed.year}>
                {/* Flag card — plain rounded rectangle */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    left: flagLeft,
                    top: flagTop,
                    width: 240,
                    background: flagBg,
                    border: flagBorder,
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    padding: "18px 20px",
                    borderRadius: 16,
                    transformOrigin,
                  }}
                >
                  <FlagIcon color={flagColor} />
                  <div className="font-gigasans font-black text-4xl leading-none" style={{ color: yearColor }}>
                    {ed.year}
                  </div>
                  <div className="text-white/80 leading-snug mt-2" style={{ fontSize: 11 }}>
                    {ed.theme}
                  </div>
                  <div className="my-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />
                  <div className="text-fbc-muted" style={{ fontSize: 10, opacity: 0.5 }}>
                    {ed.date}
                    <br />
                    {ed.attendees}
                  </div>
                </motion.div>

                {/* Pole */}
                <div
                  style={{
                    position: "absolute",
                    left: cx,
                    top: poleTop,
                    width: 1,
                    height: poleHeight,
                    background: "rgba(30,58,95,0.6)",
                  }}
                />

                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: cx - 6,
                    top: anchorY - 6,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: dotFill,
                    border: `2px solid ${dotBorder}`,
                    boxShadow: ed.isCurrent ? "0 0 8px rgba(42,157,244,0.6)" : "none",
                  }}
                />
              </div>
            );
          })}

          {/* Future section */}
          <div
            className="absolute"
            style={{
              left: INTRO_W + 5 * ITEM_W,
              top: 0,
              width: FUTURE_W,
              height: 540,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 32,
              maskImage: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: CY,
                left: 0,
                right: 0,
                height: 1,
                background: "linear-gradient(to right, rgba(30,58,95,0.5), rgba(30,58,95,0))",
              }}
            />
            <p className="italic" style={{ fontSize: 11, color: "rgba(148,163,184,0.2)", marginBottom: 10, position: "relative" }}>
              The story continues...
            </p>
            <div className="flex items-center gap-3" style={{ position: "relative" }}>
              {["2027", "2028", "2029", "2030+"].map((yr, idx) => (
                <span
                  key={yr}
                  style={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    color: `rgba(148,163,184,${Math.max(0.05, 0.3 - idx * 0.07)})`,
                  }}
                >
                  {yr}{idx < 3 && <span style={{ marginLeft: 6, opacity: 0.3 }}>→</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Outro caption */}
          <div
            className="absolute"
            style={{
              left: INTRO_W + 5 * ITEM_W + FUTURE_W,
              top: 0,
              width: OUTRO_W,
              height: 540,
              display: "flex",
              alignItems: "center",
              maskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 40%)",
              WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 40%)",
            }}
          >
            <p className="text-fbc-muted text-xs italic leading-relaxed" style={{ paddingLeft: 20, paddingRight: 24 }}>
              The community keeps shipping. The next chapter is yours.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
