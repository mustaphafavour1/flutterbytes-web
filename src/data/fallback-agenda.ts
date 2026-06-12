export interface AgendaSession {
  time: string;
  session: string;
  speaker: string;
  hall: string;
  description?: string;
  tags?: string[];
}

export const fallbackFriday: AgendaSession[] = [
  { time: "09:00–10:00", session: "Registration", speaker: "–", hall: "Main Hall" },
  { time: "10:00–10:10", session: "Opening & Welcome", speaker: "Hosts", hall: "Main Hall" },
  { time: "10:10–10:25", session: "Lightning Talk: Building AI-Augmented Flutter Apps", speaker: "TBA", hall: "Main Hall", tags: ["AI"] },
  { time: "10:30–11:00", session: "Opening Keynote: The Flutter AI Engineer in 2026", speaker: "TBA", hall: "Main Hall", tags: ["AI", "Keynote"] },
  { time: "11:05–11:30", session: "Integrating LLMs into Mobile Workflows", speaker: "TBA", hall: "Main Hall", tags: ["AI"] },
  { time: "11:35–12:00", session: "State Management for AI-Driven Apps", speaker: "TBA", hall: "Main Hall", tags: ["Architecture"] },
  { time: "12:00–13:00", session: "Lunch Break", speaker: "–", hall: "Lobby" },
  { time: "13:00–13:45", session: "Workshop: Your First On-Device ML Flutter App", speaker: "TBA", hall: "Workshop Hall", tags: ["AI", "Workshop"] },
  { time: "14:00–14:25", session: "Flutter Web 2026: The Missing Manual", speaker: "TBA", hall: "Main Hall" },
  { time: "14:30–15:00", session: "Building Supercharged Developer Experiences with Dart", speaker: "TBA", hall: "Main Hall", tags: ["Architecture"] },
];

export const fallbackSaturday: AgendaSession[] = [
  { time: "09:00–09:30", session: "Day 2 Welcome & Day 1 Highlights", speaker: "Hosts", hall: "Main Hall" },
  { time: "09:30–10:00", session: "AI-First UI Design with Flutter", speaker: "TBA", hall: "Main Hall", tags: ["AI", "UI"] },
  { time: "10:05–10:30", session: "On-Device ML: Flutter & TensorFlow Lite", speaker: "TBA", hall: "Main Hall", tags: ["AI"] },
  { time: "10:35–11:00", session: "Workshop: Building Your First AI Flutter App", speaker: "TBA", hall: "Workshop Hall", tags: ["AI", "Workshop"] },
  { time: "11:05–11:30", session: "Flutter for Web: Beyond the Browser", speaker: "TBA", hall: "Main Hall" },
  { time: "11:35–12:00", session: "Testing AI Features in Flutter", speaker: "TBA", hall: "Main Hall", tags: ["Testing", "AI"] },
  { time: "12:00–13:00", session: "Lunch Break", speaker: "–", hall: "Lobby" },
  { time: "13:00–14:00", session: "Panel: The Future of Mobile AI", speaker: "Multiple", hall: "Main Hall", tags: ["AI", "Community"] },
  { time: "14:00–14:30", session: "From Solo Dev to Team Lead in 2 Years", speaker: "TBA", hall: "Main Hall", tags: ["Leadership"] },
  { time: "15:00–15:30", session: "Closing Keynote & Awards", speaker: "Hosts", hall: "Main Hall" },
];
