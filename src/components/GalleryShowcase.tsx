"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ResponsiveImage } from "@/lib/gallery-photos";

/* One full-width combined image, with separate desktop / mobile versions. */
function ResponsiveShot({ img, caption }: { img: ResponsiveImage; caption?: boolean }) {
  const desktop = img.desktop ?? img.mobile ?? "";
  const mobile = img.mobile ?? img.desktop ?? "";
  return (
    <div className="w-full">
      {caption && (
        <p className="text-fbc-sky/80 font-gigasans font-semibold text-sm mb-2 text-center">{img.label}</p>
      )}
      <div className="w-full overflow-hidden rounded-2xl border border-fbc-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={desktop} alt={`FlutterBytes ${img.label}`} className="hidden md:block w-full h-auto" loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mobile} alt={`FlutterBytes ${img.label}`} className="md:hidden w-full h-auto" loading="lazy" />
      </div>
    </div>
  );
}

function Stack({ items, caption }: { items: ResponsiveImage[]; caption?: boolean }) {
  if (!items.length) {
    return <p className="text-center text-fbc-muted text-sm py-12">Coming soon.</p>;
  }
  return (
    <div className="flex flex-col gap-8">
      {items.map((it) => (
        <ResponsiveShot key={it.label} img={it} caption={caption} />
      ))}
    </div>
  );
}

export default function GalleryShowcase({ years = [], testimonials = [] }: { years?: ResponsiveImage[]; testimonials?: ResponsiveImage[] }) {
  // Testimonials by default; fall back to photos when no testimonials uploaded yet.
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
          {tab === "testimonials" ? <Stack items={testimonials} /> : <Stack items={years} caption />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
