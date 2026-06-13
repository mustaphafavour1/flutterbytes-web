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

const POSITIONS = [
  // Large circles (r=52): index 0-2
  { x: 450, y: 180, r: 52 },
  { x: 250, y: 320, r: 52 },
  { x: 650, y: 320, r: 52 },
  // Medium circles (r=40): index 3-7
  { x: 360, y: 80, r: 40 },
  { x: 560, y: 80, r: 40 },
  { x: 150, y: 200, r: 40 },
  { x: 750, y: 200, r: 40 },
  { x: 450, y: 440, r: 40 },
  // Small circles (r=30): index 8+
  { x: 100, y: 380, r: 30 },
  { x: 260, y: 470, r: 30 },
  { x: 640, y: 470, r: 30 },
  { x: 800, y: 380, r: 30 },
  { x: 80, y: 120, r: 30 },
  { x: 820, y: 120, r: 30 },
  { x: 350, y: 380, r: 30 },
  { x: 550, y: 380, r: 30 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 6], [1, 7], [2, 7],
  [3, 5], [4, 6], [5, 8], [5, 12], [6, 11], [6, 13], [7, 9], [7, 10],
  [8, 9], [10, 11], [3, 14], [4, 15], [14, 1], [15, 2], [14, 15],
  [0, 14], [0, 15],
];

export default function CommitteeSection({ members }: Props) {
  const data = members.length > 0 ? members : fallbackCommittee;
  const displayMembers = data.slice(0, POSITIONS.length);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (hoveredIdx !== null) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setActiveIdx(hoveredIdx);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % displayMembers.length);
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hoveredIdx, displayMembers.length]);

  const activeMember = displayMembers[activeIdx];
  const activePos = POSITIONS[activeIdx];

  const getLabelStyle = (): React.CSSProperties => {
    if (!activePos) return {};
    const isRight = activePos.x > 500;
    const isBottom = activePos.y > 400;
    const offset = activePos.r + 12;

    const style: React.CSSProperties = { position: "absolute" };

    if (isRight) {
      style.right = 900 - activePos.x + offset;
    } else {
      style.left = activePos.x + offset;
    }

    if (isBottom) {
      style.bottom = 520 - activePos.y + activePos.r;
    } else {
      style.top = activePos.y + activePos.r + 4;
    }

    return style;
  };

  return (
    <section id="committee" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-white mb-3 max-w-2xl">
            The people with the highest commits to the FlutterBytes Conferences
          </h2>
          <p className="text-fbc-muted text-base mb-14 max-w-xl">
            No matter what, AI can&apos;t replace or replicate the efforts of the organising team
          </p>
        </AnimateOnScroll>

        {/* Web of circles */}
        <div className="mx-auto overflow-x-auto" style={{ maxWidth: 900 }}>
          <div className="relative mx-auto" style={{ width: 900, height: 520 }}>
            {/* SVG connection lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 900 520"
              aria-hidden="true"
            >
              {CONNECTIONS.map(([a, b]) => {
                if (a >= displayMembers.length || b >= displayMembers.length) return null;
                const posA = POSITIONS[a];
                const posB = POSITIONS[b];
                const isActive =
                  a === activeIdx || b === activeIdx;
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={posA.x}
                    y1={posA.y}
                    x2={posB.x}
                    y2={posB.y}
                    stroke={
                      isActive
                        ? "rgba(56,189,248,0.35)"
                        : "rgba(30,58,95,0.6)"
                    }
                    strokeWidth={isActive ? 1.5 : 1}
                    style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                  />
                );
              })}
            </svg>

            {/* Circle overlays */}
            {displayMembers.map((member, i) => {
              const pos = POSITIONS[i];
              const isActive = i === activeIdx;
              const diameter = pos.r * 2;
              const initials = member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              const fontSize = pos.r > 45 ? 20 : pos.r > 35 ? 16 : 13;

              return (
                <motion.div
                  key={member.name}
                  className="absolute rounded-full overflow-hidden cursor-pointer bg-fbc-card"
                  style={{
                    width: diameter,
                    height: diameter,
                    left: pos.x - pos.r,
                    top: pos.y - pos.r,
                    border: isActive
                      ? "2px solid #38BDF8"
                      : "2px solid rgba(30,58,95,0.8)",
                    boxShadow: isActive
                      ? "0 0 16px rgba(42,157,244,0.5)"
                      : "none",
                    zIndex: isActive ? 20 : 10,
                  }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
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
                      <span
                        className="font-bold text-fbc-sky/70"
                        style={{ fontSize }}
                      >
                        {initials}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Floating label for active member */}
            <AnimatePresence mode="wait">
              {activeMember && (
                <motion.div
                  key={activeIdx}
                  className="absolute z-30 bg-fbc-card/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-fbc-border pointer-events-none"
                  style={{ ...getLabelStyle(), minWidth: 120, maxWidth: 180 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="text-white font-semibold text-xs leading-tight">
                    {activeMember.name}
                  </p>
                  <p className="text-fbc-muted text-[10px] leading-snug mt-0.5">
                    {activeMember.role}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
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
