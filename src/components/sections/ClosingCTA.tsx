"use client";
import { motion } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function ClosingCTA() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050E1F 0%, #0F1E38 30%, #1167B1 70%, #050E1F 100%)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 8s ease infinite",
      }}
    >
      {/* VS Code grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(56,189,248,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-fbc-blue/30 blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <AnimateOnScroll>
          <motion.h2
            className="font-space font-bold text-4xl md:text-6xl text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Your next level is two days away.
          </motion.h2>
          <p className="text-fbc-muted text-lg md:text-xl mb-10 leading-relaxed">
            Join 600+ Flutter developers in Lagos this October. Bring your curiosity.
            Leave with your next project idea.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="#tickets"
              className="rounded-full px-10 py-4 font-space font-bold text-lg text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:shadow-[0_0_50px_rgba(96,165,250,0.7)]"
            >
              Get Tickets →
            </a>
            <a
              href="#speak"
              className="rounded-full px-10 py-4 font-space font-semibold text-lg border border-fbc-sky/40 text-fbc-sky hover:bg-fbc-sky/10 transition-all"
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
