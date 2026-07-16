export interface AgendaSession {
  time: string;
  session: string;
  speaker: string;
  hall: string;
  description?: string;
  tags?: string[];
}

export const fallbackFriday: AgendaSession[] = [
  { time: "09:00–10:00", session: "Registration & Badge Collection", speaker: "–", hall: "Ruby Hall" },
  { time: "10:00–10:15", session: "Opening & Welcome Address", speaker: "Hosts", hall: "Ruby Hall" },

  // 10:30 block
  { time: "10:30–11:10", session: "Building Scalable Applications Using Flutter", speaker: "Atuoha Anthony", hall: "Ruby Hall", tags: ["Session", "Architecture"] },
  { time: "10:30–11:10", session: "Writing True Mobile Tests with Patrol", speaker: "Sebastine Odeh", hall: "Sapphire Hall", tags: ["Session", "Testing"] },
  { time: "10:30–12:00", session: "In-App Subscription: Monetizing Your Flutter Apps", speaker: "Odinachi David", hall: "Emerald Hall", tags: ["Workshop"] },

  // 11:20 block
  { time: "11:20–12:00", session: "Building Offline AI Agent in Your Flutter App", speaker: "Sasha Denisov", hall: "Ruby Hall", tags: ["Session", "AI"] },
  { time: "11:20–11:35", session: "The Future of Real-Time UX: Live Activities in Flutter for Android & iOS", speaker: "Kudus Rufai", hall: "Sapphire Hall", tags: ["Lightning"] },

  { time: "12:00–13:00", session: "Lunch Break & Networking", speaker: "–", hall: "Lobby" },

  // 13:00 block
  { time: "13:00–13:40", session: "DCM for Clean, Consistent Flutter Code", speaker: "Festus Olusegun", hall: "Ruby Hall", tags: ["Session", "Tools"] },
  { time: "13:00–14:30", session: "Building the Bridge: Running JavaScript Modules from Dart", speaker: "Chima Precious", hall: "Sapphire Hall", tags: ["Workshop"] },
  { time: "13:00–13:15", session: "Build Spectacular TV Apps with Flutter", speaker: "Mrinal Jain", hall: "Emerald Hall", tags: ["Lightning"] },

  // 13:50 block
  { time: "13:50–14:30", session: "Building an AI Agent to Manage Your Flutter/Dart Dependencies", speaker: "Agalaba Ifeanyi", hall: "Ruby Hall", tags: ["Session", "AI"] },
  { time: "13:25–14:05", session: "Data-Driven Design with Flutter: Improving UX Based on User Behavior", speaker: "Nikki Eke", hall: "Emerald Hall", tags: ["Session", "UI"] },

  { time: "14:40–16:10", session: "Going Native: Building a Flutter Step Counter Plugin with Kotlin & Jetpack Compose", speaker: "Glory Olaifa", hall: "Sapphire Hall", tags: ["Workshop"] },

  // 15:00 block
  { time: "14:50–15:05", session: "From Burnout to Breakthrough: Sustainable Development Practices", speaker: "David Oluwabusayo", hall: "Emerald Hall", tags: ["Lightning"] },
  { time: "15:00–15:15", session: "Building an Offline Running Game with Flutter", speaker: "Ayomiposi Fabiyi", hall: "Ruby Hall", tags: ["Lightning", "Gaming"] },

  { time: "15:30–16:00", session: "Networking Break & Sponsor Showcase", speaker: "–", hall: "Lobby" },

  { time: "17:00–18:00", session: "Day 1 Evening Mixer & Games", speaker: "–", hall: "Ruby Hall" },
];

export const fallbackSaturday: AgendaSession[] = [
  { time: "09:30–10:00", session: "Day 2 Check-in & Day 1 Recap", speaker: "Hosts", hall: "Ruby Hall" },

  // 10:00 block
  { time: "10:00–10:15", session: "Managing Multi-Package Flutter Projects in a Monorepo Using Melos", speaker: "Caleb Jesusegun", hall: "Ruby Hall", tags: ["Lightning"] },
  { time: "10:00–11:30", session: "Bringing Generative AI to Flutter: Build a Voice-Enabled AI Assistant with ElevenLabs + Dart", speaker: "Emmanuel Akinfulubi", hall: "Sapphire Hall", tags: ["Workshop", "AI"] },
  { time: "10:00–11:30", session: "Building Pixel-Perfect UIs in Flutter", speaker: "Sodiq Eniola", hall: "Emerald Hall", tags: ["Workshop", "UI"] },

  // 10:25 block
  { time: "10:25–11:05", session: "Never Break Your UI Again: Visual Testing with Widgetbook Cloud", speaker: "Jesutoni Aderibigbe", hall: "Ruby Hall", tags: ["Session", "Testing"] },

  // 11:15
  { time: "11:15–11:30", session: "Crafting Mobile Apps with Customer Experience in Mind", speaker: "Temitayo Olakunle", hall: "Ruby Hall", tags: ["Lightning", "Business"] },

  { time: "12:00–13:00", session: "Lunch Break & Photo Sessions", speaker: "–", hall: "Lobby" },

  // 13:00 block
  { time: "13:00–13:40", session: "The Modern Flutter Aesthetic: Crafting Custom Experiences with Fragment Shaders", speaker: "Yunwen Eric", hall: "Ruby Hall", tags: ["Session", "UI"] },
  { time: "13:00–14:30", session: "Dart on the Server: Building Scalable APIs with Serverpod and Flutter", speaker: "Samuel Adekunle", hall: "Sapphire Hall", tags: ["Workshop"] },
  { time: "13:00–13:15", session: "No More Leaks: Detect & Prevent Memory Leaks", speaker: "Michael Ogundipe", hall: "Emerald Hall", tags: ["Lightning"] },

  // 13:25 block
  { time: "13:25–14:55", session: "Speeding Up Your Flutter Development with AI Tools", speaker: "Ayodeji Michael", hall: "Emerald Hall", tags: ["Workshop", "AI"] },

  // 13:50 block
  { time: "13:50–14:30", session: "Building Agentic Apps with Flutter and Firebase Genkit", speaker: "Hassan Bahati", hall: "Ruby Hall", tags: ["Session", "AI"] },

  // 15:00 block
  { time: "15:00–16:30", session: "Building the Future: Smart VR Experiences with Flutter and AI", speaker: "Ajayi Ayodele", hall: "Sapphire Hall", tags: ["Workshop", "AI"] },
  { time: "14:40–15:20", session: "Build Landing Pages Faster with Jaspr + AI", speaker: "Samuel Mayowa", hall: "Ruby Hall", tags: ["Session"] },

  // 15:30 block
  { time: "15:30–16:10", session: "Scaling Flutter Apps for Multiple Tenants: Design, Structure, and Strategy", speaker: "Anuoluwapo Famakinwa", hall: "Emerald Hall", tags: ["Session", "Architecture"] },
  { time: "15:30–15:45", session: "The $280M Frontend: How Flutter Developers Can Dominate Web3 with Solana Blinks", speaker: "Daniel Modupe Asaboro", hall: "Ruby Hall", tags: ["Lightning", "Web3"] },

  // 16:20 block
  { time: "16:20–16:35", session: "Protecting the Bag: Flutter App Security Best Practices for Fintech", speaker: "Adewale Adeosun", hall: "Emerald Hall", tags: ["Lightning", "Security"] },
  { time: "16:20–17:00", session: "Coding for Care: What Flutter Developers Must Know Before Building in Health", speaker: "Blessing Wisdom", hall: "Ruby Hall", tags: ["Session"] },
  { time: "16:20–17:00", session: "The Power of a Design System: Building Consistent UI with Flutter", speaker: "Samuel Abada", hall: "Sapphire Hall", tags: ["Session", "UI"] },

  // 17:10
  { time: "17:10–17:50", session: "Getting Started with Serverpod and Dart on the Backend", speaker: "Viktor Lidholt", hall: "Ruby Hall", tags: ["Session"] },

  { time: "17:30–18:00", session: "Community Awards & Official Closing Ceremony", speaker: "Hosts", hall: "Ruby Hall" },
  { time: "18:00–19:00", session: "Afterparty & Networking", speaker: "–", hall: "All Halls" },
];
