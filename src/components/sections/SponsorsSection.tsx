"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

/**
 * Sponsors — logos live in /public/sponsors/ (246×182 rectangles).
 * Tiered sponsors are listed first; the tier label shows only when present.
 * Each chip links to the sponsor's website.
 */
type Sponsor = { name: string; logo: string; website: string; tier?: string };

const SPONSORS: Sponsor[] = [
  { name: "Google",             logo: "google.png",             website: "https://www.google.com",       tier: "platinum" },
  { name: "Serverpod",          logo: "serverpod.png",          website: "https://serverpod.dev/",        tier: "gold" },
  { name: "Cake Wallet",        logo: "cake-wallet.png",        website: "https://cakewallet.com/",       tier: "silver" },
  { name: "Codemagic",          logo: "codemagic.png",          website: "https://codemagic.io/start/",   tier: "bronze" },
  { name: "Shorebird",          logo: "shorebird.png",          website: "https://shorebird.dev/",        tier: "bronze" },
  { name: "Flutter",            logo: "flutter.png",            website: "https://flutter.dev/" },
  { name: "Invertase",          logo: "invertase.png",          website: "https://invertase.io/" },
  { name: "FlutterFlow",        logo: "flutter-flow.png",       website: "https://flutterflow.io/" },
  { name: "Very Good Ventures", logo: "very-good-ventures.png", website: "https://verygood.ventures/" },
  { name: "Native Teams",       logo: "native-teams.png",       website: "https://nativeteams.com/" },
  { name: "Zapp!",              logo: "zapp.png",               website: "https://zapp.run/" },
  { name: "aptLearn",           logo: "aptlearn.png",           website: "https://aptlearn.io/" },
  { name: "GenZ Techies",       logo: "genz-techies.png",       website: "https://genztechies.com/" },
  { name: "Industrial Flutter", logo: "industrial-flutter.png", website: "https://www.industrialflutter.com/" },
  { name: "Shuttlers",          logo: "shuttlers.png",          website: "https://www.shuttlers.ng/" },
];

const TIER_COLOR: Record<string, string> = {
  platinum: "#E5C07B",
  gold:     "#F0C040",
  silver:   "#94A3B8",
  bronze:   "#B87333",
};

function SponsorCard({ sponsor, fillIdx, myIdx }: { sponsor: Sponsor; fillIdx: number; myIdx: number }) {
  const [hover, setHover]   = useState(false);
  const isActive = myIdx === fillIdx;
  const isFilled = myIdx < fillIdx;
  const revealed = isFilled || hover;

  const tierLabel = sponsor.tier ? `${sponsor.tier.charAt(0).toUpperCase()}${sponsor.tier.slice(1)} Sponsor` : null;
  const tierColor = sponsor.tier ? TIER_COLOR[sponsor.tier] : undefined;
  const logoSrc   = `/sponsors/${sponsor.logo}`;

  return (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${sponsor.name} — visit website`}
      className="flex flex-col items-center gap-2 transition-transform hover:-translate-y-1"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative w-40 sm:w-44 rounded-full bg-white border border-fbc-border overflow-hidden" style={{ height: 88 }}>
        {/* Container background fills bottom-to-top: white -> #D0EFFF */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "#D0EFFF" }}
          animate={{
            clipPath: revealed
              ? "inset(0% 0 0% 0)"
              : isActive
              ? ["inset(100% 0 0% 0)", "inset(0% 0 0% 0)"]
              : "inset(100% 0 0% 0)",
          }}
          transition={{ duration: 0.79, ease: "easeInOut" }}
        />
        {/* Logo sits on top of the fill; scaled up to fill the container's whitespace */}
        <div className="absolute inset-0 flex items-center justify-center px-4 py-2">
          <Image
            src={logoSrc}
            alt={sponsor.name}
            width={246}
            height={182}
            className="object-contain w-auto h-full"
            style={{ transform: "scale(1.3)" }}
          />
        </div>
      </div>
      {/* Tier label (only when present); reserve the line so chips align */}
      <span
        className="text-[9px] font-semibold uppercase tracking-wide h-3 leading-3"
        style={{ color: tierColor }}
      >
        {tierLabel}
      </span>
    </a>
  );
}

function YourBrandCard() {
  return (
    <a
      href="/sponsors"
      className="flex flex-col items-center gap-2 transition-transform hover:-translate-y-1"
    >
      <motion.div
        className="w-40 sm:w-44 rounded-full flex flex-col items-center justify-center gap-0.5"
        style={{ height: 88, border: "1.5px dashed rgba(42,157,244,0.4)" }}
        animate={{
          borderColor: ["rgba(42,157,244,0.2)", "rgba(42,157,244,0.7)", "rgba(42,157,244,0.2)"],
          boxShadow: ["0 0 0 rgba(42,157,244,0)", "0 0 16px rgba(42,157,244,0.3)", "0 0 0 rgba(42,157,244,0)"],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-fbc-sky text-xl leading-none">+</span>
        <span className="text-fbc-white text-xs font-semibold">Your Brand</span>
      </motion.div>
      <span className="text-fbc-muted/60 text-[9px] uppercase tracking-wide h-3 leading-3">Become a sponsor</span>
    </a>
  );
}

export default function SponsorsSection() {
  const [fillIdx, setFillIdx] = useState(-1);

  /* Sequential fill wave — each chip fills bottom-to-top, then resets */
  useEffect(() => {
    const id = setInterval(() => {
      setFillIdx((prev) => (prev >= SPONSORS.length - 1 ? -1 : prev + 1));
    }, 1140);
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

        {/* Sponsor grid — 5 / 6 / (4 + Your Brand) rows, each centered */}
        <AnimateOnScroll delay={0.1}>
          <div className="flex flex-col items-center gap-y-6 mb-6">
            {([[0, 5], [5, 11], [11, 15]] as const).map(([start, end], r) => (
              <div key={r} className="flex flex-wrap justify-center gap-x-4 gap-y-6">
                {SPONSORS.slice(start, end).map((s, i) => (
                  <SponsorCard key={s.name} sponsor={s} fillIdx={fillIdx} myIdx={start + i} />
                ))}
                {r === 2 && <YourBrandCard />}
              </div>
            ))}
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
                href="mailto:contact.flutterbytes@gmail.com"
                className="rounded-full px-6 py-2.5 font-gigasans font-semibold text-sm text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_18px_rgba(42,157,244,0.4)] inline-flex items-center justify-center gap-2"
              >
                <Mail size={14} /> Send us a mail →
              </a>
              <a
                href="mailto:contact.flutterbytes@gmail.com?subject=Sponsorship%20Deck%20Request&body=Hello%20FlutterBytes%20team%2C%20I%27d%20love%20to%20sponsor%20the%20next%20edition."
                className="rounded-full px-6 py-2.5 font-gigasans font-semibold text-sm border border-fbc-sky/30 text-fbc-sky hover:bg-fbc-sky/10 transition-all inline-flex items-center justify-center gap-2"
              >
                Request sponsorship deck →
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
