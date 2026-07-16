"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { sponsorLogo } from "@/lib/slug";

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

/**
 * Sponsor pill: real logo on top, brand name + tier label underneath.
 * Drop each logo into /public/sponsors/ named `<brand-name>.png`
 * (e.g. flutter.png, built-by-invertase.png). Until a logo is uploaded,
 * an initials monogram shows in its place.
 */
function SponsorCard({ name, tier }: { name: string; tier: string }) {
  const [logoOk, setLogoOk] = useState(true);
  const color     = TIER_COLOR[tier] ?? "#94A3B8";
  const tierLabel = `${tier.charAt(0).toUpperCase()}${tier.slice(1)} Sponsor`;
  const initials  = name.replace(/[^a-zA-Z ]/g, "").split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      className="w-40 sm:w-48 rounded-[32px] bg-fbc-card border border-fbc-border flex flex-col items-center justify-center gap-2.5 px-4 py-5"
      style={{ minHeight: 168 }}
    >
      <div className="h-12 flex items-center justify-center w-full">
        {logoOk ? (
          <Image
            src={sponsorLogo(name)}
            alt={`${name} logo`}
            width={150}
            height={48}
            className="object-contain h-12 w-auto max-w-[85%]"
            onError={() => setLogoOk(false)}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-fbc-navy border border-fbc-border flex items-center justify-center">
            <span className="font-gigasans font-bold text-fbc-sky text-sm">{initials}</span>
          </div>
        )}
      </div>
      <span className="font-gigasans font-semibold text-fbc-white text-sm text-center leading-tight">
        {name}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color }}>
        {tierLabel}
      </span>
    </div>
  );
}

function YourBrandCard() {
  return (
    <motion.div
      className="w-40 sm:w-48 rounded-[32px] flex flex-col items-center justify-center gap-1.5 px-4 py-5"
      style={{
        minHeight: 168,
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
      <span className="text-fbc-sky text-2xl">+</span>
      <span className="text-fbc-white text-sm font-semibold text-center">Your Brand</span>
      <span className="text-fbc-muted/60 text-[10px] uppercase tracking-wide">Become a sponsor</span>
    </motion.div>
  );
}

export default function SponsorsSection() {
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
            {SPONSORS.map((s) => (
              <SponsorCard key={s.name} name={s.name} tier={s.tier} />
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
