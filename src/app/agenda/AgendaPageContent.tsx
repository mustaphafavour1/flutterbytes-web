"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ClipboardCheck, Coffee, Gamepad2, Gift, Handshake, MessagesSquare, MonitorPlay,
  Sparkles, Trophy, type LucideIcon,
} from "lucide-react";
import type { AgendaSession } from "@/data/fallback-agenda";
import {
  AGENDA_2026, atWAT, dayStats, daySegments, durationMin, fmtRange, fmtTime,
  type AgendaDay, type AgendaItem, type Hall, type PlenaryItem, type PlenaryKind, type Talk, type TalkKind,
} from "@/data/agenda-2026";

interface Props {
  photos: Record<string, string>;
  pastSessions: AgendaSession[];
  serverNow: number;
}

type Photos = Record<string, string>;
type HallFilter = Hall | "all";

/* ─────────────── look ─────────────── */

/** Gem colours for the halls (Opal is iridescent). */
const HALL_SWATCH: Record<Hall, string> = {
  Ruby: "#E11D48",
  Sapphire: "#2563EB",
  Opal: "linear-gradient(135deg, #A5F3FC, #F9A8D4, #C4B5FD)",
};

const KIND_TEXT: Record<TalkKind, string> = {
  Keynote: "text-amber-600 dark:text-amber-400",
  Workshop: "text-violet-600 dark:text-violet-400",
  Session: "text-fbc-blue",
  "Lightning talk": "text-orange-600 dark:text-orange-400",
};

const PLENARY_ICON: Record<PlenaryKind, LucideIcon> = {
  registration: ClipboardCheck, opening: Sparkles, games: Gamepad2, break: Coffee, sponsor: Handshake,
  demo: MonitorPlay, panel: MessagesSquare, hackathon: Trophy, closing: Gift,
};

const KEYNOTE_RING = {
  "--ring-w": "1px",
  "--ring-bg": "linear-gradient(135deg, rgba(229,192,123,0.95), rgba(229,192,123,0.15) 60%, rgba(229,192,123,0.5))",
  background: "linear-gradient(135deg, rgba(229,192,123,0.12), rgb(var(--color-card) / 0.55) 55%)",
} as React.CSSProperties;

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
const andList = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} & ${xs[xs.length - 1]}`);

/** "Ruby" cells etc. for a talks slot, honouring the hall filter (null = nothing to show). */
function slotCells(item: Extract<AgendaItem, { type: "talks" }>, day: AgendaDay, hall: HallFilter) {
  if (item.talks.length === 1) return [{ hall: item.talks[0].hall, talks: item.talks }]; // whole audience
  const halls = hall === "all" ? day.halls : [hall];
  const cells = halls.map((h) => ({ hall: h, talks: item.talks.filter((x) => x.hall === h) }));
  return hall !== "all" && !cells[0].talks.length ? null : cells;
}

/** e.g. "3 workshops · 4 sessions", counting only what the hall filter shows. */
function chapterSummary(items: AgendaItem[], hall: HallFilter) {
  const talks = items.flatMap((i) =>
    i.type !== "talks" ? [] : hall === "all" || i.talks.length === 1 ? i.talks : i.talks.filter((x) => x.hall === hall)
  );
  if (!talks.length) return items.map((i) => (i.type === "plenary" ? i.title : "")).filter(Boolean).join(" · ");
  const kinds: TalkKind[] = ["Keynote", "Workshop", "Session", "Lightning talk"];
  return kinds
    .map((k) => [k, talks.filter((x) => x.kind === k).length] as const)
    .filter(([, n]) => n)
    .map(([k, n]) => plural(n, k.toLowerCase()))
    .join(" · ");
}

/* ─────────────── pieces ─────────────── */

function Swatch({ hall, className = "w-2 h-2" }: { hall: Hall; className?: string }) {
  return <span className={`${className} rounded-full flex-shrink-0`} style={{ background: HALL_SWATCH[hall] }} aria-hidden="true" />;
}

function Avatar({ name, photo, size }: { name: string; photo?: string; size: number }) {
  const ring = "rounded-full ring-2 ring-fbc-card flex-shrink-0";
  if (photo) {
    return <Image src={photo} alt="" width={size * 2} height={size * 2} className={`${ring} object-cover`} style={{ width: size, height: size }} />;
  }
  return (
    <span
      className={`${ring} flex items-center justify-center bg-fbc-blue/15 text-fbc-blue font-semibold`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
      aria-hidden="true"
    >
      {name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
    </span>
  );
}

function Speakers({ names, photos }: { names: string[]; photos: Photos }) {
  return (
    <div className="flex items-center gap-2.5 mt-3">
      <div className="flex -space-x-2">
        {names.map((n) => <Avatar key={n} name={n} photo={photos[n]} size={26} />)}
      </div>
      <p className="text-sm text-fbc-muted leading-tight">{names.join(" & ")}</p>
    </div>
  );
}

function KindTag({ kind }: { kind: TalkKind }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold whitespace-nowrap ${KIND_TEXT[kind]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
      {kind}
    </span>
  );
}

/** One hall's column inside a time slot. */
function HallCell({ hall, talks, photos }: { hall: Hall; talks: Talk[]; photos: Photos }) {
  return (
    <div className="relative p-4 sm:p-5">
      <span className="absolute top-0 left-4 right-4 sm:left-5 sm:right-5 h-[2px] rounded-b-full opacity-80" style={{ background: HALL_SWATCH[hall] }} aria-hidden="true" />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fbc-muted">{hall} Hall</p>
      {talks.length ? (
        talks.map((talk, i) => (
          <div key={talk.title ?? talk.speakers[0]} className={i ? "mt-4 pt-4 border-t border-fbc-border/60" : "mt-2.5"}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <KindTag kind={talk.kind} />
              {talk.start && talk.end && (
                <span className="font-mono text-[11px] text-fbc-muted tabular-nums">{fmtRange(talk.start, talk.end)}</span>
              )}
            </div>
            <h3 className="mt-1.5 font-gigasans font-semibold text-[15px] leading-snug text-fbc-white">{talk.title}</h3>
            <Speakers names={talk.speakers} photos={photos} />
          </div>
        ))
      ) : (
        <p className="mt-2.5 text-sm text-fbc-muted/60 italic">No session</p>
      )}
    </div>
  );
}

function KeynotePanel({ talk, photos }: { talk: Talk; photos: Photos }) {
  const name = talk.speakers[0];
  return (
    <div className="grad-ring relative rounded-2xl p-5 sm:p-6" style={KEYNOTE_RING}>
      <div className="flex items-center gap-4 sm:gap-5">
        <span className="sm:hidden"><Avatar name={name} photo={photos[name]} size={48} /></span>
        <span className="hidden sm:block"><Avatar name={name} photo={photos[name]} size={64} /></span>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Keynote · {talk.hall} Hall
          </p>
          <p className="font-gigasans font-bold text-xl sm:text-3xl leading-tight text-fbc-white mt-1">{name}</p>
          {talk.title && <p className="text-sm text-fbc-muted mt-1">{talk.title}</p>}
        </div>
      </div>
    </div>
  );
}

function PlenaryLine({ item }: { item: PlenaryItem }) {
  const Icon = PLENARY_ICON[item.kind];
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="flex w-8 h-8 flex-shrink-0 items-center justify-center rounded-lg bg-fbc-blue/10 text-fbc-blue">
        <Icon size={15} />
      </span>
      <div className="min-w-0">
        <p className="font-gigasans font-semibold text-fbc-white leading-tight">{item.title}</p>
        {item.speakers && <p className="text-xs text-fbc-muted mt-0.5">{item.speakers.join(" & ")}</p>}
      </div>
      {item.href ? (
        <Link href={item.href} className="group ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-fbc-blue whitespace-nowrap">
          See the hackathon <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <span className="ml-auto hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-fbc-muted/70 whitespace-nowrap">All halls</span>
      )}
    </div>
  );
}

function RailNode({ state, gold }: { state: "done" | "live" | "next"; gold?: boolean }) {
  if (state === "live") {
    return (
      <span className="relative flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
      </span>
    );
  }
  if (state === "done") return <span className="block h-3 w-3 rounded-full bg-fbc-blue" />;
  return <span className={`block h-3 w-3 rounded-full border-2 bg-fbc-navy ${gold ? "border-amber-500" : "border-fbc-border"}`} />;
}

function RailItem({ item, day, hall, photos, now }: { item: AgendaItem; day: AgendaDay; hall: HallFilter; photos: Photos; now: number }) {
  const start = atWAT(day.date, item.start);
  const end = atWAT(day.date, item.end);
  const state = now >= end ? "done" : now >= start ? "live" : "next";
  const over = state === "done" && now < atWAT(day.date, "23:59");

  let content: React.ReactNode;
  let gold = false;
  if (item.type === "plenary") {
    content = <PlenaryLine item={item} />;
  } else if (item.talks.length === 1 && item.talks[0].kind === "Keynote") {
    gold = true;
    content = <KeynotePanel talk={item.talks[0]} photos={photos} />;
  } else {
    const cells = slotCells(item, day, hall);
    if (!cells) return null;
    const cols = cells.length === 3 ? "lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x" : cells.length === 2 ? "md:grid-cols-2 divide-y md:divide-y-0 md:divide-x" : "";
    content = (
      <div className="rounded-2xl border border-fbc-border bg-fbc-card/50 backdrop-blur-sm overflow-hidden">
        <div className={`grid grid-cols-1 divide-fbc-border/70 ${cols}`}>
          {cells.map((c) => <HallCell key={c.hall} hall={c.hall} talks={c.talks} photos={photos} />)}
        </div>
      </div>
    );
  }

  const [hm, ampm] = fmtTime(item.start).split(" ");
  return (
    <li
      id={`${day.id}-${item.start}`}
      className={`relative grid grid-cols-[3.25rem_1.25rem_minmax(0,1fr)] sm:grid-cols-[4.75rem_2rem_minmax(0,1fr)] gap-x-2 sm:gap-x-3 scroll-mt-24 transition-opacity ${over ? "opacity-50" : ""}`}
    >
      <div className="text-right pt-0.5">
        <p className="font-gigasans font-semibold text-fbc-white tabular-nums leading-none">
          {hm}<span className="ml-0.5 text-[10px] font-medium text-fbc-muted">{ampm}</span>
        </p>
        <p className="font-mono text-[10px] text-fbc-muted mt-1">{durationMin(item.start, item.end)}m</p>
        {state === "live" && <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-500">Now</p>}
      </div>
      <div className="relative flex justify-center">
        <span className="absolute inset-y-0 w-px bg-fbc-border/70" aria-hidden="true" />
        <span className="relative block mt-1"><RailNode state={state} gold={gold} /></span>
      </div>
      <div className={`min-w-0 pb-6 ${state === "live" ? "[&>*]:ring-2 [&>*]:ring-emerald-500/40 [&>*]:rounded-2xl" : ""}`}>{content}</div>
    </li>
  );
}

function BreakDivider({ item, day, now }: { item: PlenaryItem; day: AgendaDay; now: number }) {
  const live = now >= atWAT(day.date, item.start) && now < atWAT(day.date, item.end);
  return (
    <div className="flex items-center gap-3 my-4 sm:my-6">
      <span className="h-px flex-1 border-t border-dashed border-fbc-border" />
      <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs ${live ? "border-emerald-500/50 text-emerald-500" : "border-fbc-border bg-fbc-card/60 text-fbc-muted"}`}>
        <Coffee size={13} className={live ? "" : "text-fbc-blue"} />
        <span className="font-semibold text-fbc-white">{item.title}</span>
        <span className="tabular-nums">{fmtRange(item.start, item.end)}</span>
        {live && <span className="font-semibold uppercase tracking-wider">· Now</span>}
      </span>
      <span className="h-px flex-1 border-t border-dashed border-fbc-border" />
    </div>
  );
}

function NowBar({ day, now }: { day: AgendaDay; now: number }) {
  const live = day.items.find((i) => now >= atWAT(day.date, i.start) && now < atWAT(day.date, i.end));
  if (!live) return null;
  const label =
    live.type === "plenary"
      ? live.title
      : live.talks.length === 1
      ? live.talks[0].title ?? `${live.talks[0].kind}: ${live.talks[0].speakers.join(" & ")}`
      : `${live.talks.length} talks in ${andList(Array.from(new Set(live.talks.map((x) => x.hall))))}`;
  return (
    <button
      type="button"
      onClick={() => document.getElementById(`${day.id}-${live.start}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
      className="group mb-8 flex w-full items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-left"
    >
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Happening now</span>
      <span className="min-w-0 truncate text-sm text-fbc-white">{label}</span>
      <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-emerald-500 whitespace-nowrap">
        Jump <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}

function DayItinerary({ day, hall, photos, now }: { day: AgendaDay; hall: HallFilter; photos: Photos; now: number }) {
  return (
    <div>
      <NowBar day={day} now={now} />
      {daySegments(day).map((seg) =>
        seg.kind === "break" ? (
          <BreakDivider key={seg.item.start} item={seg.item} day={day} now={now} />
        ) : (
          <motion.section
            key={seg.index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 110, damping: 20 }}
            className="pt-2"
          >
            <header className="flex items-end gap-3 sm:gap-4 mb-6">
              <span className="font-gigasans font-black text-5xl sm:text-6xl leading-[0.8] text-fbc-blue/20 select-none" aria-hidden="true">
                {String(seg.index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h2 className="font-gigasans font-bold text-2xl sm:text-3xl leading-none text-fbc-white">{seg.title}</h2>
                <p className="text-xs sm:text-sm text-fbc-muted mt-1.5">
                  <span className="tabular-nums">{fmtRange(seg.items[0].start, seg.items[seg.items.length - 1].end)}</span>
                  <span className="mx-1.5 opacity-50">·</span>
                  {chapterSummary(seg.items, hall)}
                </p>
              </div>
            </header>
            <ol>
              {seg.items.map((item) => (
                <RailItem key={item.start} item={item} day={day} hall={hall} photos={photos} now={now} />
              ))}
            </ol>
          </motion.section>
        )
      )}
    </div>
  );
}

/* ── GitHub-contribution-style grid for past tab ── */
function PastSessionsGrid({ sessions }: { sessions: AgendaSession[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ROWS = 4;
  const perRow = Math.ceil(sessions.length / ROWS);
  const rows = Array.from({ length: ROWS }, (_, r) =>
    sessions.slice(r * perRow, (r + 1) * perRow)
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let rafId: number;
    let paused = false;
    let resumeId: ReturnType<typeof setTimeout>;
    const pause = () => {
      paused = true;
      clearTimeout(resumeId);
      resumeId = setTimeout(() => { paused = false; }, 2000);
    };
    const tick = () => {
      if (!paused) el.scrollLeft += 0.5;
      rafId = requestAnimationFrame(tick);
    };
    el.addEventListener("wheel", pause, { passive: true });
    el.addEventListener("mousedown", pause, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeId);
      el.removeEventListener("wheel", pause);
      el.removeEventListener("mousedown", pause);
    };
  }, []);

  return (
    <div ref={scrollRef} className="overflow-x-auto scrollbar-hide pb-2">
      <div className="inline-flex flex-col gap-2" style={{ minWidth: "max-content" }}>
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-2">
            {row.map((session, ci) => {
              const idx = ri * perRow + ci;
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={ci}
                  className="relative flex-shrink-0 rounded-xl cursor-pointer"
                  style={{
                    width: 270,
                    height: 135,
                    border: `1px solid ${isHovered ? "rgba(42,157,244,0.35)" : "rgba(42,157,244,0.08)"}`,
                    background: isHovered ? "rgba(42,157,244,0.16)" : "rgba(42,157,244,0.04)",
                    transition: "border-color 0.18s, background 0.18s",
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="p-3 h-full flex flex-col justify-between">
                    <p style={{ color: isHovered ? "rgb(var(--color-white) / 0.9)" : "rgb(var(--color-muted) / 0.6)", fontSize: 13, fontWeight: 700 }} className="line-clamp-2 leading-snug">{session.session}</p>
                    <div style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.18s", borderTop: "1px solid rgba(42,157,244,0.22)", paddingTop: 4 }}>
                      <div className="flex items-center justify-between">
                        <span style={{ fontSize: 9, color: "#38BDF8", fontWeight: 600 }}>{session.type ?? session.time}</span>
                        <span style={{ fontSize: 9, color: "rgb(var(--color-muted))" }}>{session.hall}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 9, color: isHovered ? "rgb(var(--color-muted) / 0.8)" : "rgb(var(--color-muted) / 0.4)" }} className="truncate">{session.speaker.split(",")[0]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── page ─────────────── */

type TabId = "fri" | "sat" | "past";

export default function AgendaPageContent({ photos, pastSessions, serverNow }: Props) {
  // Open on Saturday's schedule on Saturday (WAT), otherwise on Friday's.
  const onSaturday = (t: number) => t >= atWAT("2026-11-07", "00:00") && t < atWAT("2026-11-08", "00:00");
  const [tab, setTab] = useState<TabId>(onSaturday(serverNow) ? "sat" : "fri");
  const [hall, setHall] = useState<HallFilter>("all");
  const [now, setNow] = useState(serverNow);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const day = AGENDA_2026.find((d) => d.id === tab);
  const activeHall: HallFilter = day && hall !== "all" && day.halls.includes(hall) ? hall : "all";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Day switcher */}
      <div className="grid grid-cols-2 gap-3 mb-6 sm:flex sm:flex-wrap sm:items-stretch" role="tablist" aria-label="Conference days">
        {AGENDA_2026.map((d, i) => {
          const active = tab === d.id;
          const s = dayStats(d);
          return (
            <button
              key={d.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(d.id)}
              className={`relative sm:min-w-[220px] text-left rounded-2xl border px-4 sm:px-5 py-3 transition-colors ${
                active ? "border-transparent" : "border-fbc-border bg-fbc-card/50 hover:border-fbc-blue/50"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="agenda-day"
                  className="absolute inset-0 rounded-2xl bg-fbc-blue shadow-[0_0_24px_rgba(42,157,244,0.35)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative block font-mono text-[10px] uppercase tracking-[0.2em] ${active ? "text-white/80" : "text-fbc-blue"}`}>
                Day {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`relative block font-gigasans font-semibold text-base sm:text-lg ${active ? "text-white" : "text-fbc-white"}`}>
                {d.label}
              </span>
              <span className={`relative block text-xs ${active ? "text-white/75" : "text-fbc-muted"}`}>
                <span className="hidden sm:inline">{fmtRange(s.start, s.end)} · </span>{plural(s.speakers, "speaker")}
              </span>
            </button>
          );
        })}
        <button
          role="tab"
          aria-selected={tab === "past"}
          onClick={() => setTab("past")}
          className={`col-span-2 justify-self-start sm:self-center rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            tab === "past" ? "bg-fbc-blue text-white" : "text-fbc-muted hover:text-fbc-white"
          }`}
        >
          Past editions
        </button>
      </div>

      {/* Hall filter */}
      {day && (
        <div className="flex flex-wrap items-center gap-2 mb-10" role="group" aria-label="Filter by hall">
          {(["all", ...day.halls] as HallFilter[]).map((h) => {
            const active = activeHall === h;
            return (
              <button
                key={h}
                type="button"
                aria-pressed={active}
                onClick={() => setHall(h)}
                className={`relative inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  active ? "border-fbc-blue/60 text-fbc-white" : "border-fbc-border text-fbc-muted hover:text-fbc-white"
                }`}
              >
                {active && (
                  <motion.span layoutId="agenda-hall" className="absolute inset-0 rounded-full bg-fbc-blue/15" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                {h !== "all" && <Swatch hall={h} className="relative w-2.5 h-2.5" />}
                <span className="relative">{h === "all" ? "All halls" : `${h} Hall`}</span>
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {day ? (
            <DayItinerary day={day} hall={activeHall} photos={photos} now={now} />
          ) : (
            <div className="rounded-3xl overflow-hidden border border-fbc-border bg-fbc-card/40 backdrop-blur p-6">
              <p className="text-fbc-muted text-sm mb-6">
                A combined view of some sessions from past FlutterBytes editions.
              </p>
              <PastSessionsGrid sessions={pastSessions} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
