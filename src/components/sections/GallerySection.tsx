"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";

/* 4 layout configs — each defines the grid shape for a set */
type Cell = { col: string; row: string; aspect: string };

const LAYOUTS: Cell[][] = [
  // Set 1
  [
    { col: "col-span-2", row: "row-span-2", aspect: "aspect-square" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-[4/3]" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-[4/3]" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-[3/4]" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-[3/4]" },
    { col: "col-span-2", row: "row-span-1", aspect: "aspect-[16/5]" },
  ],
  // Set 2
  [
    { col: "col-span-1", row: "row-span-2", aspect: "aspect-[2/3]" },
    { col: "col-span-2", row: "row-span-1", aspect: "aspect-[16/6]" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-square" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-square" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-square" },
    { col: "col-span-2", row: "row-span-1", aspect: "aspect-[16/6]" },
  ],
  // Set 3
  [
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-[4/3]" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-[4/3]" },
    { col: "col-span-2", row: "row-span-1", aspect: "aspect-[16/6]" },
    { col: "col-span-1", row: "row-span-2", aspect: "aspect-[3/5]" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-[4/3]" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-[4/3]" },
  ],
  // Set 4
  [
    { col: "col-span-2", row: "row-span-1", aspect: "aspect-[16/6]" },
    { col: "col-span-1", row: "row-span-2", aspect: "aspect-[2/3]" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-square" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-square" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-[4/3]" },
    { col: "col-span-1", row: "row-span-1", aspect: "aspect-[4/3]" },
  ],
];

/* Gradient placeholder colours per slot */
const PLACEHOLDERS = [
  "from-blue-900 to-indigo-800",
  "from-indigo-900 to-blue-700",
  "from-cyan-900 to-blue-800",
  "from-fbc-dark to-fbc-card",
  "from-blue-800 to-cyan-900",
  "from-slate-800 to-blue-900",
];

/* A single photo cell */
function PhotoCell({ src, gradient, colClass, rowClass, aspectClass }: {
  src?: string; gradient: string; colClass: string; rowClass: string; aspectClass: string;
}) {
  return (
    <div className={`${colClass} ${rowClass}`}>
      <div className={`${aspectClass} w-full rounded-3xl overflow-hidden relative`}>
        {src ? (
          <Image src={src} alt="FlutterBytes event" fill className="object-cover" sizes="(max-width:768px) 50vw, 33vw" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
        )}
      </div>
    </div>
  );
}

/* Gallery set */
function GallerySet({ layout, photos }: { layout: Cell[]; photos: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 auto-rows-auto">
      {layout.map((cell, i) => (
        <PhotoCell
          key={i}
          src={photos[i]}
          gradient={PLACEHOLDERS[i % PLACEHOLDERS.length]}
          colClass={cell.col}
          rowClass={cell.row}
          aspectClass={cell.aspect}
        />
      ))}
    </div>
  );
}

export default function GallerySection() {
  const [setIdx, setSetIdx] = useState(0);

  /* Rotate every 5 s */
  useEffect(() => {
    const id = setInterval(() => setSetIdx((i) => (i + 1) % LAYOUTS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const photos: string[] = []; // populated from Sheets in prod

  return (
    <section id="gallery" className="relative py-24 bg-fbc-navy overflow-hidden">
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
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white mb-2">
            What happens at FlutterBytes
          </h2>
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-sky mb-3">
            doesn&apos;t end at FlutterBytes
          </h2>
          <p className="text-fbc-muted text-sm mb-10 max-w-xl">
            The impact of each edition always outlasts the event day, and the evidence abounds.
          </p>
        </AnimateOnScroll>

        {/* Rotating gallery grid */}
        <div className="relative min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={setIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
            >
              <GallerySet layout={LAYOUTS[setIdx]} photos={photos} />
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
