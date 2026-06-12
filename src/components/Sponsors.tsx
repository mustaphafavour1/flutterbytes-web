"use client";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const tiers = [
  {
    name: "Platinum",
    color: "#C0C0C0",
    ring: "from-gray-300 via-white to-gray-400",
    count: 2,
    size: "lg",
  },
  {
    name: "Gold",
    color: "#FFD700",
    ring: "from-yellow-300 via-amber-200 to-yellow-500",
    count: 3,
    size: "md",
  },
  {
    name: "Silver",
    color: "#A8A8A8",
    ring: "from-gray-300 via-slate-200 to-gray-400",
    count: 4,
    size: "sm",
  },
  {
    name: "Bronze",
    color: "#CD7F32",
    ring: "from-amber-600 via-amber-400 to-orange-600",
    count: 5,
    size: "sm",
  },
];

function SponsorLogo({
  tier,
  index,
  size,
}: {
  tier: (typeof tiers)[0];
  index: number;
  size: "lg" | "md" | "sm";
}) {
  const dims = size === "lg" ? 100 : size === "md" ? 80 : 64;
  return (
    <div
      className="flex flex-col items-center gap-2"
      role="img"
      aria-label={`${tier.name} sponsor ${index + 1}`}
    >
      <div
        className={`rounded-full p-0.5 bg-gradient-to-br ${tier.ring}`}
        style={{ width: dims + 8, height: dims + 8 }}
      >
        <div
          className="w-full h-full rounded-full bg-white flex items-center justify-center"
          style={{ fontSize: size === "lg" ? 11 : 9 }}
        >
          <span className="font-gigasans font-semibold text-gray-400 text-center px-2 leading-tight text-[9px]">
            {tier.name}
            <br />
            Partner
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Sponsors() {
  const [copied, setCopied] = useState(false);

  const copyPhone = async () => {
    await navigator.clipboard.writeText("+2348000000000");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sponsors" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="section-title mb-10 text-center">
            FlutterBytes Conference 2026 is being sponsored by:
          </h2>
        </AnimateOnScroll>

        {/* Tiers */}
        <div className="space-y-10 mb-14">
          {tiers.map((tier, ti) => (
            <AnimateOnScroll key={tier.name} delay={ti * 0.1}>
              <div className="glass-card p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="h-px flex-1 bg-fbc-100" />
                  <span
                    className="font-gigasans font-semibold text-sm uppercase tracking-widest"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </span>
                  <div className="h-px flex-1 bg-fbc-100" />
                </div>
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  {Array.from({ length: tier.count }).map((_, i) => (
                    <SponsorLogo
                      key={i}
                      tier={tier}
                      index={i}
                      size={tier.size as "lg" | "md" | "sm"}
                    />
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Past sponsors */}
        <AnimateOnScroll delay={0.2}>
          <div className="text-center mb-4">
            <p className="text-fbc-500/50 text-sm font-medium uppercase tracking-widest mb-4">
              Past Sponsors
            </p>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-full bg-fbc-100/80 border border-fbc-100 flex items-center justify-center"
                >
                  <span className="text-fbc-500/30 text-[9px] font-semibold">
                    Past
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Become a sponsor CTA */}
        <AnimateOnScroll delay={0.25}>
          <div
            className="mt-14 rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #03254C 0%, #1167B1 100%)",
            }}
          >
            <div className="p-10 flex flex-col md:flex-row items-center gap-8">
              {/* Branded placeholder image */}
              <div
                className="w-40 h-40 flex-shrink-0 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(42,157,244,0.3) 0%, rgba(42,157,244,0.05) 100%)",
                  border: "1px solid rgba(42,157,244,0.3)",
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 34 34"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect width="34" height="34" rx="8" fill="rgba(42,157,244,0.4)" />
                  <line x1="11" y1="6" x2="11" y2="28" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="23" y1="6" x2="23" y2="28" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="6" y1="12" x2="28" y2="12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="6" y1="22" x2="28" y2="22" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-gigasans font-bold text-2xl md:text-3xl text-white mb-3">
                  Become a Sponsor of FlutterBytes Conference 2026!
                </h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Partner with Africa&apos;s biggest Flutter conference and reach
                  thousands of developers, engineers, and tech enthusiasts across the
                  continent.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a href="mailto:sponsors@flutterbytes.com" className="pill-btn-primary">
                    Send us a mail →
                  </a>
                  <button
                    onClick={copyPhone}
                    className="pill-btn-outline-white"
                    aria-live="polite"
                  >
                    {copied ? "Copied! ✓" : "Copy phone number"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
