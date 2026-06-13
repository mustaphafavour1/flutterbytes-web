"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";

type Cell = { width: number; circle?: boolean };

/* 4 layout strips — each defines a horizontal row of compact thumbnails */
const LAYOUTS: Cell[][] = [
  [
    { width: 64, circle: true },
    { width: 128 },
    { width: 64, circle: true },
    { width: 96 },
    { width: 64, circle: true },
    { width: 192 },
    { width: 64, circle: true },
    { width: 96 },
    { width: 64, circle: true },
    { width: 128 },
  ],
  [
    { width: 96 },
    { width: 64, circle: true },
    { width: 160 },
    { width: 64, circle: true },
    { width: 128 },
    { width: 64, circle: true },
    { width: 96 },
    { width: 64, circle: true },
    { width: 160 },
    { width: 64, circle: true },
  ],
  [
    { width: 64, circle: true },
    { width: 64, circle: true },
    { width: 160 },
    { width: 64, circle: true },
    { width: 64, circle: true },
    { width: 128 },
    { width: 96 },
    { width: 64, circle: true },
    { width: 192 },
    { width: 64, circle: true },
  ],
  [
    { width: 192 },
    { width: 64, circle: true },
    { width: 96 },
    { width: 64, circle: true },
    { width: 128 },
    { width: 64, circle: true },
    { width: 64, circle: true },
    { width: 96 },
    { width: 64, circle: true },
    { width: 160 },
  ],
];

const GRADIENTS = [
  "from-blue-900 to-indigo-800",
  "from-indigo-900 to-blue-700",
  "from-cyan-900 to-blue-800",
  "from-fbc-dark to-fbc-card",
  "from-blue-800 to-cyan-900",
  "from-slate-800 to-blue-900",
  "from-indigo-800 to-cyan-900",
  "from-blue-700 to-slate-800",
  "from-cyan-800 to-indigo-900",
  "from-slate-900 to-blue-800",
];

function PhotoCell({ src, gradient, width, circle }: {
  src?: string; gradient: string; width: number; circle?: boolean;
}) {
  return (
    <div
      className={`flex-shrink-0 overflow-hidden relative ${circle ? "rounded-full" : "rounded-2xl"}`}
      style={{ width, height: 64 }}
    >
      {src ? (
        <Image src={src} alt="FlutterBytes event" fill className="object-cover" sizes={`${width}px`} />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
      )}
    </div>
  );
}

function GalleryStrip({ layout, photos }: { layout: Cell[]; photos: string[] }) {
  return (
    <div className="flex gap-3 items-center justify-center flex-wrap">
      {layout.map((cell, i) => (
        <PhotoCell
          key={i}
          src={photos[i]}
          gradient={GRADIENTS[i % GRADIENTS.length]}
          width={cell.width}
          circle={cell.circle}
        />
      ))}
    </div>
  );
}

export default function GallerySection() {
  const [setIdx, setSetIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSetIdx((i) => (i + 1) % LAYOUTS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const photos: string[] = [];

  return (
    <section id="gallery" className="relative py-32 bg-fbc-navy overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(42,157,244,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white mb-2 text-center">
            What happens at FlutterBytes
          </h2>
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-sky mb-3 text-center">
            doesn&apos;t end at FlutterBytes
          </h2>
          <p className="text-fbc-muted text-sm mb-10 text-center max-w-xl mx-auto">
            The impact of each edition always outlasts the event day, and the evidence abounds.
          </p>
        </AnimateOnScroll>

        {/* Rotating gallery strip */}
        <div className="relative" style={{ minHeight: 80 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={setIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <GalleryStrip layout={LAYOUTS[setIdx]} photos={photos} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Set indicator dots */}
        <div className="flex justify-center gap-2 mt-6 mb-8">
          {LAYOUTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setSetIdx(i)}
              className={`rounded-full transition-all duration-300 ${
                i === setIdx ? "w-6 h-1.5 bg-fbc-sky" : "w-1.5 h-1.5 bg-fbc-border"
              }`}
              aria-label={`Photo set ${i + 1}`}
            />
          ))}
        </div>

        <AnimateOnScroll delay={0.1}>
          <div className="text-center">
            <Link
              href="#"
              className="rounded-full px-7 py-3 font-gigasans font-semibold text-sm border border-fbc-sky/30 text-fbc-sky hover:bg-fbc-sky/10 transition-all inline-flex items-center gap-2"
            >
              See full photo wall →
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
