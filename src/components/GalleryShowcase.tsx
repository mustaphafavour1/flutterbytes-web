"use client";
import { useState, useEffect, useRef } from "react";
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

/* Full-bleed horizontal carousel — one item per view, auto-advancing, swipeable. */
function Carousel({ items, caption }: { items: ResponsiveImage[]; caption?: boolean }) {
  const ordered = items;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const pausedRef = useRef(false);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTo = (i: number) => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  /* Auto-advance every 3s (paused briefly after a manual swipe) */
  useEffect(() => {
    if (ordered.length <= 1) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setIdx((prev) => {
        const next = (prev + 1) % ordered.length;
        const el = scrollRef.current;
        if (el) el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, [ordered.length]);

  /* Pause auto-advance while the visitor is interacting */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const pause = () => {
      pausedRef.current = true;
      if (resumeRef.current) clearTimeout(resumeRef.current);
      resumeRef.current = setTimeout(() => { pausedRef.current = false; }, 4500);
    };
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("wheel", pause, { passive: true });
    el.addEventListener("pointerdown", pause);
    return () => {
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("wheel", pause);
      el.removeEventListener("pointerdown", pause);
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, []);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== idx) setIdx(i);
  };

  if (!ordered.length) {
    return <p className="text-center text-fbc-muted text-sm py-12">Coming soon.</p>;
  }

  return (
    <div style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {ordered.map((y) => (
          <div key={y.label} className="snap-center shrink-0 w-screen px-3 sm:px-6">
            <ResponsiveShot img={y} caption={caption} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {ordered.map((y, i) => (
          <button
            key={y.label}
            onClick={() => { setIdx(i); scrollTo(i); }}
            aria-label={`Show ${y.label}`}
            className={`rounded-full transition-all duration-300 ${i === idx ? "w-6 h-1.5 bg-fbc-sky" : "w-1.5 h-1.5 bg-fbc-border"}`}
          />
        ))}
      </div>
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
          {tab === "testimonials"
            ? <Carousel items={testimonials} />
            : <Carousel items={[...years].reverse()} caption />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
