"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Cell = { width: number; circle?: boolean };

/* 4 layout strips — each a horizontal row of compact thumbnails */
const LAYOUTS: Cell[][] = [
  [
    { width: 176, circle: true }, { width: 148 }, { width: 176, circle: true }, { width: 112 },
    { width: 176, circle: true }, { width: 216 }, { width: 176, circle: true }, { width: 112 },
    { width: 176, circle: true }, { width: 148 },
  ],
  [
    { width: 112 }, { width: 176, circle: true }, { width: 176 }, { width: 176, circle: true },
    { width: 148 }, { width: 176, circle: true }, { width: 112 }, { width: 176, circle: true },
    { width: 176 }, { width: 176, circle: true },
  ],
  [
    { width: 176, circle: true }, { width: 176, circle: true }, { width: 176 }, { width: 176, circle: true },
    { width: 176, circle: true }, { width: 148 }, { width: 112 }, { width: 176, circle: true },
    { width: 216 }, { width: 176, circle: true },
  ],
  [
    { width: 216 }, { width: 176, circle: true }, { width: 112 }, { width: 176, circle: true },
    { width: 148 }, { width: 176, circle: true }, { width: 176, circle: true }, { width: 112 },
    { width: 176, circle: true }, { width: 176 },
  ],
];

const GRADIENTS = [
  "from-blue-900 to-indigo-800", "from-indigo-900 to-blue-700", "from-cyan-900 to-blue-800",
  "from-fbc-dark to-fbc-card", "from-blue-800 to-cyan-900", "from-slate-800 to-blue-900",
  "from-indigo-800 to-cyan-900", "from-blue-700 to-slate-800", "from-cyan-800 to-indigo-900",
  "from-slate-900 to-blue-800",
];

function pick(photos: string[], i: number): string | undefined {
  return photos.length ? photos[i % photos.length] : undefined;
}

function PhotoCell({ src, gradient, width, height: heightProp, circle }: {
  src?: string; gradient: string; width: number; height?: number; circle?: boolean;
}) {
  const height = heightProp ?? (circle ? width : 192);
  return (
    <div className="flex-shrink-0 overflow-hidden relative rounded-full" style={{ width, height }}>
      {src ? (
        <Image src={src} alt="FlutterBytes event" fill className="object-cover" sizes={`${width}px`} />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
      )}
    </div>
  );
}

function GalleryStrip({ layout, photos, offset = 0 }: { layout: Cell[]; photos: string[]; offset?: number }) {
  return (
    <div className="flex gap-3 items-center justify-center flex-wrap">
      {layout.map((cell, i) => (
        <PhotoCell key={i} src={pick(photos, offset + i)} gradient={GRADIENTS[i % GRADIENTS.length]} width={cell.width} circle={cell.circle} />
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
                <PhotoCell key={ci} src={pick(photos, ri * layout.length + ci)} gradient={GRADIENTS[ci % GRADIENTS.length]} width={mw} height={mh} circle={cell.circle} />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function PhotosView({ photos }: { photos: string[] }) {
  const [setIdx, setSetIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSetIdx((i) => (i + 1) % LAYOUTS.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      {/* Mobile — 3 horizontal scroll rows */}
      <div className="md:hidden">
        <MobileGallery photos={photos} />
      </div>
      {/* Desktop — rotating strip */}
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
        <div className="flex justify-center gap-2 mt-6">
          {LAYOUTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setSetIdx(i)}
              className={`rounded-full transition-all duration-300 ${i === setIdx ? "w-6 h-1.5 bg-fbc-sky" : "w-1.5 h-1.5 bg-fbc-border"}`}
              aria-label={`Photo set ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function TestimonialsView({ shots }: { shots: string[] }) {
  if (!shots.length) {
    return <p className="text-center text-fbc-muted text-sm py-12">Testimonials coming soon.</p>;
  }
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
      {shots.map((src, i) => (
        <div key={src} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-fbc-border bg-fbc-card">
          <Image
            src={src}
            alt={`FlutterBytes testimonial ${i + 1}`}
            width={500}
            height={700}
            className="w-full h-auto"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}

export default function GalleryShowcase({ images = [], testimonials = [] }: { images?: string[]; testimonials?: string[] }) {
  // Testimonials by default; fall back to photos if none uploaded yet.
  const [tab, setTab] = useState<"testimonials" | "images">(testimonials.length ? "testimonials" : "images");

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 justify-center mb-10" role="tablist" aria-label="Gallery view">
        {([["testimonials", "Testimonials"], ["images", "Photos"]] as const).map(([val, label]) => (
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

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "testimonials" ? <TestimonialsView shots={testimonials} /> : <PhotosView photos={images} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
