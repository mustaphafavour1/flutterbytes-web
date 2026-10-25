"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Ticket, Trophy, X } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import {
  HACKATHON_APPLY_URL, TICKETS_URL, HACKATHON_OPENS, HACKATHON_CLOSES,
  WINNERS_START, WINNERS_END, hackathonPhase, type HackathonPhase,
} from "@/data/hackathon";

const DAY = 86_400_000;

/* ─────────────────────────── content ─────────────────────────── */

const HERO: Record<HackathonPhase, { status: string; h1a: string; h1b: string; sub: string }> = {
  open: {
    status: "Applications open",
    h1a: "Build it. Ship it.",
    h1b: "Get crowned on stage.",
    sub: "A one-week solo hackathon. Build on Serverpod, ship to Serverpod Cloud, win up to $400.",
  },
  closed: {
    status: "Applications closed",
    h1a: "Submissions are in.",
    h1b: "Judging is underway.",
    sub: "The top three are announced live at FlutterBytes 2026, Nov 6–7.",
  },
  ended: {
    status: "Hackathon concluded",
    h1a: "That's a wrap.",
    h1b: "Winners crowned on stage.",
    sub: "The winners were announced live at FlutterBytes 2026 in Lagos.",
  },
};

type Line = { kind: "cmd" | "ok" | "live" | "next" | "comment"; text: string };

const TERMINAL: Record<HackathonPhase, { title: string; lines: Line[] }> = {
  open: {
    title: "ship-it.sh",
    lines: [
      { kind: "cmd", text: "serverpod create my_product" },
      { kind: "ok", text: "project created" },
      { kind: "cmd", text: "scloud deploy" },
      { kind: "ok", text: "live on Serverpod Cloud" },
      { kind: "comment", text: "submit: project ID, live link, demo video" },
      { kind: "ok", text: "entry in; judging starts Oct 30" },
    ],
  },
  closed: {
    title: "status.log",
    lines: [
      { kind: "cmd", text: "cat status.log" },
      { kind: "ok", text: "applications closed" },
      { kind: "live", text: "judging in progress" },
      { kind: "next", text: "winners: live at FBC, Nov 6–7" },
    ],
  },
  ended: {
    title: "status.log",
    lines: [
      { kind: "cmd", text: "cat status.log" },
      { kind: "ok", text: "applications closed" },
      { kind: "ok", text: "judging complete" },
      { kind: "ok", text: "winners announced at FBC 2026" },
    ],
  },
};

const STAGES = [
  { key: "open",  label: "Hackathon opens",    date: "Oct 23",               start: HACKATHON_OPENS,  end: HACKATHON_OPENS },
  { key: "build", label: "Build & deploy",     date: "Oct 23–30",            start: HACKATHON_OPENS,  end: HACKATHON_CLOSES },
  { key: "close", label: "Applications close", date: "Oct 30, 11:59pm WAT",  start: HACKATHON_CLOSES, end: HACKATHON_CLOSES },
  { key: "judge", label: "Judging",            date: "Oct 30–Nov 6",         start: HACKATHON_CLOSES, end: WINNERS_START },
  { key: "crown", label: "Winners at FBC",     date: "Nov 6–7",              start: WINNERS_START,    end: WINNERS_END },
];

type StageStatus = "done" | "live" | "next";
const stageStatus = (s: (typeof STAGES)[number], now: number): StageStatus =>
  now >= s.end ? "done" : now >= s.start ? "live" : "next";

const RULES = [
  { emoji: "🧑‍💻", title: "Solo builds",        sub: "Individuals only",    detail: "Each entry comes from one person.",                         label: "Teams",       value: "Not allowed" },
  { emoji: "⚙️",   title: "Built on Serverpod", sub: "Backend framework",   detail: "Your product runs on a Serverpod backend.",                 label: "Must use",    value: "Serverpod" },
  { emoji: "☁️",   title: "Live on the cloud",  sub: "Serverpod Cloud",     detail: "Your product is deployed and running on Serverpod Cloud.",  label: "Verified by", value: "The Serverpod team" },
  { emoji: "🔒",   title: "Closed source",      sub: "Code stays private",  detail: "Keep your code private and keep ownership of your product.", label: "Ownership",   value: "Stays with you" },
  { emoji: "🛠️",   title: "Keep building",      sub: "After the hackathon", detail: "Your product is yours to keep shipping.",                   label: "Roadmap",     value: "Yours to decide" },
];

const SUBMIT_ITEMS: [string, string][] = [
  ["Project ID", "From Serverpod Cloud"],
  ["Description", "The product + the problem it solves"],
  ["Live link", "To the running product"],
  ["Demo video", "Short; required"],
];

const CRITERIA: [string, string][] = [
  ["Finish & polish", "Works from start to end"],
  ["Problem clarity", "Who it's for, and why"],
  ["Completeness", "Delivers what it set out to build"],
];

const PRIZES = [
  { place: "1st", total: "$400", cash: "$200", credits: "$200", color: "#E5C07B", podium: "sm:h-44", order: "order-1 sm:order-2", featured: true },
  { place: "2nd", total: "$200", cash: "$100", credits: "$100", color: "#94A3B8", podium: "sm:h-32", order: "order-2 sm:order-1", featured: false },
  { place: "3rd", total: "$100", cash: "$50",  credits: "$50",  color: "#B87333", podium: "sm:h-24", order: "order-3",            featured: false },
];

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-gigasans font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_24px_rgba(42,157,244,0.45)]";

/* ─────────────────────────── pieces ─────────────────────────── */

function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.2em] text-fbc-blue mb-3 ${center ? "text-center" : ""}`}>
      {children}
    </p>
  );
}

function Countdown({ target, serverNow, offset, label }: { target: number; serverNow: number; offset: number; label: string }) {
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
    <div className="flex items-center gap-3">
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-fbc-muted/70 whitespace-nowrap">{label}</span>
      <div className="flex gap-1.5">
        {units.map(([v, l]) => (
          <div key={l} className="w-11 sm:w-12 rounded-lg border border-fbc-border bg-fbc-card/70 backdrop-blur py-1.5 text-center">
            <div className="font-gigasans font-semibold text-base sm:text-lg text-fbc-blue tabular-nums leading-none">
              {String(v).padStart(2, "0")}
            </div>
            <div className="text-fbc-muted text-[8px] uppercase tracking-wider mt-1">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Terminal({ title, lines }: { title: string; lines: Line[] }) {
  const mark: Record<Line["kind"], { sym: string; cls: string }> = {
    cmd: { sym: "❯", cls: "text-fbc-blue" },
    ok: { sym: "✓", cls: "text-emerald-500" },
    live: { sym: "●", cls: "text-amber-500" },
    next: { sym: "○", cls: "text-fbc-muted" },
    comment: { sym: "#", cls: "text-fbc-muted/60" },
  };
  return (
    <div className="rounded-2xl overflow-hidden border border-fbc-border shadow-2xl" style={{ background: "rgb(var(--color-card) / 0.97)" }}>
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-fbc-border" style={{ background: "rgb(var(--color-navy) / 0.95)" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-fbc-muted/70">{title}</span>
      </div>
      <div className="px-5 sm:px-6 pt-5 pb-12 font-mono text-[12px] sm:text-[13px] leading-7">
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
              <span className={l.kind === "cmd" ? "text-fbc-white" : l.kind === "comment" ? "text-fbc-muted/60 italic" : "text-fbc-muted"}>
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

/* Eligibility rule: base column + the expanded card shown when active */
function RuleBase({ r }: { r: (typeof RULES)[number] }) {
  return (
    <>
      <span className="block text-4xl leading-none" aria-hidden="true">{r.emoji}</span>
      <p className="font-gigasans font-semibold text-lg xl:text-xl text-fbc-white mt-6">{r.title}</p>
      <p className="text-fbc-muted text-xs mt-1">{r.sub}</p>
    </>
  );
}

function RuleDetail({ r }: { r: (typeof RULES)[number] }) {
  return (
    <>
      <p className="text-fbc-muted text-sm leading-relaxed">{r.detail}</p>
      <div className="mt-5 pt-4 border-t border-fbc-border/70">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-fbc-muted/70">{r.label}</p>
        <p className="text-sm text-fbc-blue mt-1">{r.value}</p>
      </div>
    </>
  );
}

function RulesRow() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  // Auto-cycle the highlighted rule until the visitor hovers one.
  useEffect(() => {
    if (hovering) return;
    const id = setInterval(() => setActive((a) => (a + 1) % RULES.length), 3200);
    return () => clearInterval(id);
  }, [hovering]);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-5 border-b border-fbc-border/70 divide-y divide-fbc-border/70 lg:divide-y-0 lg:divide-x"
      onMouseLeave={() => setHovering(false)}
    >
      {RULES.map((r, i) => (
        <div
          key={r.title}
          className="relative px-6 py-8"
          onMouseEnter={() => { setHovering(true); setActive(i); }}
        >
          <RuleBase r={r} />
          {/* phones/tablets: details inline */}
          <div className="lg:hidden mt-5"><RuleDetail r={r} /></div>

          {/* desktop: lifted card for the active rule */}
          <AnimatePresence>
            {active === i && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="hidden lg:block absolute inset-x-0 top-0 z-20 rounded-xl border border-fbc-border bg-fbc-card px-6 pt-8 pb-7 shadow-2xl"
              >
                <RuleBase r={r} />
                <div className="mt-5"><RuleDetail r={r} /></div>
                <span className="absolute bottom-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-fbc-blue to-transparent" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
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
  const hero = HERO[phase];
  const term = TERMINAL[phase];

  const statuses = STAGES.map((s) => stageStatus(s, now));
  const reached = statuses.reduce((acc, st, i) => (st !== "next" ? i : acc), -1);
  const fill = Math.max(0, reached) / (STAGES.length - 1);

  const countdown =
    phase === "open"
      ? { label: "Closes in", target: HACKATHON_CLOSES }
      : phase === "closed" && now < WINNERS_START
      ? { label: "Winners in", target: WINNERS_START }
      : null;

  const pill =
    phase === "open"
      ? { href: HACKATHON_APPLY_URL, label: "Apply as a solo builder", external: true }
      : phase === "closed"
      ? { href: TICKETS_URL, label: "Get tickets to see the winners", external: true }
      : { href: "/", label: "Explore FlutterBytes 2026", external: false };

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden sec-plain pt-28 sm:pt-32 pb-20 sm:pb-28">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(42,157,244,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        <div className="absolute -top-24 right-0 w-[30rem] h-[30rem] rounded-full bg-fbc-blue/15 blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
          {/* Left: message */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-fbc-border/70 px-2.5 py-1 mb-6">
              <span className="relative flex h-1.5 w-1.5">
                {phase === "open" && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                )}
                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${phase === "open" ? "bg-emerald-500" : "bg-fbc-muted"}`} />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-fbc-muted">{hero.status}</span>
            </div>

            <motion.h1
              key={phase}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-gigasans font-bold text-4xl sm:text-5xl xl:text-[3.25rem] leading-[1.05] tracking-tight text-balance text-fbc-white mb-5"
            >
              <span className="block">{hero.h1a}</span>
              <span className="block text-fbc-blue">{hero.h1b}</span>
            </motion.h1>

            <p className="text-fbc-muted text-sm sm:text-base leading-relaxed max-w-md mb-8">{hero.sub}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <PrimaryCta phase={phase} />
              <a
                href={phase === "open" ? "#how" : "#prizes"}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-fbc-muted hover:text-fbc-white transition-colors"
              >
                {phase === "open" ? "How it works" : "See the prizes"} <ArrowDown size={14} />
              </a>
            </div>
            {phase === "open" && (
              <p className="text-fbc-muted/60 text-xs mt-4">Closes Fri, Oct 30 · 11:59pm WAT</p>
            )}
          </div>

          {/* Right: terminal + stickers + countdown */}
          <div>
            <div className="relative">
              {/* FBC × Serverpod sticker, top-right */}
              <div className="absolute -top-5 right-3 sm:-right-3 z-20 flex items-center gap-2 rounded-full bg-white border border-slate-200 pl-3.5 pr-2 h-10 shadow-xl">
                <Image src="/logo-light.png" alt="FlutterBytes" width={654} height={129} className="h-5 w-auto" priority />
                <span className="font-mono text-[10px] text-slate-400">×</span>
                <span className="relative block h-6 w-[84px] overflow-hidden">
                  <Image
                    src="/sponsors/serverpod.png"
                    alt="Serverpod"
                    width={104}
                    height={77}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none"
                    style={{ width: 104, height: 77 }}
                    priority
                  />
                </span>
              </div>

              <Terminal key={phase} title={term.title} lines={term.lines} />

              {/* $700 sticker, bottom-left */}
              <div className="absolute -bottom-5 left-3 sm:-left-3 z-20 flex items-center gap-2.5 rounded-2xl border border-fbc-border bg-fbc-card px-4 py-2.5 shadow-xl animate-float">
                <span className="flex w-8 h-8 items-center justify-center rounded-xl bg-[#E5C07B]/15">
                  <Trophy size={16} style={{ color: "#E5C07B" }} />
                </span>
                <div>
                  <p className="font-gigasans font-bold text-fbc-white leading-tight">$700</p>
                  <p className="text-fbc-muted text-[10px]">in prizes</p>
                </div>
              </div>
            </div>

            {countdown && (
              <div className="mt-11 flex justify-end">
                <Countdown target={countdown.target} serverNow={serverNow} offset={offset} label={countdown.label} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────── TIMELINE ───────── */}
      <section id="timeline" className="relative sec-bg-2 py-16 sm:py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-10">
              <Eyebrow center>Timeline</Eyebrow>
              <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white">One week to ship</h2>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <div className="rounded-3xl border border-fbc-border bg-fbc-card/85 backdrop-blur p-6 sm:p-10">
              <ol className="relative grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-4">
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
                        <p className={`font-gigasans font-semibold leading-snug ${st === "next" ? "text-fbc-white/70" : "text-fbc-white"}`}>
                          {s.label}
                          {st === "live" && (
                            <span className="ml-2 align-middle font-mono text-[9px] uppercase tracking-widest rounded-full bg-fbc-blue/15 text-fbc-blue px-2 py-0.5">
                              now
                            </span>
                          )}
                        </p>
                        <p className="font-mono text-xs text-fbc-blue mt-1">{s.date}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ───────── ELIGIBILITY ───────── */}
      <section id="rules" className="relative sec-plain py-20 sm:py-28 scroll-mt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <Eyebrow center>Eligibility</Eyebrow>
            <h2 className="font-gigasans font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-center mb-14 lg:mb-16">
              <span className="block text-fbc-white">Build solo.</span>
              <span className="block text-fbc-muted/45">Ship it live.</span>
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <RulesRow />
          </AnimateOnScroll>

          <div className="flex justify-center mt-12 lg:mt-48">
            <a
              href={pill.href}
              {...(pill.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group inline-flex items-center gap-3 rounded-full border border-fbc-border bg-fbc-card/50 backdrop-blur px-7 py-4 text-sm sm:text-base text-fbc-white hover:border-fbc-blue/60 transition-all"
            >
              {pill.label}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ───────── HOW IT WORKS: SUBMIT → VERIFY → SCORE ───────── */}
      <section id="how" className="relative sec-bg-3 py-16 sm:py-24 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <Eyebrow center>How it works</Eyebrow>
              <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white">Submit. Verify. Score.</h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 01 Submit */}
            <AnimateOnScroll>
              <div className="relative h-full overflow-hidden rounded-3xl border border-fbc-border bg-fbc-card/90 backdrop-blur p-7">
                <span className="absolute right-6 top-5 font-gigasans font-black text-6xl leading-none text-fbc-blue/15 select-none" aria-hidden="true">01</span>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fbc-blue">By Oct 30</p>
                <h3 className="font-gigasans font-bold text-2xl text-fbc-white mt-2 mb-5">Submit</h3>
                <ul className="space-y-3">
                  {SUBMIT_ITEMS.map(([a, b]) => (
                    <li key={a} className="flex gap-2.5">
                      <Check size={15} className="text-emerald-500 mt-0.5 flex-shrink-0" strokeWidth={3} />
                      <div>
                        <p className="text-sm text-fbc-white leading-tight">{a}</p>
                        <p className="text-xs text-fbc-muted mt-0.5">{b}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>

            {/* 02 Verify */}
            <AnimateOnScroll delay={0.08}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-fbc-border bg-fbc-card/90 backdrop-blur p-7">
                <span className="absolute right-6 top-5 font-gigasans font-black text-6xl leading-none text-fbc-blue/15 select-none" aria-hidden="true">02</span>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fbc-blue">Pass or fail</p>
                <h3 className="font-gigasans font-bold text-2xl text-fbc-white mt-2 mb-5">Verify</h3>
                <p className="text-sm text-fbc-muted leading-relaxed">
                  The Serverpod team checks that your project ID exists on Serverpod Cloud.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-500">
                    <Check size={12} strokeWidth={3} /> Pass: judged
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-fbc-border px-3 py-1 text-xs text-fbc-muted">
                    <X size={12} strokeWidth={3} /> Fail: out
                  </span>
                </div>
              </div>
            </AnimateOnScroll>

            {/* 03 Score */}
            <AnimateOnScroll delay={0.16}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-fbc-border bg-fbc-card/90 backdrop-blur p-7">
                <span className="absolute right-6 top-5 font-gigasans font-black text-6xl leading-none text-fbc-blue/15 select-none" aria-hidden="true">03</span>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fbc-blue">3 judges</p>
                <h3 className="font-gigasans font-bold text-2xl text-fbc-white mt-2 mb-5">Score</h3>
                <ul className="space-y-3">
                  {CRITERIA.map(([a, b]) => (
                    <li key={a} className="flex gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-fbc-blue flex-shrink-0" />
                      <div>
                        <p className="text-sm text-fbc-white leading-tight">{a}</p>
                        <p className="text-xs text-fbc-muted mt-0.5">{b}</p>
                      </div>
                    </li>
                  ))}
                </ul>
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
              <Eyebrow center>Prizes</Eyebrow>
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
                  {/* podium block: faded, tilted 1st / 2nd / 3rd */}
                  <div
                    className={`hidden sm:flex relative mt-3 rounded-t-2xl border border-b-0 border-fbc-border items-center justify-center overflow-hidden ${p.podium}`}
                    style={{ background: `linear-gradient(to bottom, ${p.color}26, transparent)` }}
                    aria-hidden="true"
                  >
                    <span
                      className="font-gigasans font-black text-7xl leading-none select-none opacity-20"
                      style={{ color: p.color, transform: "rotate(-30deg)" }}
                    >
                      {p.place}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <p className="text-center text-fbc-muted text-sm mt-8 max-w-xl mx-auto">
            Only the three winners get Serverpod credits; equal to their cash prizes
          </p>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="relative sec-bg-1 py-20 sm:py-24 overflow-hidden">
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <AnimateOnScroll>
            <h2 className="font-gigasans font-bold text-4xl md:text-5xl text-fbc-white leading-tight mb-4">
              {phase === "open" ? "Ready to ship?" : phase === "closed" ? "Applications are closed." : "That's a wrap."}
            </h2>
            <p className="text-fbc-muted text-sm sm:text-base mb-8">
              {phase === "open"
                ? "Applications close Fri, Oct 30 · 11:59pm WAT."
                : phase === "closed"
                ? "See the winners crowned live at FlutterBytes 2026, Nov 6–7."
                : "Thank you to every builder who shipped."}
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
