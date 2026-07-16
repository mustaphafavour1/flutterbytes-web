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
    { width: 176, circle: true },
    { width: 148 },
    { width: 176, circle: true },
    { width: 112 },
    { width: 176, circle: true },
    { width: 216 },
    { width: 176, circle: true },
    { width: 112 },
    { width: 176, circle: true },
    { width: 148 },
  ],
  [
    { width: 112 },
    { width: 176, circle: true },
    { width: 176 },
    { width: 176, circle: true },
    { width: 148 },
    { width: 176, circle: true },
    { width: 112 },
    { width: 176, circle: true },
    { width: 176 },
    { width: 176, circle: true },
  ],
  [
    { width: 176, circle: true },
    { width: 176, circle: true },
    { width: 176 },
    { width: 176, circle: true },
    { width: 176, circle: true },
    { width: 148 },
    { width: 112 },
    { width: 176, circle: true },
    { width: 216 },
    { width: 176, circle: true },
  ],
  [
    { width: 216 },
    { width: 176, circle: true },
    { width: 112 },
    { width: 176, circle: true },
    { width: 148 },
    { width: 176, circle: true },
    { width: 176, circle: true },
    { width: 112 },
    { width: 176, circle: true },
    { width: 176 },
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

function PhotoCell({ src, gradient, width, height: heightProp, circle }: {
  src?: string; gradient: string; width: number; height?: number; circle?: boolean;
}) {
  const height = heightProp ?? (circle ? width : 192);
  return (
    <div
      className="flex-shrink-0 overflow-hidden relative rounded-full"
      style={{ width, height }}
    >
      {src ? (
        <Image src={src} alt="FlutterBytes event" fill className="object-cover" sizes={`${width}px`} />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
      )}
    </div>
  );
}

function pick(photos: string[], i: number): string | undefined {
  return photos.length ? photos[i % photos.length] : undefined;
}

function GalleryStrip({ layout, photos, offset = 0 }: { layout: Cell[]; photos: string[]; offset?: number }) {
  return (
    <div className="flex gap-3 items-center justify-center flex-wrap">
      {layout.map((cell, i) => (
        <PhotoCell
          key={i}
          src={pick(photos, offset + i)}
          gradient={GRADIENTS[i % GRADIENTS.length]}
          width={cell.width}
          circle={cell.circle}
        />
      ))}
    </div>
  );
}

const MOBILE_SCALE = 0.55;

function MobileGallery({ photos }: { photos: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      {LAYOUTS.slice(0, 3).map((layout, ri) => (
        <div key={ri} className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 items-center px-4" style={{ minWidth: "max-content" }}>
            {layout.map((cell, ci) => {
              const mw = Math.round(cell.width * MOBILE_SCALE);
              const mh = cell.circle ? mw : Math.round(192 * MOBILE_SCALE);
              return (
                <PhotoCell
                  key={ci}
                  src={pick(photos, ri * layout.length + ci)}
                  gradient={GRADIENTS[ci % GRADIENTS.length]}
                  width={mw}
                  height={mh}
                  circle={cell.circle}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GallerySection({ photos = [] }: { photos?: string[] }) {
  const [setIdx, setSetIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSetIdx((i) => (i + 1) % LAYOUTS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="gallery" className="relative py-16 sm:py-24 md:py-32 bg-fbc-navy overflow-hidden">
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

        {/* Mobile gallery — 3 horizontal scroll rows */}
        <div className="md:hidden mb-8">
          <MobileGallery photos={photos} />
        </div>

        {/* Desktop gallery — rotating single strip */}
        <div className="hidden md:block">
          <div className="relative overflow-hidden" style={{ minHeight: 200 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={setIdx}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <GalleryStrip layout={LAYOUTS[setIdx]} photos={photos} offset={setIdx * LAYOUTS[setIdx].length} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Set indicator dots — desktop only */}
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
        </div>

        <AnimateOnScroll delay={0.1}>
          <div className="text-center">
            <Link
              href="/gallery"
              className="rounded-full px-7 py-3 font-gigasans font-semibold text-sm border border-fbc-sky/30 text-fbc-sky hover:bg-fbc-sky/10 transition-all inline-flex items-center gap-2"
            >
              See full gallery →
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
