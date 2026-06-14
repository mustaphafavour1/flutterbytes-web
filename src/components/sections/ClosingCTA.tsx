"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";

type ElementDef = {
  id: number;
  type: "circle" | "rod";
  x: number;
  size: number;
  delay: number;
  finalYPercent: number;
};

/* 70 elements, denser and filling the lower portion */
const ELEMENTS: ElementDef[] = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  type: (i % 3 === 0 ? "circle" : "rod") as "circle" | "rod",
  x: 1 + Math.floor((i * 23) % 97),
  size: 5 + (i * 5) % 18,
  delay: (i * 0.10) % 2.6,
  finalYPercent: 70 + (i * 7) % 29,
}));

const CHIPS = [
  "Live Workshops",
  "Networking Sessions",
  "Fun!",
  "Photos & Games",
  "Meet Senior Devs",
  "International Attendees",
];

export default function ClosingCTA() {
  return (
    <section
      className="relative py-40 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgb(var(--color-navy)) 0%, rgb(var(--color-dark)) 40%, rgb(var(--color-card)) 70%, rgb(var(--color-navy)) 100%)",
      }}
    >
      {/* Dense outline elements filling the lower portion */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {ELEMENTS.map((el) => (
          <motion.div
            key={el.id}
            className="absolute"
            style={{ left: `${el.x}%`, top: 0 }}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: `${el.finalYPercent}vh`, opacity: 1 }}
            transition={{
              delay: el.delay,
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {el.type === "circle" ? (
              <svg width={el.size * 2} height={el.size * 2}>
                <circle
                  cx={el.size}
                  cy={el.size}
                  r={el.size - 2}
                  stroke="rgba(30,58,95,0.65)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            ) : (
              <svg
                width={Math.round(el.size * 0.8) + 4}
                height={el.size + 30}
                style={{
                  transform: `rotate(${((el.id * 25) % 140) - 70}deg)`,
                }}
              >
                <rect
                  x="1"
                  y="1"
                  width={Math.round(el.size * 0.8)}
                  height={el.size + 28}
                  rx="6"
                  stroke="rgba(30,58,95,0.65)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Pulsing blue dot at top center */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-fbc-blue"
        aria-hidden="true"
        animate={{
          boxShadow: [
            "0 0 0px rgba(42,157,244,0)",
            "0 0 20px rgba(42,157,244,0.8)",
            "0 0 8px rgba(42,157,244,0.3)",
            "0 0 20px rgba(42,157,244,0.8)",
            "0 0 0px rgba(42,157,244,0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <AnimateOnScroll>
          <motion.h2
            className="font-gigasans font-bold text-4xl md:text-6xl text-fbc-white leading-tight mb-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Are you ready for the next level?
          </motion.h2>
          <p className="text-fbc-muted text-sm md:text-base mb-8 leading-relaxed max-w-md mx-auto">
            Join 600+ Flutter Devs this October. Don&apos;t miss out on a rare opportunity for incredible growth.
          </p>

          {/* Activity chips */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-10">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-full px-3 py-0.5 text-[10px] font-medium border border-fbc-sky/20 text-fbc-sky/60"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#tickets"
              className="rounded-full px-10 py-4 font-gigasans font-bold text-lg text-white bg-fbc-blue shadow-[0_0_30px_rgba(42,157,244,0.6)] hover:shadow-[0_0_50px_rgba(42,157,244,0.8)] hover:opacity-90 transition-all"
            >
              Get Tickets →
            </a>
            <a
              href="#speak"
              className="rounded-full px-10 py-4 font-gigasans font-semibold text-lg border border-fbc-sky/40 text-fbc-sky hover:bg-fbc-sky/10 transition-all"
            >
              Apply to Speak →
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
