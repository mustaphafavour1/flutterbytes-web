"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Bot, Code2, GitBranch, Cpu, Globe,
  Users, Star, BrainCircuit, Zap, Terminal, Layers,
} from "lucide-react";

/* ── Icon cycling ── */
type Pair = { label: string; icons: [React.ElementType, React.ElementType] | null };

const PAIRS: Pair[] = [
  { label: "letters", icons: null },
  { label: "ai",      icons: [Sparkles, Bot] },
  { label: "letters2",icons: null },
  { label: "dev",     icons: [Code2, GitBranch] },
  { label: "letters3",icons: null },
  { label: "api",     icons: [Cpu, Globe] },
  { label: "letters4",icons: null },
  { label: "community",icons: [Users, Star] },
  { label: "letters5",icons: null },
  { label: "brain",   icons: [BrainCircuit, Zap] },
  { label: "letters6",icons: null },
  { label: "terminal",icons: [Terminal, Layers] },
];

function IconSlot({ pair, letters }: { pair: Pair; letters: string }) {
  return (
    <AnimatePresence mode="wait">
      {pair.icons === null ? (
        <motion.span
          key={pair.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.18 }}
          className="inline-block text-white"
        >
          {letters}
        </motion.span>
      ) : (
        <motion.span
          key={pair.label}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.18 }}
          className="inline-flex items-center gap-0.5"
          style={{ filter: "drop-shadow(0 0 8px rgba(56,189,248,0.8))" }}
        >
          {pair.icons.map((Icon, i) => (
            <Icon
              key={i}
              className="text-fbc-sky"
              style={{ width: "0.82em", height: "0.82em", display: "inline-block" }}
              aria-hidden="true"
            />
          ))}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

const stats = [
  { value: "35", label: "Speakers" },
  { value: "600+", label: "Flutter Devs" },
  { value: "32", label: "Sessions" },
  { value: "2", label: "Days" },
];

export default function Hero() {
  const [pairIdx, setPairIdx] = useState(0);

  useEffect(() => {
    const current = PAIRS[pairIdx];
    const duration = current.label.startsWith("letters") ? 2000 : 1500;
    const timer = setTimeout(() => {
      setPairIdx((i) => (i + 1) % PAIRS.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [pairIdx]);

  const currentPair = PAIRS[pairIdx];

  /* stagger container */
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-fbc-navy"
      aria-label="Hero"
    >
      {/* VS Code grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow blob — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-fbc-blue/20 blur-[120px] pointer-events-none animate-float"
        aria-hidden="true"
      />
      {/* Ambient glow blob — top right */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-fbc-sky/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-32 pt-36 text-center"
      >
        {/* Terminal badge */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-0 font-mono text-sm bg-fbc-card/80 border border-fbc-border rounded-full px-5 py-2 text-fbc-muted">
            <span className="text-fbc-sky/60">{"{"}</span>
            <span className="text-fbc-white mx-1">FlutterBytes Conference 2026</span>
            <span className="text-fbc-sky/60">{"}"}</span>
            <span className="text-fbc-sky animate-cursor-blink ml-1">|</span>
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={item}
          className="font-space font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-6"
          aria-label="Becoming Flutter AI Engineer"
        >
          <span className="block text-white">
            Becoming Flu
            <IconSlot pair={currentPair} letters="tt" />
            er
          </span>
          <span className="block text-white mt-1">
            AI{" "}
            <IconSlot pair={currentPair} letters="E" />
            <IconSlot pair={currentPair} letters="e" />
            ngineer
          </span>
        </motion.h1>

        {/* Date pill */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-fbc-card border border-fbc-border rounded-full px-5 py-2 text-fbc-muted text-sm">
            📅
            <span>Friday &amp; Saturday · October 30th &amp; 31st, 2026</span>
          </span>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          variants={item}
          className="text-fbc-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Five editions in. The community&apos;s still shipping. This time, we&apos;re teaching Flutter to think.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#tickets"
            className="rounded-full px-8 py-3.5 font-space font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(96,165,250,0.5)]"
          >
            Get Tickets →
          </a>
          <a
            href="/agenda"
            className="rounded-full px-8 py-3.5 font-space font-semibold border border-fbc-sky/40 text-fbc-sky hover:bg-fbc-sky/10 transition-all"
          >
            View Agenda
          </a>
        </motion.div>

        {/* Stat badges */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-4 py-3 text-center min-w-[90px]"
            >
              <div className="font-space font-bold text-2xl text-fbc-sky">{s.value}</div>
              <div className="text-fbc-muted text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span className="text-fbc-muted/40 text-[10px] uppercase tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-4 h-4 text-fbc-muted/30"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
