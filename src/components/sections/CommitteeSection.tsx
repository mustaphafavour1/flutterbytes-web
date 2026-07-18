"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { CommitteeMember } from "@/data/fallback-committee";
import { fallbackCommittee } from "@/data/fallback-committee";

interface Props {
  members: CommitteeMember[];
}

type Pos = { x: number; y: number; r: number };

/* Desktop layout — wide 1000×600 web */
const DESKTOP = {
  w: 1000,
  h: 600,
  maxScale: 1,
  stackX: 500,
  stackY: 300,
  positions: [
    { x: 500, y: 200, r: 68 }, { x: 280, y: 360, r: 68 }, { x: 720, y: 360, r: 68 },
    { x: 390, y: 90, r: 52 }, { x: 610, y: 90, r: 52 }, { x: 155, y: 230, r: 52 },
    { x: 845, y: 230, r: 52 }, { x: 500, y: 490, r: 52 }, { x: 100, y: 430, r: 38 },
    { x: 285, y: 535, r: 38 }, { x: 715, y: 535, r: 38 }, { x: 900, y: 430, r: 38 },
    { x: 90, y: 120, r: 38 }, { x: 910, y: 120, r: 38 }, { x: 375, y: 455, r: 38 },
    { x: 625, y: 455, r: 38 }, { x: 185, y: 310, r: 38 }, { x: 815, y: 310, r: 38 },
  ] as Pos[],
  connections: [
    [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 6], [1, 7], [2, 7],
    [3, 5], [4, 6], [5, 8], [5, 12], [6, 11], [6, 13], [7, 9], [7, 10],
    [8, 9], [10, 11], [3, 14], [4, 15], [14, 1], [15, 2], [14, 15],
    [0, 14], [0, 15], [5, 16], [8, 16], [1, 16], [6, 17], [11, 17], [2, 17],
  ] as [number, number][],
};

/* Mobile layout — tall 340×660 web that fits a phone without horizontal scroll */
const MOBILE = {
  w: 340,
  h: 660,
  maxScale: 1.2,
  stackX: 170,
  stackY: 330,
  positions: [
    { x: 168, y: 82, r: 50 }, { x: 76, y: 190, r: 46 }, { x: 264, y: 178, r: 46 },
    { x: 174, y: 278, r: 35 }, { x: 58, y: 296, r: 33 }, { x: 282, y: 290, r: 33 },
    { x: 138, y: 372, r: 31 }, { x: 254, y: 382, r: 31 }, { x: 64, y: 410, r: 31 },
    { x: 200, y: 468, r: 31 }, { x: 300, y: 480, r: 28 }, { x: 110, y: 532, r: 28 },
    { x: 224, y: 574, r: 28 },
  ] as Pos[],
  connections: [
    [0, 1], [0, 2], [0, 3], [1, 4], [2, 5], [1, 3], [2, 3], [3, 6], [3, 7],
    [4, 8], [6, 8], [5, 7], [6, 9], [7, 9], [7, 10], [8, 11], [9, 11],
    [9, 12], [10, 12], [11, 12], [6, 7], [9, 10],
  ] as [number, number][],
};

export default function CommitteeSection({ members }: Props) {
  const data = members.length > 0 ? members : fallbackCommittee;

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const layout = mounted && isMobile ? MOBILE : DESKTOP;
  const displayMembers = data.slice(0, layout.positions.length);

  const [inView, setInView] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const markFailed = (name: string) => setFailed((prev) => new Set(prev).add(name));
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Fit the web to the available width (never overflows -> no horizontal scroll) */
  const fitRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: layout.w, scale: 1 });
  useEffect(() => {
    const el = fitRef.current;
    if (!el) return;
    const update = () => {
      const cw = el.clientWidth;
      setBox({ w: cw, scale: Math.min(layout.maxScale, cw / layout.w) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [layout.w, layout.maxScale]);
  const scale = box.scale;
  const offsetLeft = Math.max(0, (box.w - layout.w * scale) / 2);

  /* Position for the floating name label — directly under the active circle */
  const activePos = layout.positions[activeIdx] ?? layout.positions[0];
  const labelLeft = Math.min(Math.max(offsetLeft + activePos.x * scale, 92), Math.max(92, box.w - 92));
  const labelTop = (activePos.y + activePos.r) * scale + 8;

  /* Spread animation trigger */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
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

  return (
    <section ref={sectionRef} id="committee" className="relative py-16 sm:py-24 md:py-32 sec-bg-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white mb-3 text-center">
            The Flutter Bytes
          </h2>
          <p className="font-gigasans font-semibold text-base md:text-lg text-fbc-white/80 mb-3 text-center max-w-2xl mx-auto">
            The people with the highest commits to the FlutterBytes Conferences
          </p>
          <p className="text-fbc-muted text-base mb-14 text-center max-w-xl mx-auto">
            No matter what, AI can&apos;t replace or replicate the efforts of the organising team
          </p>
        </AnimateOnScroll>

        {/* Web of circles — scaled to fit (extra room below for the name label) */}
        <div ref={fitRef} className="relative w-full mx-auto" style={{ height: layout.h * scale + 56 }}>
          <div
            style={{
              position: "absolute",
              left: offsetLeft,
              top: 0,
              width: layout.w,
              height: layout.h,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {/* Connection lines */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${layout.w} ${layout.h}`}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {layout.connections.map(([a, b]) => {
                if (a >= displayMembers.length || b >= displayMembers.length) return null;
                const posA = layout.positions[a];
                const posB = layout.positions[b];
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
              const pos = layout.positions[i];
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
                  initial={{ left: layout.stackX - pos.r, top: layout.stackY - pos.r, opacity: 0 }}
                  animate={
                    inView
                      ? { left: pos.x - pos.r, top: pos.y - pos.r, opacity: 1 }
                      : { left: layout.stackX - pos.r, top: layout.stackY - pos.r, opacity: 0 }
                  }
                  transition={{ duration: 0.9, delay: inView ? i * 0.05 : 0, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => setActiveIdx(i)}
                >
                  {member.photo && !member.photo.includes("ui-avatars") && !failed.has(member.name) ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes={`${diameter}px`}
                      onError={() => markFailed(member.name)}
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
          </div>

          {/* Floating name label — directly under the active person's picture */}
          {activeMember && inView && (
            <motion.div
              key={activeIdx}
              className="absolute z-30 bg-fbc-card/95 backdrop-blur-sm rounded-xl px-3 py-2 border border-fbc-border pointer-events-none text-center"
              style={{ left: labelLeft, top: labelTop, transform: "translateX(-50%)", minWidth: 120, maxWidth: 200 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <p className="text-fbc-white font-semibold text-xs leading-tight">{activeMember.name}</p>
              <p className="text-fbc-muted text-[10px] leading-snug mt-0.5">{activeMember.role}</p>
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <AnimateOnScroll delay={0.15}>
          <div className="flex justify-center mt-8">
            <Link
              href="#volunteer"
              className="rounded-full px-8 py-3.5 font-gigasans font-semibold border border-fbc-sky/40 text-fbc-sky hover:bg-fbc-sky/10 transition-all text-center"
            >
              Apply to volunteer →
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
