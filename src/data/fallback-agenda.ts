export interface AgendaSession {
  time: string;
  session: string;
  speaker: string;
  hall: string;
  description?: string;
  tags?: string[];
}

export const fallbackFriday: AgendaSession[] = [
  { time: "09:00–10:00", session: "Registration & Badge Collection", speaker: "–", hall: "Main Hall" },
  { time: "10:00–10:10", session: "Opening & Welcome Address", speaker: "Hosts", hall: "Main Hall" },
  { time: "10:10–10:25", session: "Lightning Talk: Building AI-Augmented Flutter Apps", speaker: "TBA", hall: "Main Hall", tags: ["AI"] },
  { time: "10:30–11:00", session: "Opening Keynote: The Flutter AI Engineer in 2026", speaker: "TBA", hall: "Main Hall", tags: ["AI", "Keynote"] },
  { time: "11:05–11:30", session: "Integrating LLMs into Mobile Workflows", speaker: "TBA", hall: "Main Hall", tags: ["AI"] },
  { time: "11:35–12:00", session: "State Management for AI-Driven Apps with Riverpod", speaker: "TBA", hall: "Main Hall", tags: ["Architecture"] },
  { time: "12:00–13:00", session: "Lunch Break & Networking", speaker: "–", hall: "Lobby" },
  { time: "13:00–13:45", session: "Workshop: Your First On-Device ML Flutter App", speaker: "TBA", hall: "Workshop Hall", tags: ["AI", "Workshop"] },
  { time: "14:00–14:25", session: "Flutter Web 2026: The Missing Manual", speaker: "TBA", hall: "Main Hall" },
  { time: "14:30–15:00", session: "Building Supercharged Developer Experiences with Dart", speaker: "TBA", hall: "Main Hall", tags: ["Architecture"] },
  { time: "15:05–15:30", session: "Dart Macros: The Future of Code Generation", speaker: "TBA", hall: "Main Hall", tags: ["Architecture"] },
  { time: "15:35–16:00", session: "Shipping Flutter to 10 Platforms from One Codebase", speaker: "TBA", hall: "Main Hall" },
  { time: "16:00–16:30", session: "Networking Break & Sponsor Showcase", speaker: "–", hall: "Lobby" },
  { time: "16:30–17:00", session: "Scaling Flutter Teams at African Startups", speaker: "TBA", hall: "Main Hall", tags: ["Leadership", "Community"] },
  { time: "17:05–17:30", session: "From Zero to Production: A Flutter Journey", speaker: "TBA", hall: "Main Hall", tags: ["Community"] },
  { time: "17:30–18:00", session: "Day 1 Wrap-up & Evening Mixer", speaker: "Hosts", hall: "Main Hall" },
  { time: "18:00–20:00", session: "Evening Networking & Games", speaker: "–", hall: "Lobby" },
];

export const fallbackSaturday: AgendaSession[] = [
  { time: "09:00–09:30", session: "Day 2 Welcome & Day 1 Highlights Recap", speaker: "Hosts", hall: "Main Hall" },
  { time: "09:30–10:00", session: "AI-First UI Design Patterns in Flutter", speaker: "TBA", hall: "Main Hall", tags: ["AI", "UI"] },
  { time: "10:05–10:30", session: "On-Device ML: Flutter & TensorFlow Lite Deep Dive", speaker: "TBA", hall: "Main Hall", tags: ["AI"] },
  { time: "10:35–11:20", session: "Workshop: Building Your First AI Flutter App with Gemini", speaker: "TBA", hall: "Workshop Hall", tags: ["AI", "Workshop"] },
  { time: "11:05–11:30", session: "Flutter for Web: Beyond the Browser", speaker: "TBA", hall: "Main Hall" },
  { time: "11:35–12:00", session: "Testing AI Features in Flutter — Strategies That Work", speaker: "TBA", hall: "Main Hall", tags: ["Testing", "AI"] },
  { time: "12:00–13:00", session: "Lunch Break & Photo Sessions", speaker: "–", hall: "Lobby" },
  { time: "13:00–14:00", session: "Panel: The Future of Mobile AI in Africa", speaker: "Multiple Panelists", hall: "Main Hall", tags: ["AI", "Community"] },
  { time: "14:00–14:30", session: "From Solo Dev to Team Lead in 2 Years", speaker: "TBA", hall: "Main Hall", tags: ["Leadership"] },
  { time: "14:35–15:00", session: "Performance Optimization for AI-Heavy Flutter Apps", speaker: "TBA", hall: "Main Hall", tags: ["AI", "Architecture"] },
  { time: "15:05–15:30", session: "Building Offline-First AI Apps with Flutter", speaker: "TBA", hall: "Main Hall", tags: ["AI"] },
  { time: "15:35–16:00", session: "The Business of Flutter: Monetizing Mobile AI", speaker: "TBA", hall: "Main Hall", tags: ["Community", "Leadership"] },
  { time: "16:00–16:15", session: "Lightning Talk: Shaders & Visual Effects in Flutter", speaker: "TBA", hall: "Main Hall" },
  { time: "16:15–16:30", session: "Lightning Talk: FlutterFlow for Rapid AI Prototyping", speaker: "TBA", hall: "Main Hall", tags: ["AI"] },
  { time: "16:30–17:00", session: "Networking & Community Awards Ceremony", speaker: "–", hall: "Main Hall" },
  { time: "17:00–17:30", session: "Closing Keynote: What's Next for Flutter & AI", speaker: "TBA", hall: "Main Hall", tags: ["AI", "Keynote"] },
  { time: "17:30–18:00", session: "Official Closing & Group Photos", speaker: "Hosts", hall: "Main Hall" },
];
