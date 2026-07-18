"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";

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
    <section className="relative py-40 overflow-hidden sec-bg-1">

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
                className="rounded-full px-3 py-0.5 text-[10px] font-medium border border-fbc-sky/20 text-fbc-blue/60"
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
              href="https://sessionize.com/flutterbytes-conference-2026/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-10 py-4 font-gigasans font-semibold text-lg border border-fbc-sky/40 text-fbc-blue hover:bg-fbc-sky/10 transition-all"
            >
              Apply to Speak →
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
