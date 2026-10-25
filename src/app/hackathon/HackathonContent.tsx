"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Check, Cloud, Gauge, Hammer, Layers, Lock,
  Server, ShieldCheck, Target, Ticket, Trophy, User,
} from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import {
  HACKATHON_APPLY_URL, TICKETS_URL, HACKATHON_OPENS, HACKATHON_CLOSES,
  WINNERS_START, WINNERS_END, hackathonPhase, type HackathonPhase,
} from "@/data/hackathon";

const DAY = 86_400_000;

/* ─────────────────────────── content ─────────────────────────── */

const COPY: Record<HackathonPhase, { status: string; h1a: string; h1b: string; sub: string }> = {
  open: {
    status: "Applications open",
    h1a: "Build it. Ship it.",
    h1b: "Get crowned on stage.",
    sub: "A one-week, solo hackathon by FlutterBytes and Serverpod. Build a product on Serverpod, deploy it to Serverpod Cloud, and the top three are crowned live at FlutterBytes Conference 2026.",
  },
  closed: {
    status: "Applications closed",
    h1a: "Submissions are in.",
    h1b: "Judging is underway.",
    sub: "Applications closed on Friday, October 30 at 11:59pm WAT. Entries are being judged, and the top three will be announced live at FlutterBytes Conference, November 6–7 in Lagos.",
  },
  ended: {
    status: "Hackathon concluded",
    h1a: "That's a wrap.",
    h1b: "Winners crowned on stage.",
    sub: "Thank you to every builder who shipped. The winners were announced live at FlutterBytes Conference 2026 in Lagos.",
  },
};

type Line = { kind: "cmd" | "ok" | "info" | "live" | "next" | "comment"; text: string };

const TERMINAL: Record<HackathonPhase, { title: string; lines: Line[] }> = {
  open: {
    title: "ship-it.sh",
    lines: [
      { kind: "cmd", text: "serverpod create my_product" },
      { kind: "ok", text: "project created — Flutter app + Serverpod backend" },
      { kind: "cmd", text: "scloud deploy" },
      { kind: "info", text: "deploying to Serverpod Cloud…" },
      { kind: "ok", text: "live on Serverpod Cloud" },
      { kind: "comment", text: "submit: project ID · live link · short demo video" },
      { kind: "ok", text: "entry in — applications close Oct 30, 11:59pm WAT" },
    ],
  },
  closed: {
    title: "status.log",
    lines: [
      { kind: "cmd", text: "cat hackathon/status.log" },
      { kind: "ok", text: "applications closed · Oct 30, 11:59pm WAT" },
      { kind: "live", text: "eligibility checks + judging in progress" },
      { kind: "next", text: "winners → live at FlutterBytes 2026 · Nov 6–7" },
    ],
  },
  ended: {
    title: "status.log",
    lines: [
      { kind: "cmd", text: "cat hackathon/status.log" },
      { kind: "ok", text: "applications closed · Oct 30" },
      { kind: "ok", text: "judging complete" },
      { kind: "ok", text: "winners announced · FlutterBytes 2026" },
    ],
  },
};

const STATS = [
  { value: "7 days", label: "to build & deploy" },
  { value: "Solo", label: "individuals only" },
  { value: "$700", label: "total prize pool" },
  { value: "Live", label: "winners crowned at FBC" },
];

const STAGES = [
  { key: "open",  label: "Hackathon opens",   date: "Fri, Oct 23",                  start: HACKATHON_OPENS,  end: HACKATHON_OPENS },
  { key: "build", label: "Build & deploy",    date: "Oct 23 – 30 · 7 days",         start: HACKATHON_OPENS,  end: HACKATHON_CLOSES },
  { key: "close", label: "Applications close", date: "Fri, Oct 30 · 11:59pm WAT",   start: HACKATHON_CLOSES, end: HACKATHON_CLOSES },
  { key: "judge", label: "Judging",           date: "Oct 30 – Nov 6",               start: HACKATHON_CLOSES, end: WINNERS_START },
  { key: "crown", label: "Winners announced", date: "Nov 6 – 7 · live at FBC 2026", start: WINNERS_START,    end: WINNERS_END },
];

type StageStatus = "done" | "live" | "next";
const stageStatus = (s: (typeof STAGES)[number], now: number): StageStatus =>
  now >= s.end ? "done" : now >= s.start ? "live" : "next";

const CHECKLIST = [
  { icon: User,   title: "Solo builds only",        desc: "Each entry comes from one person. There are no teams." },
  { icon: Server, title: "Built on Serverpod",      desc: "Your product uses Serverpod as its backend framework." },
  { icon: Cloud,  title: "Live on Serverpod Cloud", desc: "Your product is deployed and running on Serverpod Cloud." },
  { icon: Lock,   title: "Closed source",           desc: "Your code stays private, and you keep ownership of your product." },
  { icon: Hammer, title: "Yours to keep building",  desc: "After the hackathon, keep shipping on your product." },
];

const PAYLOAD = [
  { key: "projectId", value: "<your Serverpod Cloud project ID>" },
  { key: "about",     value: "<what you built + the problem it solves>" },
  { key: "liveLink",  value: "<link to the live product>" },
  { key: "video",     value: "<short demo video>", note: "required" },
];

const CRITERIA = [
  { icon: Gauge,  title: "Finish & polish",        desc: "The product works from start to end and feels complete to use." },
  { icon: Target, title: "Problem clarity",        desc: "The entry states clearly what problem it solves, and for whom." },
  { icon: Layers, title: "Completeness vs. scope", desc: "The entry delivers what it set out to build." },
];

const PRIZES = [
  { place: "1st", total: "$400", cash: "$200", credits: "$200", color: "#E5C07B", podium: "sm:h-40", order: "order-1 sm:order-2", featured: true },
  { place: "2nd", total: "$200", cash: "$100", credits: "$100", color: "#94A3B8", podium: "sm:h-28", order: "order-2 sm:order-1", featured: false },
  { place: "3rd", total: "$100", cash: "$50",  credits: "$50",  color: "#B87333", podium: "sm:h-20", order: "order-3",            featured: false },
];

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-gigasans font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_24px_rgba(42,157,244,0.45)]";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-gigasans font-semibold border border-fbc-sky/40 text-fbc-blue hover:bg-fbc-sky/10 transition-all";

/* ─────────────────────────── pieces ─────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-widest text-fbc-blue mb-3">— {children}</p>
  );
}

function Countdown({ target, serverNow, offset }: { target: number; serverNow: number; offset: number }) {
  const [now, setNow] = useState(serverNow);
  useEffect(() => {
    const tick = () => setNow(Date.now() + offset);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [offset]);

  const diff = Math.max(0, target - now);
  const units: [number, string][] = [
    [Math.floor(diff / DAY), "days"],
    [Math.floor((diff % DAY) / 3_600_000), "hrs"],
    [Math.floor((diff % 3_600_000) / 60_000), "min"],
    [Math.floor((diff % 60_000) / 1000), "sec"],
  ];
  return (
    <div className="flex gap-2 sm:gap-3">
      {units.map(([v, l]) => (
        <div key={l} className="w-[4.25rem] sm:w-20 rounded-2xl border border-fbc-border bg-fbc-card/70 backdrop-blur py-3 text-center">
          <div className="font-gigasans font-semibold text-2xl sm:text-3xl text-fbc-blue tabular-nums leading-none">
            {String(v).padStart(2, "0")}
          </div>
          <div className="text-fbc-muted text-[10px] uppercase tracking-widest mt-1.5">{l}</div>
        </div>
      ))}
    </div>
  );
}

function Terminal({ title, lines }: { title: string; lines: Line[] }) {
  const mark: Record<Line["kind"], { sym: string; cls: string }> = {
    cmd: { sym: "❯", cls: "text-fbc-blue" },
    ok: { sym: "✓", cls: "text-emerald-500" },
    info: { sym: "↑", cls: "text-fbc-blue" },
    live: { sym: "●", cls: "text-amber-500" },
    next: { sym: "○", cls: "text-fbc-muted" },
    comment: { sym: "#", cls: "text-fbc-muted/60" },
  };
  return (
    <div
      className="rounded-2xl overflow-hidden border border-fbc-border shadow-2xl"
      style={{ background: "rgb(var(--color-card) / 0.97)" }}
    >
      <div
        className="flex items-center gap-1.5 px-4 py-3 border-b border-fbc-border"
        style={{ background: "rgb(var(--color-navy) / 0.95)" }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-fbc-muted/70">~/flutterbytes-hackathon/{title}</span>
      </div>
      <div className="p-5 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-7">
        {lines.map((l, i) => {
          const m = mark[l.kind];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.35, duration: 0.3 }}
              className={`flex gap-2 whitespace-pre-wrap break-words ${l.kind === "cmd" ? "" : "pl-4"}`}
            >
              <span className={`${m.cls} flex-shrink-0`}>{m.sym}</span>
              <span
                className={
                  l.kind === "cmd" ? "text-fbc-white" : l.kind === "comment" ? "text-fbc-muted/60 italic" : "text-fbc-muted"
                }
              >
                {l.text}
              </span>
            </motion.div>
          );
        })}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + lines.length * 0.35 }}
          className="flex items-center gap-2"
        >
          <span className="text-fbc-blue">❯</span>
          <span className="inline-block w-2 h-4 bg-fbc-blue animate-cursor-blink" />
        </motion.div>
      </div>
    </div>
  );
}

function StageNode({ status, index }: { status: StageStatus; index: number }) {
  if (status === "done") {
    return (
      <span className="relative z-10 flex w-10 h-10 flex-shrink-0 items-center justify-center rounded-full bg-fbc-blue text-white shadow-[0_0_16px_rgba(42,157,244,0.45)]">
        <Check size={18} strokeWidth={3} />
      </span>
    );
  }
  if (status === "live") {
    return (
      <span className="relative z-10 flex w-10 h-10 flex-shrink-0 items-center justify-center rounded-full bg-fbc-card border-2 border-fbc-blue">
        <span className="absolute inline-flex h-full w-full rounded-full bg-fbc-blue/30 animate-ping" />
        <span className="relative w-3 h-3 rounded-full bg-fbc-blue" />
      </span>
    );
  }
  return (
    <span className="relative z-10 flex w-10 h-10 flex-shrink-0 items-center justify-center rounded-full bg-fbc-card border border-fbc-border font-mono text-xs text-fbc-muted">
      {String(index).padStart(2, "0")}
    </span>
  );
}

function PrimaryCta({ phase }: { phase: HackathonPhase }) {
  if (phase === "open") {
    return (
      <a href={HACKATHON_APPLY_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
        Apply now <ArrowUpRight size={17} />
      </a>
    );
  }
  if (phase === "closed") {
    return (
      <a href={TICKETS_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
        <Ticket size={17} /> Get tickets
      </a>
    );
  }
  return (
    <Link href="/" className={btnPrimary}>
      Explore FlutterBytes 2026 <ArrowRight size={17} />
    </Link>
  );
}

/* ─────────────────────────── page ─────────────────────────── */

export default function HackathonContent({ serverNow }: { serverNow: number }) {
  const [now, setNow] = useState(serverNow);
  const [offset, setOffset] = useState(0);

  // Live clock (+ optional ?preview=open|closed|ended to see each variant early).
  useEffect(() => {
    let off = 0;
    const p = new URLSearchParams(window.location.search).get("preview") as HackathonPhase | null;
    const anchors: Record<HackathonPhase, number> = {
      open: HACKATHON_OPENS + 3 * DAY,
      closed: HACKATHON_CLOSES + 3_600_000,
      ended: WINNERS_END + DAY,
    };
    if (p && p in anchors && hackathonPhase(Date.now()) !== p) off = anchors[p] - Date.now();
    setOffset(off);
    const tick = () => setNow(Date.now() + off);
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  const phase = hackathonPhase(now);
  const copy = COPY[phase];
  const term = TERMINAL[phase];

  const statuses = STAGES.map((s) => stageStatus(s, now));
  const reached = statuses.reduce((acc, st, i) => (st !== "next" ? i : acc), -1);
  const fill = Math.max(0, reached) / (STAGES.length - 1);

  const countdown =
    phase === "open"
      ? { label: "Applications close in", target: HACKATHON_CLOSES }
      : phase === "closed" && now < WINNERS_START
      ? { label: "Winners revealed in", target: WINNERS_START }
      : null;

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden sec-plain pt-28 sm:pt-32 pb-16 sm:pb-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(42,157,244,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        <div className="absolute -top-24 right-0 w-[30rem] h-[30rem] rounded-full bg-fbc-blue/15 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-fbc-sky/10 blur-[100px] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-14 items-center">
            {/* Left */}
            <div>
              {/* Co-brand lockup */}
              <div className="flex items-center gap-3 mb-7">
                <span className="inline-flex items-center rounded-full bg-white border border-fbc-border px-4 h-11">
                  <Image src="/logo-light.png" alt="FlutterBytes" width={654} height={129} className="h-6 w-auto" priority />
                </span>
                <span className="font-mono text-fbc-muted">×</span>
                <span className="inline-flex items-center rounded-full bg-white border border-fbc-border px-3 h-11">
                  <span className="relative block h-9 w-32 overflow-hidden">
                    <Image
                      src="/sponsors/serverpod.png"
                      alt="Serverpod"
                      width={149}
                      height={110}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none"
                      style={{ width: 149, height: 110 }}
                      priority
                    />
                  </span>
                </span>
              </div>

              {/* Status */}
              <div className="inline-flex items-center gap-2 rounded-full border border-fbc-border bg-fbc-card/70 backdrop-blur px-3.5 py-1.5 mb-6">
                <span className="relative flex h-2 w-2">
                  {phase === "open" && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                  )}
                  <span className={`relative inline-flex h-2 w-2 rounded-full ${phase === "open" ? "bg-emerald-500" : "bg-fbc-muted"}`} />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-fbc-white/80">{copy.status}</span>
              </div>

              <motion.h1
                key={phase}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-gigasans font-bold text-4xl sm:text-5xl xl:text-[3.25rem] leading-[1.05] tracking-tight text-balance text-fbc-white mb-5"
              >
                <span className="block">{copy.h1a}</span>
                <span className="block text-fbc-blue">{copy.h1b}</span>
              </motion.h1>

              <p className="text-fbc-muted text-base sm:text-lg leading-relaxed max-w-xl mb-8">{copy.sub}</p>

              {countdown && (
                <div className="mb-8">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-fbc-muted/70 mb-3">{countdown.label}</p>
                  <Countdown target={countdown.target} serverNow={serverNow} offset={offset} />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <PrimaryCta phase={phase} />
                <a href={phase === "open" ? "#rules" : "#prizes"} className={btnSecondary}>
                  {phase === "open" ? "Read the rules" : "See the prizes"}
                </a>
              </div>
              <p className="text-fbc-muted/70 text-xs mt-4">
                {phase === "open"
                  ? "Applications close Friday, October 30 · 11:59pm WAT"
                  : phase === "closed"
                  ? "Be in the room when the winners are crowned — Nov 6–7, Zone Tech Park, Lagos"
                  : "FlutterBytes Conference 2026 · Zone Tech Park, Gbagada, Lagos"}
              </p>
            </div>

            {/* Right — terminal */}
            <div className="relative">
              <Terminal key={phase} title={term.title} lines={term.lines} />
              <div className="hidden sm:flex absolute -bottom-6 right-6 items-center gap-2.5 rounded-2xl border border-fbc-border bg-fbc-card px-4 py-3 shadow-xl animate-float">
                <span className="flex w-9 h-9 items-center justify-center rounded-xl bg-[#E5C07B]/15">
                  <Trophy size={18} style={{ color: "#E5C07B" }} />
                </span>
                <div>
                  <p className="font-gigasans font-bold text-fbc-white leading-tight">$700</p>
                  <p className="text-fbc-muted text-[11px]">in prizes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-fbc-border bg-fbc-card/60 backdrop-blur px-5 py-4">
                <p className="font-gigasans font-bold text-2xl text-fbc-blue">{s.value}</p>
                <p className="text-fbc-muted text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PIPELINE / TIMELINE ───────── */}
      <section id="timeline" className="relative sec-bg-2 py-16 sm:py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-10">
              <Eyebrow>The pipeline</Eyebrow>
              <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white">From idea to the FlutterBytes stage</h2>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <div className="rounded-3xl border border-fbc-border bg-fbc-card/85 backdrop-blur p-6 sm:p-10">
              <ol className="relative grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-4">
                {/* desktop track */}
                <span className="hidden lg:block absolute top-5 left-[10%] right-[10%] h-px bg-fbc-border" aria-hidden="true" />
                <span
                  className="hidden lg:block absolute top-5 left-[10%] h-px bg-fbc-blue transition-all duration-700"
                  style={{ width: `${fill * 80}%` }}
                  aria-hidden="true"
                />
                {STAGES.map((s, i) => {
                  const st = statuses[i];
                  return (
                    <li key={s.key} className="relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-3 lg:text-center">
                      {i < STAGES.length - 1 && (
                        <span
                          className={`lg:hidden absolute left-5 top-10 -bottom-8 w-px ${st === "done" ? "bg-fbc-blue" : "bg-fbc-border"}`}
                          aria-hidden="true"
                        />
                      )}
                      <StageNode status={st} index={i + 1} />
                      <div>
                        <p
                          className={`font-mono text-[10px] uppercase tracking-widest mb-1 ${
                            st === "live" ? "text-fbc-blue" : st === "done" ? "text-fbc-muted" : "text-fbc-muted/60"
                          }`}
                        >
                          {st === "done" ? "done" : st === "live" ? "in progress" : "up next"}
                        </p>
                        <p className="font-gigasans font-semibold text-fbc-white leading-snug">{s.label}</p>
                        <p className="text-fbc-muted text-xs mt-1">{s.date}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ───────── RULES: ELIGIBILITY + SUBMISSION ───────── */}
      <section id="rules" className="relative sec-plain py-16 sm:py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Eligibility */}
          <AnimateOnScroll>
            <Eyebrow>Eligibility</Eyebrow>
            <h2 className="font-gigasans font-bold text-3xl md:text-4xl text-fbc-white mb-3">Pre-flight checklist</h2>
            <p className="text-fbc-muted mb-8">Tick every box before you hit deploy.</p>
            <ul className="space-y-3">
              {CHECKLIST.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex gap-4 rounded-2xl border border-fbc-border bg-fbc-card/60 p-4">
                  <span className="flex w-10 h-10 flex-shrink-0 items-center justify-center rounded-xl bg-fbc-blue/15 text-fbc-blue">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-gigasans font-semibold text-fbc-white flex items-center gap-2">
                      {title}
                      <Check size={14} className="text-emerald-500" strokeWidth={3} />
                    </p>
                    <p className="text-fbc-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>

          {/* Submission */}
          <AnimateOnScroll delay={0.1}>
            <Eyebrow>Submission</Eyebrow>
            <h2 className="font-gigasans font-bold text-3xl md:text-4xl text-fbc-white mb-3">Your entry, in one payload</h2>
            <p className="text-fbc-muted mb-8">Every entry needs these four things.</p>

            <div
              className="rounded-2xl overflow-hidden border border-fbc-border"
              style={{ background: "rgb(var(--color-card) / 0.97)" }}
            >
              <div
                className="flex items-center gap-1.5 px-4 py-3 border-b border-fbc-border"
                style={{ background: "rgb(var(--color-navy) / 0.95)" }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-fbc-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-fbc-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-fbc-border" />
                <span className="ml-3 font-mono text-[11px] text-fbc-muted/70">submission.json</span>
              </div>
              <pre className="p-5 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-8 overflow-x-auto">
                <span className="text-fbc-muted">{"{"}</span>
                {"\n"}
                {PAYLOAD.map((p, i) => (
                  <span key={p.key}>
                    {"  "}
                    <span className="text-fbc-blue">&quot;{p.key}&quot;</span>
                    <span className="text-fbc-muted">: </span>
                    <span className="text-fbc-white/85">&quot;{p.value}&quot;</span>
                    <span className="text-fbc-muted">{i < PAYLOAD.length - 1 ? "," : ""}</span>
                    {p.note && <span className="text-amber-500">{"  "}{"// "}{p.note}</span>}
                    {"\n"}
                  </span>
                ))}
                <span className="text-fbc-muted">{"}"}</span>
              </pre>
            </div>

            <div className="mt-4 flex gap-3 rounded-2xl border border-fbc-border bg-fbc-card/60 p-4">
              <ShieldCheck size={18} className="text-fbc-blue flex-shrink-0 mt-0.5" />
              <p className="text-fbc-muted text-sm leading-relaxed">
                Your project ID must exist on Serverpod Cloud — entries that fail this check aren&apos;t reviewed.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ───────── JUDGING ───────── */}
      <section id="judging" className="relative sec-bg-3 py-16 sm:py-24 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <Eyebrow>Judging</Eyebrow>
              <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white">Two gates to the podium</h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.5fr] gap-6 items-stretch">
            <AnimateOnScroll>
              <div className="h-full rounded-3xl border border-fbc-border bg-fbc-card/90 backdrop-blur p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-fbc-blue">STEP 01</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest rounded-full border border-fbc-border px-2.5 py-1 text-fbc-muted">
                    pass / fail
                  </span>
                </div>
                <ShieldCheck size={28} className="text-fbc-blue mb-4" />
                <h3 className="font-gigasans font-bold text-xl text-fbc-white mb-2">Eligibility check</h3>
                <p className="text-fbc-muted text-sm leading-relaxed">
                  A member of the Serverpod team verifies that your submitted project ID exists on Serverpod Cloud.
                  Entries that fail are out — they don&apos;t move on to the judges.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="hidden lg:flex items-center justify-center text-fbc-blue" aria-hidden="true">
              <ArrowRight size={28} />
            </div>

            <AnimateOnScroll delay={0.1}>
              <div className="h-full rounded-3xl border border-fbc-border bg-fbc-card/90 backdrop-blur p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-fbc-blue">STEP 02</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest rounded-full border border-fbc-border px-2.5 py-1 text-fbc-muted">
                    3 judges
                  </span>
                </div>
                <h3 className="font-gigasans font-bold text-xl text-fbc-white mb-2">Scored review</h3>
                <p className="text-fbc-muted text-sm leading-relaxed mb-5">
                  Three judges review every entry that passes, scoring three criteria:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CRITERIA.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="rounded-2xl border border-fbc-border bg-fbc-navy/40 p-4">
                      <Icon size={18} className="text-fbc-blue mb-3" />
                      <p className="font-gigasans font-semibold text-fbc-white text-sm mb-1">{title}</p>
                      <p className="text-fbc-muted text-xs leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ───────── PRIZES ───────── */}
      <section id="prizes" className="relative sec-plain py-16 sm:py-24 scroll-mt-16 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[36rem] h-72 rounded-full bg-[#E5C07B]/10 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <Eyebrow>Prizes</Eyebrow>
              <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white mb-3">$700 up for grabs</h2>
              <p className="text-fbc-muted max-w-lg mx-auto">Cash, plus matching Serverpod Cloud credits, for the top three builders.</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              {PRIZES.map((p) => (
                <div key={p.place} className={`flex flex-col ${p.order}`}>
                  <div
                    className={`rounded-3xl border bg-fbc-card p-6 text-center ${p.featured ? "shadow-[0_0_40px_rgba(229,192,123,0.25)]" : ""}`}
                    style={{ borderColor: p.featured ? "rgba(229,192,123,0.6)" : undefined }}
                  >
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest mb-4"
                      style={{ color: p.color, background: `${p.color}1f` }}
                    >
                      {p.featured && <Trophy size={13} />}
                      {p.place}
                    </span>
                    <p className="font-gigasans font-bold text-4xl sm:text-5xl text-fbc-white leading-none">{p.total}</p>
                    <p className="text-fbc-muted text-xs mt-2 mb-5">total value</p>
                    <div className="grid grid-cols-2 gap-2 text-left">
                      <div className="rounded-xl border border-fbc-border bg-fbc-navy/40 px-3 py-2">
                        <p className="text-fbc-muted text-[10px] uppercase tracking-wider">Cash</p>
                        <p className="font-gigasans font-semibold text-fbc-white">{p.cash}</p>
                      </div>
                      <div className="rounded-xl border border-fbc-border bg-fbc-navy/40 px-3 py-2">
                        <p className="text-fbc-muted text-[10px] uppercase tracking-wider">Cloud credits</p>
                        <p className="font-gigasans font-semibold text-fbc-white">{p.credits}</p>
                      </div>
                    </div>
                  </div>
                  {/* podium block */}
                  <div
                    className={`hidden sm:flex mt-3 rounded-t-2xl border border-b-0 border-fbc-border items-start justify-center pt-3 font-gigasans font-black text-5xl ${p.podium}`}
                    style={{
                      color: `${p.color}55`,
                      background: `linear-gradient(to bottom, ${p.color}26, transparent)`,
                    }}
                    aria-hidden="true"
                  >
                    {p.place.charAt(0)}
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <p className="text-center text-fbc-muted text-sm mt-8 max-w-xl mx-auto">
            Serverpod Cloud credits go to the three winners only — each winner receives credits equal to their cash prize.
          </p>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="relative sec-bg-1 py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimateOnScroll>
            <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white leading-tight mb-5">
              {phase === "open"
                ? "Seven days. One product. Your name on the FlutterBytes stage."
                : phase === "closed"
                ? "Applications are closed. The podium is next."
                : "That's a wrap on the FlutterBytes × Serverpod Hackathon."}
            </h2>
            <p className="text-fbc-muted mb-8 max-w-xl mx-auto">
              {phase === "open"
                ? "Applications close Friday, October 30 at 11:59pm WAT. Winners are announced live at FlutterBytes Conference 2026."
                : phase === "closed"
                ? "Winners will be announced live at FlutterBytes Conference 2026 — November 6–7, Zone Tech Park, Gbagada, Lagos."
                : "Thank you to everyone who built, shipped, and showed up. See you at the next one."}
            </p>
            <div className="flex justify-center">
              <PrimaryCta phase={phase} />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
