"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ImagePlus, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { GRADIENT_RING } from "@/app/hackathon/styles";

type Mode = "legacy" | "ai";

/** The two Stampdx campaigns (embedded with https://www.stampdx.com/embed.js). */
const OPTIONS: Record<Mode, { slug: string; label: string; tagline: string; icon: LucideIcon; steps: string[]; note?: string }> = {
  legacy: {
    slug: "fbc-attendees-dp",
    label: "Legacy DP",
    tagline: "Your photo and name in the official FlutterBytes frame.",
    icon: ImagePlus,
    steps: [
      "Tap the frame and add your photo",
      "Type your name and apply it",
      "Download it, or share it straight from here",
    ],
  },
  ai: {
    slug: "fbc-attendees",
    label: "AI DP",
    tagline: "A selfie, turned into a hologram-style event portrait by AI.",
    icon: Sparkles,
    steps: [
      "Add a clear photo of your face; extra angles help",
      "Pick a style: Midnight Grid or Code Rain",
      "Create your image, then download or share it",
    ],
    note: "Up to 3 AI images per person. Your photo is only used to make your image and is deleted right after.",
  },
};
const MODES = Object.keys(OPTIONS) as Mode[];

export default function DpContent() {
  const [mode, setMode] = useState<Mode>("legacy");
  const [ready, setReady] = useState(false);

  // ?mode=ai opens the AI option directly. The embeds mount after hydration so
  // the Stampdx script never adds its iframe to server-rendered markup.
  useEffect(() => {
    const m = new URLSearchParams(window.location.search).get("mode");
    if (m === "ai" || m === "legacy") setMode(m);
    setReady(true);
  }, []);

  const choose = (m: Mode) => {
    setMode(m);
    const url = new URL(window.location.href);
    url.searchParams.set("mode", m);
    window.history.replaceState(null, "", url);
  };

  const opt = OPTIONS[mode];

  return (
    <section className="relative overflow-hidden sec-plain pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(42,157,244,0.12) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        aria-hidden="true"
      />
      <div className="absolute -top-24 right-0 w-[30rem] h-[30rem] rounded-full bg-fbc-blue/15 blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_444px] lg:grid-rows-[auto_1fr] gap-x-16 gap-y-10">
        {/* Intro + choice */}
        <div className="lg:pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fbc-blue mb-3">FlutterBytes 2026 · Nov 6–7 · Lagos</p>
          <h1 className="font-gigasans font-bold text-4xl sm:text-5xl xl:text-6xl leading-[1.05] tracking-tight text-balance text-fbc-white">
            Show them you&apos;re <span className="text-fbc-blue">attending.</span>
          </h1>
          <p className="text-fbc-muted text-sm sm:text-base leading-relaxed max-w-md mt-4">
            Make your &ldquo;I&apos;m attending&rdquo; DP in seconds, then share it on your socials. Pick a style:
          </p>

          <div role="radiogroup" aria-label="DP style" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7">
            {MODES.map((m) => {
              const o = OPTIONS[m];
              const active = m === mode;
              const Icon = o.icon;
              return (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => choose(m)}
                  className={`relative text-left rounded-2xl border p-4 sm:p-5 transition-colors ${
                    active ? "border-fbc-blue/70 bg-fbc-blue/10" : "border-fbc-border bg-fbc-card/50 hover:border-fbc-blue/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex w-10 h-10 items-center justify-center rounded-xl ${active ? "bg-fbc-blue text-white" : "bg-fbc-blue/15 text-fbc-blue"}`}>
                      <Icon size={18} />
                    </span>
                    <span className="font-gigasans font-semibold text-lg text-fbc-white">{o.label}</span>
                    <span
                      className={`ml-auto flex w-5 h-5 items-center justify-center rounded-full border-2 ${
                        active ? "border-fbc-blue bg-fbc-blue text-white" : "border-fbc-border"
                      }`}
                      aria-hidden="true"
                    >
                      {active && <Check size={12} strokeWidth={3} />}
                    </span>
                  </div>
                  <p className="text-sm text-fbc-muted leading-relaxed mt-3">{o.tagline}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* The maker */}
        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full max-w-[444px] mx-auto">
          <div className="grad-ring relative rounded-[36px] p-2.5 sm:p-3 shadow-2xl" style={GRADIENT_RING}>
            <div className="relative rounded-[24px] overflow-hidden" style={{ background: "#0A0E1B" }}>
              {ready ? (
                MODES.map((m) => (
                  <div key={m} className={m === mode ? "" : "hidden"}>
                    <div data-stampdx={OPTIONS[m].slug} data-title={`FlutterBytes 2026 ${OPTIONS[m].label} maker`} />
                  </div>
                ))
              ) : (
                <div className="animate-pulse" style={{ height: "min(760px, 92vh)", minHeight: 560 }} />
              )}
            </div>
          </div>
        </div>

        {/* How it works (follows the chosen style) */}
        <div className="lg:col-start-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fbc-muted mb-4">How it works</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ol className="space-y-3">
                {opt.steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="font-gigasans font-black text-2xl leading-none text-fbc-blue/30 w-8 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm sm:text-base text-fbc-white pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              {opt.note && (
                <p className="flex items-start gap-2 mt-6 max-w-md text-xs text-fbc-muted leading-relaxed">
                  <ShieldCheck size={15} className="text-emerald-500 flex-shrink-0 mt-px" />
                  {opt.note}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Script src="https://www.stampdx.com/embed.js" strategy="afterInteractive" />
    </section>
  );
}
