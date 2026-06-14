"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const SPONSORS = [
  { name: "Flutter",             tier: "platinum" },
  { name: "Google",              tier: "platinum" },
  { name: "Zapp!",               tier: "gold" },
  { name: "Built by Invertase",  tier: "gold" },
  { name: "Codemagic",           tier: "gold" },
  { name: "Native Teams",        tier: "silver" },
  { name: "Cake Wallet",         tier: "silver" },
  { name: "FlutterFlow",         tier: "silver" },
  { name: "aptLearn",            tier: "silver" },
  { name: "Very Good Ventures",  tier: "silver" },
  { name: "GenZ Techies",        tier: "bronze" },
  { name: "Industrial Flutter",  tier: "bronze" },
  { name: "Shuttlers",           tier: "bronze" },
];

const TIER_COLOR: Record<string, string> = {
  platinum: "#E5C07B",
  gold:     "#F0C040",
  silver:   "#94A3B8",
  bronze:   "#B87333",
};

function SponsorCard({ name, tier, fillIdx, myIdx }: {
  name: string; tier: string; fillIdx: number; myIdx: number;
}) {
  const isActive = myIdx === fillIdx;
  const isFilled = myIdx < fillIdx;
  const color    = TIER_COLOR[tier] ?? "#94A3B8";

  return (
    <div className="relative w-36 sm:w-44" style={{ height: 84 }}>
      {/* Dimmed base */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(15,30,56,0.7)",
          border: "1px solid rgba(30,58,95,0.6)",
        }}
      >
        <span className="font-gigasans font-semibold text-sm text-fbc-muted/30 text-center px-3">
          {name}
        </span>
      </div>

      {/* Fill overlay — uses clipPath so it doesn't cause layout reflow */}
      <motion.div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.97)" }}
        animate={{
          clipPath: isFilled
            ? "inset(0% 0 0% 0 round 9999px)"
            : isActive
            ? ["inset(100% 0 0% 0 round 9999px)", "inset(0% 0 0% 0 round 9999px)"]
            : "inset(100% 0 0% 0 round 9999px)",
        }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      >
        <span
          className="font-gigasans font-bold text-sm text-center px-3 leading-tight"
          style={{ color }}
        >
          {name}
        </span>
      </motion.div>
    </div>
  );
}

function YourBrandCard() {
  return (
    <motion.div
      className="relative rounded-full flex items-center justify-center w-36 sm:w-44"
      style={{
        height: 84,
        border: "1.5px dashed rgba(42,157,244,0.4)",
      }}
      animate={{
        borderColor: [
          "rgba(42,157,244,0.2)",
          "rgba(42,157,244,0.7)",
          "rgba(42,157,244,0.2)",
        ],
        boxShadow: [
          "0 0 0 rgba(42,157,244,0)",
          "0 0 16px rgba(42,157,244,0.3)",
          "0 0 0 rgba(42,157,244,0)",
        ],
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-fbc-muted/50 text-sm font-medium">Your Brand</span>
    </motion.div>
  );
}

export default function SponsorsSection() {
  const [fillIdx, setFillIdx] = useState(-1);

  /* Slower cycle — 3000ms per sponsor */
  useEffect(() => {
    const id = setInterval(() => {
      setFillIdx((prev) => {
        if (prev >= SPONSORS.length - 1) return -1;
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="sponsors" className="relative py-16 sm:py-24 md:py-32 bg-fbc-dark overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white mb-2 text-center">
            FlutterBytes sponsors
          </h2>
          <p className="text-fbc-muted text-sm mb-12 text-center max-w-xl mx-auto">
            FlutterBytes Conference has been sponsored by some of the top companies in Africa
            and the world — companies that invest in developers because they know it&apos;s the best bet.
          </p>
        </AnimateOnScroll>

        {/* Sponsor grid */}
        <AnimateOnScroll delay={0.1}>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {SPONSORS.map((s, i) => (
              <SponsorCard
                key={s.name}
                name={s.name}
                tier={s.tier}
                fillIdx={fillIdx}
                myIdx={i}
              />
            ))}
            <YourBrandCard />
          </div>
        </AnimateOnScroll>

        {/* Become a sponsor */}
        <AnimateOnScroll delay={0.2}>
          <div className="mt-16 text-center">
            <div className="border-t border-white/[0.05] mb-10" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-fbc-muted/40 mb-4">
              Partner with us
            </p>
            <h3 className="font-gigasans font-bold text-2xl md:text-3xl text-fbc-white mb-3">
              Become a sponsor
            </h3>
            <p className="text-fbc-muted text-sm max-w-sm mx-auto leading-relaxed mb-7">
              Reach 600+ Flutter engineers, founders and tech leaders at Africa&apos;s premier mobile conference.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:sponsors@flutterbytes.ng"
                className="rounded-full px-6 py-2.5 font-gigasans font-semibold text-sm text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_18px_rgba(42,157,244,0.4)] inline-flex items-center justify-center gap-2"
              >
                <Mail size={14} /> Send us a mail →
              </a>
              <a
                href="/sponsors"
                className="rounded-full px-6 py-2.5 font-gigasans font-semibold text-sm border border-fbc-sky/30 text-fbc-sky hover:bg-fbc-sky/10 transition-all inline-flex items-center justify-center gap-2"
              >
                View sponsorship packages →
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
