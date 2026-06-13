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

const ELEMENTS: ElementDef[] = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  type: (i % 3 === 0 ? "circle" : "rod") as "circle" | "rod",
  x: 3 + Math.floor((i * 37) % 94),
  size: 8 + (i * 7) % 20,
  delay: (i * 0.18) % 3.5,
  finalYPercent: 55 + (i * 11) % 42,
}));

export default function ClosingCTA() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #050E1F 0%, #0A1628 40%, #0F1E38 70%, #050E1F 100%)",
      }}
    >
      {/* Falling brand pattern elements */}
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
                  stroke="rgba(30,58,95,0.6)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            ) : (
              <svg
                width={el.size * 0.4 + 4}
                height={el.size + 20}
                style={{
                  transform: `rotate(${((el.id * 25) % 140) - 70}deg)`,
                }}
              >
                <rect
                  x="1"
                  y="1"
                  width={el.size * 0.4}
                  height={el.size + 18}
                  rx="6"
                  stroke="rgba(30,58,95,0.6)"
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
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <AnimateOnScroll>
          <motion.h2
            className="font-gigasans font-bold text-4xl md:text-6xl text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Your next level is two days away.
          </motion.h2>
          <p className="text-fbc-muted text-lg md:text-xl mb-10 leading-relaxed">
            Join 600+ Flutter developers in Lagos this October. Bring your
            curiosity. Leave with your next project idea.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
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
          <p className="text-fbc-muted/60 text-sm">
            Free to apply as a speaker or volunteer.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
