import type { AgendaSession } from "@/data/fallback-agenda";

/**
 * FlutterBytes 2026 agenda (from "FlutterBytes 2026 — Final Agenda", final version).
 * Times are 24h "HH:MM" in WAT (UTC+1). A `talks` slot puts each talk in its
 * hall; a talk only carries its own start/end when it differs from the slot.
 */
export type Hall = "Ruby" | "Emerald" | "Sapphire" | "Opal";
export type TalkKind = "Keynote" | "Lightning talk" | "Workshop" | "Session";
export type PlenaryKind =
  | "registration" | "opening" | "games" | "break" | "sponsor" | "demo" | "panel" | "hackathon" | "closing";

export interface Talk {
  kind: TalkKind;
  title?: string;
  speakers: string[];
  hall: Hall;
  start?: string;
  end?: string;
}

export type AgendaItem =
  | {
      type: "plenary"; start: string; end: string; kind: PlenaryKind; title: string;
      speakers?: string[]; // panelists for a panel
      moderator?: string;
      href?: string;
    }
  | { type: "talks"; start: string; end: string; talks: Talk[] };

/** A named stretch of the day; holds every item starting at or after `from` until the next chapter. */
export interface Chapter {
  title: string;
  from: string;
}

export interface AgendaDay {
  id: "fri" | "sat";
  date: string; // YYYY-MM-DD
  label: string;
  halls: Hall[];
  chapters: Chapter[];
  items: AgendaItem[];
}

const t = (kind: TalkKind, hall: Hall, title: string | undefined, speakers: string[], start?: string, end?: string): Talk =>
  ({ kind, hall, title, speakers, start, end });

export const AGENDA_2026: AgendaDay[] = [
  {
    id: "fri",
    date: "2026-11-06",
    label: "Friday, Nov 6",
    halls: ["Emerald", "Sapphire"],
    chapters: [
      { title: "Kick-off", from: "08:30" },
      { title: "Deep dives", from: "10:45" },
      { title: "Afternoon tracks", from: "12:50" },
      { title: "Wrap-up", from: "14:40" },
    ],
    items: [
      { type: "plenary", start: "08:30", end: "09:00", kind: "registration", title: "Registration" },
      { type: "plenary", start: "09:00", end: "09:10", kind: "opening", title: "Opening & welcome" },
      { type: "talks", start: "09:15", end: "09:30", talks: [
        t("Lightning talk", "Emerald", "Using Trigonometry, Randomness & Math in Advanced Flutter Animations", ["Olumide Olubosede"]),
      ] },
      { type: "talks", start: "09:35", end: "10:05", talks: [
        t("Keynote", "Emerald", "The AI-Ready Flutter Engineer: Building for What's Next", ["David Adegoke"]),
      ] },
      { type: "talks", start: "10:10", end: "10:25", talks: [
        t("Lightning talk", "Emerald", "The Invisible Features: Building Trust & Security into Flutter Apps", ["Oladapo Olatubosun"]),
      ] },
      { type: "plenary", start: "10:25", end: "10:35", kind: "games", title: "Games" },
      { type: "talks", start: "10:45", end: "11:30", talks: [
        t("Workshop", "Emerald", "One Language, Full Stack: Agentive Flutter UI with genui_catalog + Serverpod", ["Omar Farouk"]),
        t("Workshop", "Sapphire", "Building Your First AI-Powered Solution", ["Mary Olasupo"]),
      ] },
      { type: "talks", start: "11:40", end: "12:05", talks: [
        t("Session", "Emerald", "Designing Flutter Apps for Distributed Systems", ["Nikki Eke"]),
        t("Session", "Sapphire", "Your Flutter App Is Only Half the Product: AI Backends That Scale", ["Ifeoluwa Obayemi"]),
      ] },
      { type: "talks", start: "12:15", end: "12:40", talks: [
        t("Session", "Emerald", "Release with Confidence: AI-Assisted Releases with CodeRabbit & Codemagic", ["Ibrahim Sakariyah", "Kudus Rufai"]),
        t("Session", "Sapphire", "Design Systems in the Age of AI Agents", ["Oluwaseun Odunlade"]),
      ] },
      { type: "plenary", start: "12:40", end: "12:50", kind: "break", title: "Coffee break" },
      { type: "talks", start: "12:50", end: "13:15", talks: [
        t("Session", "Emerald", "My Windows App Can Think, Hear and See", ["Daniel Oluremi"]),
        t("Session", "Sapphire", "Beyond Beautiful UIs: Building the Next Generation of Flutter Applications with Emerging Tech", ["Victor Mba"]),
      ] },
      { type: "talks", start: "13:25", end: "13:50", talks: [
        t("Session", "Emerald", "The One-Man StartUp: Building Systems to Grow an Idea with AI", ["Favour Mustapha"]),
        t("Session", "Sapphire", "Offline-First Flutter: Building Apps That Keep Working Without the Internet", ["Christian Emeka"]),
      ] },
      { type: "talks", start: "14:00", end: "14:25", talks: [
        t("Session", "Emerald", "Building Interactive CLI Apps with Dart", ["Lucky Ebere"]),
        t("Session", "Sapphire", "The Aristocracy of Technical Debt", ["Olaniyan Wisdom"]),
      ] },
      { type: "plenary", start: "14:25", end: "14:40", kind: "break", title: "Lunch break" },
      { type: "plenary", start: "14:40", end: "14:50", kind: "sponsor", title: "Sponsor session", speakers: ["Samuel Adekunle"] },
      {
        type: "plenary", start: "14:55", end: "15:25", kind: "panel", title: "Panel session",
        speakers: ["Nikki Eke", "Jesse Osile", "Samuel Adekunle"], moderator: "Iyinoluwa Ogundairo",
      },
      { type: "plenary", start: "15:25", end: "15:30", kind: "closing", title: "Gift presentation & vote of thanks" },
    ],
  },
  {
    id: "sat",
    date: "2026-11-07",
    label: "Saturday, Nov 7",
    halls: ["Ruby", "Sapphire", "Opal"],
    chapters: [
      { title: "Kick-off", from: "08:30" },
      { title: "Deep dives", from: "11:15" },
      { title: "Afternoon tracks", from: "13:20" },
      { title: "Wrap-up", from: "15:10" },
    ],
    items: [
      { type: "plenary", start: "08:30", end: "09:00", kind: "registration", title: "Registration" },
      { type: "plenary", start: "09:00", end: "09:10", kind: "opening", title: "Opening & welcome" },
      { type: "talks", start: "09:15", end: "09:30", talks: [
        t("Lightning talk", "Ruby", "Can We Measure Flutter Performance Like Test Coverage?", ["Michael Ogundipe"]),
      ] },
      { type: "talks", start: "09:35", end: "10:05", talks: [
        t("Keynote", "Ruby", "Becoming A Flutter AI Engineer", ["Sodiq Akinjobi"]),
      ] },
      { type: "talks", start: "10:10", end: "10:25", talks: [
        t("Lightning talk", "Ruby", "Beyond the Office: How to Land and Keep Your Remote Job", ["David Micah-Daniels"]),
      ] },
      { type: "plenary", start: "10:30", end: "10:40", kind: "sponsor", title: "Sponsor session", speakers: ["Samuel Adekunle"] },
      { type: "plenary", start: "10:45", end: "10:55", kind: "demo", title: "Product demo" },
      { type: "plenary", start: "10:55", end: "11:05", kind: "games", title: "Games" },
      { type: "talks", start: "11:15", end: "12:00", talks: [
        t("Workshop", "Ruby", "Bring AI Home: Privacy, Ownership & the Local-First Future of Flutter", ["Daniel Modupe Asaboro"]),
        t("Workshop", "Sapphire", "ONNX: Running ML Models in Flutter with ONNX", ["Odinachi David"]),
        t("Workshop", "Opal", "Offline by Design: A Local RAG Pipeline with Dart, Ollama & ObjectBox", ["Ayodeji Michael Ogundairo"]),
      ] },
      { type: "talks", start: "12:10", end: "12:35", talks: [
        t("Session", "Ruby", "Your App's Next User Is an AI Agent: Android AppFunctions", ["Oluwaseyi Ajadi", "Jesse Osile"]),
        t("Session", "Sapphire", "The Agentic Shift: Zero-Code Integration Tests with Gherkin & Marionette", ["Sebastine Odeh"]),
        t("Session", "Opal", "No Controllers. No Tweens. Just State. (Nib Motion)", ["Connel Asikong"]),
      ] },
      { type: "talks", start: "12:45", end: "13:10", talks: [
        t("Session", "Ruby", "Giving Your Coding Agent the Full Stack", ["Jamiu Okanlawon"]),
        t("Session", "Sapphire", "Beyond 2D: Building 3D Apps and Games with Just Flutter", ["Olanrewaju Taiwo"]),
        t("Session", "Opal", "Routes as Values: Navigation as Typed State", ["Samuel Abada"]),
      ] },
      { type: "plenary", start: "13:10", end: "13:20", kind: "break", title: "Coffee break" },
      { type: "talks", start: "13:20", end: "13:45", talks: [
        t("Session", "Ruby", "Building Production Agentic Workflows with Flutter, Firebase Genkit & Gemini", ["David Oluwabusayo"]),
        t("Session", "Sapphire", "When the AI Builds the Widget Tree: Performance for GenUI Apps", ["Gidudu Muyobo Nicholas"]),
        t("Session", "Opal", "Beyond Crash Logs: Event-Driven Telemetry in Flutter Apps", ["Christopher Nwosu-Madueke"]),
      ] },
      { type: "talks", start: "13:55", end: "14:20", talks: [
        t("Session", "Ruby", "Closing the AI Loop: Figma MCP → Coding Agent → Maestro MCP", ["Adewale Adeosun"]),
        t("Session", "Sapphire", "When AI Is Coming for Your Job: Avoid It or Integrate It?", ["Thecapstone Mogbolu"]),
        t("Session", "Opal", "Building Better Products with AI and Automation", ["Victory Abiodun-Omoniyi"]),
      ] },
      { type: "talks", start: "14:30", end: "14:55", talks: [
        t("Session", "Ruby", "Beyond Chatbots: Building Interactive AI Experiences in Flutter", ["Mayowa Olutuyo"]),
        t("Session", "Sapphire", "Spec-Driven Development: Using AI Agents to Build Flutter Apps from Requirements to Code", ["Emmanuel Akinfulubi"]),
        t("Session", "Opal", "Do We Still Need to Write Code as Mobile Engineers?", ["Ayotomide Babalola"]),
      ] },
      { type: "plenary", start: "14:55", end: "15:10", kind: "break", title: "Lunch break" },
      {
        type: "plenary", start: "15:10", end: "15:40", kind: "panel", title: "Shipping Flutter AI Apps: From Cool Demo to Real Product",
        speakers: ["Sebastine Odeh", "Ayodeji Michael Ogundairo", "Victory Abiodun-Omoniyi"], moderator: "Emmanuel Aliyu",
      },
      { type: "plenary", start: "15:45", end: "16:25", kind: "hackathon", title: "Hackathon presentation", href: "/hackathon" },
      { type: "plenary", start: "16:25", end: "16:30", kind: "closing", title: "Gift presentation & vote of thanks" },
    ],
  },
];

/* ─────────────── helpers ─────────────── */

/** Epoch ms for a day's "HH:MM" in WAT. */
export const atWAT = (date: string, hhmm: string) => Date.parse(`${date}T${hhmm}:00+01:00`);

const minutesOf = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const durationMin = (start: string, end: string) => minutesOf(end) - minutesOf(start);

const clock = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return { text: `${h % 12 || 12}:${String(m).padStart(2, "0")}`, ampm: h < 12 ? "AM" : "PM" };
};

/** "13:10" → "1:10 PM" */
export const fmtTime = (hhmm: string) => {
  const c = clock(hhmm);
  return `${c.text} ${c.ampm}`;
};

/** "13:10","13:20" → "1:10 – 1:20 PM"; "11:40","12:05" → "11:40 AM – 12:05 PM" */
export const fmtRange = (start: string, end: string) => {
  const a = clock(start);
  const b = clock(end);
  return a.ampm === b.ampm ? `${a.text} – ${b.text} ${b.ampm}` : `${a.text} ${a.ampm} – ${b.text} ${b.ampm}`;
};

export const allTalks = (day: AgendaDay) =>
  day.items.flatMap((item) => (item.type === "talks" ? item.talks.map((talk) => ({ talk, item })) : []));

/** Speakers named in the agenda (talks and plenary items), in order of appearance. */
export const agendaSpeakerNames = () =>
  Array.from(new Set(AGENDA_2026.flatMap((day) =>
    day.items.flatMap((item) =>
      item.type === "talks" ? item.talks.flatMap((x) => x.speakers) : [...(item.speakers ?? []), ...(item.moderator ? [item.moderator] : [])]
    )
  )));

export function dayStats(day: AgendaDay) {
  const talks = allTalks(day).map(({ talk }) => talk);
  const count = (kind: TalkKind) => talks.filter((x) => x.kind === kind).length;
  return {
    start: day.items[0].start,
    end: day.items[day.items.length - 1].end,
    speakers: new Set(talks.flatMap((x) => x.speakers)).size,
    keynotes: count("Keynote"),
    workshops: count("Workshop"),
    sessions: count("Session"),
    lightning: count("Lightning talk"),
  };
}

/** A day's talks in the simple shape the homepage agenda strip uses. */
export const daySessions = (day: AgendaDay): AgendaSession[] =>
  allTalks(day).map(({ talk, item }) => ({
    time: fmtRange(talk.start ?? item.start, talk.end ?? item.end),
    type: talk.kind,
    session: talk.title ?? `${talk.kind}: ${talk.speakers.join(" & ")}`,
    speaker: talk.speakers.join(", "),
    hall: `${talk.hall} Hall`,
  }));

export type PlenaryItem = Extract<AgendaItem, { type: "plenary" }>;
export type Segment =
  | { kind: "chapter"; index: number; title: string; items: AgendaItem[] }
  | { kind: "break"; item: PlenaryItem };

/** The day as chapters, with breaks as separators between them. */
export function daySegments(day: AgendaDay): Segment[] {
  const out: Segment[] = [];
  for (const item of day.items) {
    if (item.type === "plenary" && item.kind === "break") {
      out.push({ kind: "break", item });
      continue;
    }
    const index = day.chapters.reduce((acc, c, i) => (item.start >= c.from ? i : acc), 0);
    const last = out[out.length - 1];
    if (last?.kind === "chapter" && last.index === index) last.items.push(item);
    else out.push({ kind: "chapter", index, title: day.chapters[index].title, items: [item] });
  }
  return out;
}
