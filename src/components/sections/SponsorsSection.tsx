"use client";
import { useState } from "react";
import { Mail, Phone, Check } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const tiers = [
  {
    name: "Platinum",
    style: "border-amber-400/50 shadow-[0_0_20px_rgba(251,191,36,0.2)]",
    labelStyle: "text-amber-400",
    sponsors: ["Google"],
  },
  {
    name: "Gold",
    style: "border-yellow-400/40",
    labelStyle: "text-yellow-400",
    sponsors: ["ServerPod"],
  },
  {
    name: "Silver",
    style: "border-slate-400/40",
    labelStyle: "text-slate-400",
    sponsors: ["Cake Wallet"],
  },
  {
    name: "Bronze",
    style: "border-amber-700/40",
    labelStyle: "text-amber-700",
    sponsors: ["Codemagic", "ShoreBird"],
  },
];

function SponsorLogo({ name, tierStyle }: { name: string; tierStyle: string }) {
  return (
    <div
      className={`w-24 h-24 rounded-2xl bg-fbc-card dark:bg-fbc-card flex items-center justify-center border ${tierStyle} flex-shrink-0`}
    >
      <span className="text-fbc-muted text-xs font-semibold text-center px-2 leading-tight">
        {name}
      </span>
    </div>
  );
}

export default function SponsorsSection() {
  const [copied, setCopied] = useState(false);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText("+2348000000000");
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sponsors" className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-space font-bold text-3xl md:text-5xl text-fbc-light-text dark:text-fbc-white mb-2">
            Built with support from
          </h2>
          <p className="text-fbc-light-sub dark:text-fbc-muted text-base mb-12 max-w-xl">
            Companies that understand that investing in developers is investing in the future.
          </p>
        </AnimateOnScroll>

        {/* Tiers */}
        <div className="space-y-6 mb-12">
          {tiers.map((tier, ti) => (
            <AnimateOnScroll key={tier.name} delay={ti * 0.08}>
              <div className="rounded-3xl border border-fbc-border dark:border-fbc-border bg-fbc-card/30 dark:bg-fbc-card/30 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px flex-1 bg-fbc-border" />
                  <span className={`font-mono text-xs uppercase tracking-widest ${tier.labelStyle}`}>
                    {tier.name}
                  </span>
                  <div className="h-px flex-1 bg-fbc-border" />
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  {tier.sponsors.map((name) => (
                    <SponsorLogo key={name} name={name} tierStyle={tier.style} />
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Past sponsors */}
        <AnimateOnScroll delay={0.2}>
          <div className="text-center mb-12">
            <p className="text-fbc-muted text-xs font-mono uppercase tracking-widest mb-4">Past Sponsors</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {["Google", "GitHub", "JetBrains", "Cloudinary", "Vercel", "Auth0"].map((n) => (
                <div
                  key={n}
                  className="h-10 px-5 rounded-full bg-fbc-card/50 border border-fbc-border flex items-center text-fbc-muted text-xs opacity-50"
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Become a sponsor CTA */}
        <AnimateOnScroll delay={0.25}>
          <div
            className="rounded-3xl p-8 md:p-10 text-center"
            style={{ background: "linear-gradient(135deg, #0F1E38 0%, #1E3A5F 100%)", border: "1px solid #1E3A5F" }}
          >
            <h3 className="font-space font-bold text-2xl md:text-3xl text-fbc-white mb-3">
              Become a sponsor
            </h3>
            <p className="text-fbc-muted mb-8 max-w-md mx-auto leading-relaxed">
              Partner with Africa&apos;s biggest Flutter conference and reach thousands of developers,
              engineers, and tech enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:sponsors@flutterbytes.ng"
                className="rounded-full px-6 py-3 font-space font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] inline-flex items-center justify-center gap-2"
              >
                <Mail size={16} />
                Send us a mail →
              </a>
              <button
                onClick={copyPhone}
                className="rounded-full px-6 py-3 font-space font-semibold border border-fbc-sky/40 text-fbc-sky hover:bg-fbc-sky/10 transition-all inline-flex items-center justify-center gap-2"
                aria-live="polite"
              >
                {copied ? <Check size={16} /> : <Phone size={16} />}
                {copied ? "Copied!" : "Copy phone number"}
              </button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
