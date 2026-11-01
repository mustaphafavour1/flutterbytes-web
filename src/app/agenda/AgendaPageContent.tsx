"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CalendarDays, ClipboardCheck, Coffee, Gamepad2, Gift, Handshake, MapPin,
  MessagesSquare, MonitorPlay, Sparkles, Trophy, Users, type LucideIcon,
} from "lucide-react";
import type { AgendaSession } from "@/data/fallback-agenda";
import {
  AGENDA_2026, atWAT, dayStats, durationMin, fmtRange, fmtTime,
  type AgendaDay, type AgendaItem, type Hall, type PlenaryKind, type Talk, type TalkKind,
} from "@/data/agenda-2026";

interface Props {
  photos: Record<string, string>;
  pastSessions: AgendaSession[];
  serverNow: number;
}

/* ── 2026 schedule ── */

const HALL_COLOR: Record<Hall, string> = { Ruby: "#E11D48", Emerald: "#10B981", Sapphire: "#3B82F6" };

const KIND_STYLE: Record<TalkKind, string> = {
  Keynote: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30",
  Workshop: "text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/30",
  Session: "text-fbc-blue bg-fbc-blue/10 border-fbc-blue/30",
  "Lightning talk": "text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/30",
};

const PLENARY_ICON: Record<PlenaryKind, LucideIcon> = {
  registration: ClipboardCheck, opening: Sparkles, games: Gamepad2, break: Coffee, sponsor: Handshake,
  demo: MonitorPlay, panel: MessagesSquare, hackathon: Trophy, closing: Gift,
};

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
const hallCols = (day: AgendaDay) => (day.halls.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2");

function Avatar({ name, photo, size }: { name: string; photo?: string; size: number }) {
  const ring = "rounded-full ring-2 ring-fbc-card flex-shrink-0";
  if (photo) {
    return <Image src={photo} alt="" width={size * 2} height={size * 2} className={`${ring} object-cover`} style={{ width: size, height: size }} />;
  }
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <span
      className={`${ring} flex items-center justify-center bg-fbc-blue/15 text-fbc-blue font-semibold`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

function Speakers({ names, photos, big = false }: { names: string[]; photos: Record<string, string>; big?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${big ? "mt-3" : "mt-4"}`}>
      <div className="flex -space-x-2">
        {names.map((n) => <Avatar key={n} name={n} photo={photos[n]} size={big ? 48 : 28} />)}
      </div>
      <p className={big ? "font-gigasans font-bold text-xl sm:text-2xl text-fbc-white" : "text-sm text-fbc-muted leading-tight"}>
        {names.join(" & ")}
      </p>
    </div>
  );
}

function HallTag({ hall }: { hall: Hall }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-fbc-muted whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: HALL_COLOR[hall] }} />
      {hall} Hall
    </span>
  );
}

function TalkCard({ talk, photos }: { talk: Talk; photos: Record<string, string> }) {
  const keynote = talk.kind === "Keynote";
  return (
    <div
      className={`h-full rounded-2xl border p-4 sm:p-5 transition-colors ${
        keynote
          ? "border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-fbc-card/70 to-fbc-card/70"
          : "border-fbc-border bg-fbc-card/70 hover:border-fbc-blue/40"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${KIND_STYLE[talk.kind]}`}>
          {talk.kind}
        </span>
        <HallTag hall={talk.hall} />
        {talk.start && talk.end && (
          <span className="font-mono text-[11px] text-fbc-muted tabular-nums">{fmtRange(talk.start, talk.end)}</span>
        )}
      </div>
      {talk.title && (
        <h3 className="mt-3 font-gigasans font-semibold text-[15px] sm:text-base leading-snug text-fbc-white">{talk.title}</h3>
      )}
      <Speakers names={talk.speakers} photos={photos} big={!talk.title} />
    </div>
  );
}

function PlenaryRow({ item }: { item: Extract<AgendaItem, { type: "plenary" }> }) {
  const Icon = PLENARY_ICON[item.kind];
  const quiet = item.kind === "break" || item.kind === "registration";
  const body = (
    <div
      className={`flex items-center gap-3 rounded-2xl px-4 sm:px-5 py-3 border transition-colors ${
        quiet ? "border-dashed border-fbc-border" : "border-fbc-border bg-fbc-card/40"
      } ${item.href ? "group hover:border-fbc-blue/50" : ""}`}
    >
      <span className="flex w-9 h-9 flex-shrink-0 items-center justify-center rounded-xl bg-fbc-blue/10 text-fbc-blue">
        <Icon size={17} />
      </span>
      <div className="min-w-0">
        <p className="font-gigasans font-semibold text-fbc-white leading-tight">{item.title}</p>
        {item.speakers && <p className="text-xs text-fbc-muted mt-0.5">{item.speakers.join(" & ")}</p>}
      </div>
      <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-fbc-muted whitespace-nowrap">
        {item.href ? (
          <>
            <span className="hidden sm:inline">See the hackathon</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </>
        ) : (
          "All halls"
        )}
      </span>
    </div>
  );
  return item.href ? <Link href={item.href}>{body}</Link> : body;
}

function ItemRow({ item, day, photos, now }: { item: AgendaItem; day: AgendaDay; photos: Record<string, string>; now: number }) {
  const start = atWAT(day.date, item.start);
  const end = atWAT(day.date, item.end);
  const live = now >= start && now < end;
  const over = now >= end && now < atWAT(day.date, "23:59");

  return (
    <li className={`grid grid-cols-1 lg:grid-cols-[8rem_minmax(0,1fr)] gap-x-6 gap-y-2.5 py-2.5 transition-opacity ${over ? "opacity-50" : ""}`}>
      <div className="flex lg:flex-col items-baseline lg:items-start gap-x-2.5 gap-y-1 lg:pt-3.5">
        <span className="font-gigasans font-semibold text-fbc-white tabular-nums whitespace-nowrap">{fmtTime(item.start)}</span>
        <span className="font-mono text-[11px] text-fbc-muted">{durationMin(item.start, item.end)} min</span>
        {live && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Now
          </span>
        )}
      </div>

      <div className={live ? "rounded-[18px] ring-2 ring-emerald-500/40 ring-offset-4 ring-offset-fbc-navy" : ""}>
        {item.type === "plenary" ? (
          <PlenaryRow item={item} />
        ) : item.talks.length === 1 ? (
          <TalkCard talk={item.talks[0]} photos={photos} />
        ) : (
          <div className={`grid grid-cols-1 gap-3 ${hallCols(day)}`}>
            {day.halls.map((hall) => {
              const inHall = item.talks.filter((x) => x.hall === hall);
              if (!inHall.length) return <div key={hall} className="hidden lg:block" aria-hidden="true" />;
              return (
                <div key={hall} className="flex flex-col gap-3">
                  {inHall.map((talk) => <TalkCard key={talk.title} talk={talk} photos={photos} />)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </li>
  );
}

function DaySchedule({ day, photos, now }: { day: AgendaDay; photos: Record<string, string>; now: number }) {
  const s = dayStats(day);
  const facts: [LucideIcon | null, string][] = [
    [CalendarDays, fmtRange(s.start, s.end)],
    [MapPin, `${day.halls.join(", ").replace(/, ([^,]*)$/, " & $1")} halls`],
    [Users, plural(s.speakers, "speaker")],
    [null, plural(s.keynotes, "keynote")],
    [null, plural(s.workshops, "workshop")],
    [null, plural(s.sessions, "session")],
    [null, plural(s.lightning, "lightning talk")],
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {facts.map(([Icon, text]) => (
          <span key={text} className="inline-flex items-center gap-1.5 rounded-full border border-fbc-border bg-fbc-card/50 px-3 py-1.5 text-xs text-fbc-muted">
            {Icon && <Icon size={13} className="text-fbc-blue" />}
            {text}
          </span>
        ))}
      </div>

      {/* desktop: hall headers stay in view while scrolling */}
      <div className="hidden lg:grid sticky top-14 z-20 grid-cols-[8rem_minmax(0,1fr)] gap-x-6 py-3 mb-2 bg-fbc-navy border-b border-fbc-border/60">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fbc-muted self-center">Time · WAT</span>
        <div className={`grid gap-3 ${hallCols(day)}`}>
          {day.halls.map((hall) => (
            <span key={hall} className="flex items-center gap-2 font-gigasans font-semibold text-sm text-fbc-white">
              <span className="w-2 h-2 rounded-full" style={{ background: HALL_COLOR[hall] }} />
              {hall} Hall
            </span>
          ))}
        </div>
      </div>

      <ol>
        {day.items.map((item) => (
          <ItemRow key={item.start + (item.type === "plenary" ? item.title : "")} item={item} day={day} photos={photos} now={now} />
        ))}
      </ol>
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

type TabId = "fri" | "sat" | "past";

export default function AgendaPageContent({ photos, pastSessions, serverNow }: Props) {
  // Open on Saturday's schedule on Saturday (WAT), otherwise on Friday's.
  const onSaturday = (t: number) => t >= atWAT("2026-11-07", "00:00") && t < atWAT("2026-11-08", "00:00");
  const [tab, setTab] = useState<TabId>(onSaturday(serverNow) ? "sat" : "fri");
  const [now, setNow] = useState(serverNow);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const tabs: { id: TabId; label: string; short: string }[] = [
    { id: "fri", label: "Day 1 · Friday, Nov 6", short: "Day 1 · Fri" },
    { id: "sat", label: "Day 2 · Saturday, Nov 7", short: "Day 2 · Sat" },
    { id: "past", label: "Past Editions", short: "Past" },
  ];
  const day = AGENDA_2026.find((d) => d.id === tab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap" role="tablist" aria-label="Conference days">
        {tabs.map(({ id, label, short }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            aria-label={label}
            onClick={() => setTab(id)}
            className={`rounded-full px-4 sm:px-6 py-2.5 text-sm font-semibold whitespace-nowrap transition-all ${
              tab === id
                ? "bg-fbc-blue text-white shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                : "bg-fbc-card border border-fbc-border text-fbc-muted hover:text-fbc-white"
            }`}
          >
            <span className="sm:hidden">{short}</span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {day ? (
            <DaySchedule day={day} photos={photos} now={now} />
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
