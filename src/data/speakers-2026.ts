import type { Speaker } from "@/data/fallback-speakers";

/**
 * FlutterBytes 2026 speakers.
 *
 * Photos: drop each person's picture into /public/speakers_2026/ named
 * `<firstname-lastname>.jpg` (any extension; optional `N-` prefix to order).
 * `role` is the tagline/job title, `company` optional, `twitter` optional
 * (handle or full URL), `tags` optional (shown as chips).
 */
export const speaker = (name: string, role: string, company = "", twitter?: string, tag?: string): Speaker => ({
  name,
  role,
  company,
  twitter,
  tags: tag ? [tag] : [],
});

export const speakers2026: Speaker[] = [
  speaker("Odinachi David", "Mobile Engineer", "Downtodate"),
  speaker("Christopher Nwosu-Madueke", "Senior Mobile Engineer"),
  speaker("David Oluwabusayo", "CTO", "Paperless"),
  speaker("Gidudu Muyobo Nicholas", "Software Developer", "LearningKav"),
  speaker("Oluwaseyi Ajadi", "Quality & Security Tester", "PaidHR"),
  speaker("Ifechukwu Ebenmelu", "Full-Stack Software Engineer", "Rivy"),
  speaker("Mayowa Olutuyo", "Systems across Sales Ops, Product Marketing & Product", "AI in Nigeria"),
  speaker("Lucky Ebere", "Software Engineer", "Serverpod"),
  speaker("Olumide Olubosede", "Flutter Developer · Cybersecurity Professional", "Consulting"),
  speaker("Olanrewaju Taiwo", "Flutter Engineer · Author", "Doingthings Technologies"),
  speaker("Ayodeji Michael Ogundairo", "Senior Mobile Engineer", "Nomba"),
  speaker("Victor Mba", "Senior Mobile Engineer", "Sudo Africa"),
  speaker("Daniel Modupe Asaboro", "Software Engineer", "Leash"),
  speaker("Omar Farouk", "Google Developer Expert, Flutter & Dart · CEO", "KOF Corporation"),
  speaker("Emmanuel Akinfulubi", "AI Developer · Flutter Enthusiast", "Abeytrust Tech Solution"),
  speaker("Jesse Osile", "Mobile App Developer", "INITS Ltd"),
  speaker("Christian Emeka", "Senior Software Engineer", "Yolosofisi"),
  speaker("Mrinal Jain", "Lead Software Engineer · Flutter Indore Lead · Tech Speaker", "Lowe's"),
  speaker("Connel Asikong", "Never lose your BANKAI", "NaweSchools"),
  speaker("Sebastine Odeh", "Senior Mobile Engineer", "Snag"),
  speaker("Nikki Eke", "Software Engineer (Mobile) · Rive Ambassador", "Softhon"),
  speaker("Ibrahim Sakariyah", "Software Engineer · Flutter Developer", "Estream Networks"),
  speaker("Michael Ogundipe", "Software Engineer"),
  speaker("Ifeoluwa Obayemi", "Senior Software Engineer", "East Atlantic Telecoms"),
  speaker("Daniel Oluremi", "Mobile/Desktop & AI Engineer", "Sumeru (Edutech)"),
  speaker("Kudus Rufai", "Senior Mobile Engineer · Flutter, Dart & Kotlin", "Sterling Bank"),
  speaker("Olaniyan Wisdom", "Software Engineer", "Liveet"),
  speaker("Oluwaseun Odunlade", "Mobile Team Lead", "Kredete"),
  speaker("David Micah-Daniels", "Software Engineer · Tech Entrepreneur", "FutureFest Enterprise"),
  speaker("Oladapo Olatubosun", "Mobile Engineer", "Cede"),
  speaker("Samuel Abada", "Google Developer Expert, Flutter & Dart", "Nexlab Studio"),
  speaker("Adewale Adeosun", "Senior Mobile Engineer", "Expedier"),
  speaker("Favour Mustapha", "AI Product Engineer · Senior Product & Brand Designer", "Raptures Ent."),
];
