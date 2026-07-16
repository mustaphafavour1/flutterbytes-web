export interface AgendaSession {
  time?: string;
  type?: string; // "Session" | "Lightning Talk" | "Workshop" | "Keynote"
  session: string;
  speaker: string;
  hall: string;
  description?: string;
  tags?: string[];
}

export const fallbackFriday: AgendaSession[] = [
  { type: "Session",        session: "Building Scalable Applications Using Flutter", speaker: "Atuoha Anthony", hall: "Ruby Hall" },
  { type: "Session",        session: "Writing True Mobile Tests with Patrol", speaker: "Sebastine Odeh", hall: "Sapphire Hall" },
  { type: "Workshop",       session: "In-App Subscription: Monetizing Your Flutter Apps", speaker: "Odinachi David", hall: "Emerald Hall" },
  { type: "Session",        session: "Building Offline AI Agent in Your Flutter App", speaker: "Sasha Denisov", hall: "Ruby Hall" },
  { type: "Lightning Talk", session: "The Future of Real-Time UX: Live Activities in Flutter for Android & iOS", speaker: "Kudus Rufai", hall: "Sapphire Hall" },
  { type: "Session",        session: "DCM for Clean, Consistent Flutter Code", speaker: "Festus Olusegun", hall: "Emerald Hall" },
  { type: "Workshop",       session: "Building the Bridge: Running JavaScript Modules from Dart", speaker: "Chima Precious", hall: "Ruby Hall" },
  { type: "Lightning Talk", session: "Build Spectacular TV Apps with Flutter", speaker: "Mrinal Jain", hall: "Sapphire Hall" },
  { type: "Session",        session: "Building an AI Agent to Manage Your Flutter/Dart Dependencies", speaker: "Agalaba Ifeanyi", hall: "Emerald Hall" },
  { type: "Session",        session: "Data-Driven Design with Flutter: Improving UX Based on User Behavior", speaker: "Nikki Eke", hall: "Ruby Hall" },
  { type: "Workshop",       session: "Going Native: Building a Flutter Step Counter Plugin with Kotlin & Jetpack Compose", speaker: "Glory Olaifa", hall: "Sapphire Hall" },
  { type: "Lightning Talk", session: "From Burnout to Breakthrough: Sustainable Development Practices for Flutter Developers", speaker: "David Oluwabusayo", hall: "Emerald Hall" },
  { type: "Lightning Talk", session: "Building an Offline Running Game with Flutter", speaker: "Ayomiposi Fabiyi", hall: "Ruby Hall" },
  { type: "Session",        session: "Never Break Your UI Again: Visual Testing with Widgetbook Cloud", speaker: "Jesutoni Aderibigbe", hall: "Sapphire Hall" },
  { type: "Lightning Talk", session: "Crafting Mobile Apps with Customer Experience in Mind", speaker: "Temitayo Olakunle", hall: "Emerald Hall" },
  { type: "Session",        session: "The Power of a Design System: Building Consistent UI with Flutter", speaker: "Samuel Abada", hall: "Ruby Hall" },
];

export const fallbackSaturday: AgendaSession[] = [
  { type: "Lightning Talk", session: "Managing Multi-Package Flutter Projects in a Monorepo Using Melos", speaker: "Caleb Jesusegun", hall: "Sapphire Hall" },
  { type: "Workshop",       session: "Bringing Generative AI to Flutter: Build a Voice-Enabled AI Assistant with ElevenLabs + Dart", speaker: "Emmanuel Akinfulubi", hall: "Emerald Hall" },
  { type: "Workshop",       session: "Building Pixel-Perfect UIs in Flutter", speaker: "Sodiq Eniola", hall: "Ruby Hall" },
  { type: "Session",        session: "The Modern Flutter Aesthetic: Crafting Custom Experiences with Fragment Shaders", speaker: "Yunwen Eric", hall: "Sapphire Hall" },
  { type: "Lightning Talk", session: "No More Leaks: Detect & Prevent Memory Leaks", speaker: "Michael Ogundipe", hall: "Emerald Hall" },
  { type: "Workshop",       session: "Dart on the Server: Building Scalable APIs with Serverpod and Flutter", speaker: "Samuel Adekunle", hall: "Ruby Hall" },
  { type: "Workshop",       session: "Speeding Up Your Flutter Development with AI Tools", speaker: "Ayodeji Michael", hall: "Sapphire Hall" },
  { type: "Session",        session: "Building Agentic Apps with Flutter and Firebase Genkit", speaker: "Hassan Bahati", hall: "Emerald Hall" },
  { type: "Workshop",       session: "Building the Future: Smart VR Experiences with Flutter and AI", speaker: "Ajayi Ayodele", hall: "Ruby Hall" },
  { type: "Session",        session: "Build Landing Pages Faster with Jaspr + AI", speaker: "Samuel Mayowa", hall: "Sapphire Hall" },
  { type: "Session",        session: "Scaling Flutter Apps for Multiple Tenants: Design, Structure, and Strategy", speaker: "Anuoluwapo Famakinwa", hall: "Emerald Hall" },
  { type: "Lightning Talk", session: "The $280M Frontend: How Flutter Developers Can Dominate Web3 with Solana Blinks", speaker: "Daniel Modupe Asaboro", hall: "Ruby Hall" },
  { type: "Lightning Talk", session: "Protecting the Bag: Flutter App Security Best Practices for Fintech Success", speaker: "Adewale Adeosun", hall: "Sapphire Hall" },
  { type: "Session",        session: "Coding for Care: What Flutter Developers Must Know Before Building in Health", speaker: "Blessing Wisdom", hall: "Emerald Hall" },
  { type: "Session",        session: "Getting Started with Serverpod and Dart on the Backend", speaker: "Viktor Lidholt", hall: "Ruby Hall" },
];
