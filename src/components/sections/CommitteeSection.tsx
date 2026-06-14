"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { CommitteeMember } from "@/data/fallback-committee";
import { fallbackCommittee } from "@/data/fallback-committee";

interface Props {
  members: CommitteeMember[];
}

/* Bigger circles, 1000×600 canvas */
const POSITIONS = [
  // Large (r=68): index 0-2
  { x: 500, y: 200, r: 68 },
  { x: 280, y: 360, r: 68 },
  { x: 720, y: 360, r: 68 },
  // Medium (r=52): index 3-7
  { x: 390, y: 90,  r: 52 },
  { x: 610, y: 90,  r: 52 },
  { x: 155, y: 230, r: 52 },
  { x: 845, y: 230, r: 52 },
  { x: 500, y: 490, r: 52 },
  // Small (r=38): index 8-17
  { x: 100, y: 430, r: 38 },
  { x: 285, y: 535, r: 38 },
  { x: 715, y: 535, r: 38 },
  { x: 900, y: 430, r: 38 },
  { x: 90,  y: 120, r: 38 },
  { x: 910, y: 120, r: 38 },
  { x: 375, y: 455, r: 38 },
  { x: 625, y: 455, r: 38 },
  { x: 185, y: 310, r: 38 },
  { x: 815, y: 310, r: 38 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 6], [1, 7], [2, 7],
  [3, 5], [4, 6], [5, 8], [5, 12], [6, 11], [6, 13], [7, 9], [7, 10],
  [8, 9], [10, 11], [3, 14], [4, 15], [14, 1], [15, 2], [14, 15],
  [0, 14], [0, 15],
  [5, 16], [8, 16], [1, 16], [6, 17], [11, 17], [2, 17],
];

/* Center of the canvas for the stacked starting position */
const STACK_X = 500;
const STACK_Y = 300;

export default function CommitteeSection({ members }: Props) {
  const data           = members.length > 0 ? members : fallbackCommittee;
  const displayMembers = data.slice(0, POSITIONS.length);

  const [inView, setInView]       = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef              = useRef<HTMLDivElement>(null);
  const intervalRef               = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Intersection observer — trigger spread animation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* Auto-cycle active member */
  useEffect(() => {
    if (hoveredIdx !== null) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setActiveIdx(hoveredIdx);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % displayMembers.length);
    }, 2000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [hoveredIdx, displayMembers.length]);

  const activeMember = displayMembers[activeIdx];
  const activePos    = POSITIONS[activeIdx];

  const getLabelStyle = (): React.CSSProperties => {
    if (!activePos) return {};
    const isRight  = activePos.x > 500;
    const isBottom = activePos.y > 380;
    const offset   = activePos.r + 14;
    const style: React.CSSProperties = { position: "absolute" };
    if (isRight) {
      style.right = 1000 - activePos.x + offset;
    } else {
      style.left = activePos.x + offset;
    }
    if (isBottom) {
      style.bottom = 600 - activePos.y + activePos.r;
    } else {
      style.top = activePos.y + activePos.r + 4;
    }
    return style;
  };

  return (
    <section id="committee" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-white mb-3 text-center">
            The Flutter Bytes
          </h2>
          <p className="font-gigasans font-semibold text-base md:text-lg text-fbc-white/80 mb-3 text-center max-w-2xl mx-auto">
            The people with the highest commits to the FlutterBytes Conferences
          </p>
          <p className="text-fbc-muted text-base mb-14 text-center max-w-xl mx-auto">
            No matter what, AI can&apos;t replace or replicate the efforts of the organising team
          </p>
        </AnimateOnScroll>

        {/* Web of circles */}
        <div className="overflow-x-auto mx-auto">
        <div ref={containerRef} className="mx-auto overflow-x-auto" style={{ maxWidth: 1000 }}>
          <div className="relative mx-auto" style={{ width: 1000, height: 600 }}>
            {/* Connection lines — fade in after spread */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 600"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {CONNECTIONS.map(([a, b]) => {
                if (a >= displayMembers.length || b >= displayMembers.length) return null;
                const posA     = POSITIONS[a];
                const posB     = POSITIONS[b];
                const isActive = a === activeIdx || b === activeIdx;
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={posA.x} y1={posA.y}
                    x2={posB.x} y2={posB.y}
                    stroke={isActive ? "rgba(56,189,248,0.35)" : "rgba(30,58,95,0.6)"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                  />
                );
              })}
            </motion.svg>

            {/* Circles */}
            {displayMembers.map((member, i) => {
              const pos      = POSITIONS[i];
              const isActive = i === activeIdx;
              const diameter = pos.r * 2;
              const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
              const fontSize = pos.r > 60 ? 22 : pos.r > 45 ? 18 : 14;

              return (
                <motion.div
                  key={member.name}
                  className="absolute rounded-full overflow-hidden cursor-pointer bg-fbc-card"
                  style={{
                    width: diameter,
                    height: diameter,
                    border: isActive ? "2px solid #38BDF8" : "2px solid rgba(30,58,95,0.8)",
                    boxShadow: isActive ? "0 0 20px rgba(42,157,244,0.5)" : "none",
                    zIndex: isActive ? 20 : 10,
                  }}
                  initial={{ left: STACK_X - pos.r, top: STACK_Y - pos.r, opacity: 0 }}
                  animate={
                    inView
                      ? { left: pos.x - pos.r, top: pos.y - pos.r, opacity: 1 }
                      : { left: STACK_X - pos.r, top: STACK_Y - pos.r, opacity: 0 }
                  }
                  transition={{
                    duration: 0.9,
                    delay: inView ? i * 0.055 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => setActiveIdx(i)}
                >
                  {member.photo && !member.photo.includes("ui-avatars") ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes={`${diameter}px`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-fbc-card">
                      <span className="font-bold text-fbc-sky/70" style={{ fontSize }}>
                        {initials}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Floating label for active member */}
            <AnimatePresence mode="wait">
              {activeMember && inView && (
                <motion.div
                  key={activeIdx}
                  className="absolute z-30 bg-fbc-card/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-fbc-border pointer-events-none"
                  style={{ ...getLabelStyle(), minWidth: 120, maxWidth: 200 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="text-white font-semibold text-xs leading-tight">{activeMember.name}</p>
                  <p className="text-fbc-muted text-[10px] leading-snug mt-0.5">{activeMember.role}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        </div>

        {/* CTA buttons */}
        <AnimateOnScroll delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="#volunteer"
              className="rounded-full px-8 py-3.5 font-gigasans font-semibold border border-fbc-sky/40 text-fbc-sky hover:bg-fbc-sky/10 transition-all text-center"
            >
              Apply to volunteer →
            </Link>
            <Link
              href="/about#committee"
              className="rounded-full px-8 py-3.5 font-gigasans font-semibold text-white bg-fbc-blue hover:opacity-90 transition-all shadow-[0_0_20px_rgba(42,157,244,0.4)] text-center"
            >
              See full committee →
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
