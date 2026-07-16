export interface Speaker {
  name: string;
  role: string;
  company: string;
  twitter?: string;
  photo?: string;
  bio?: string;
  tags?: string[];
}

/**
 * Real past FlutterBytes speakers, with role + company.
 *
 * Photos are NOT listed here — they resolve automatically from files in
 * /public/past-speakers/ (see src/lib/speaker-photos.ts). Drop in a picture
 * named `<firstname-lastname>.jpg` (or .png/.webp) and it appears; prefix with
 * `N-` to control order. Until a photo exists, an initials avatar shows.
 */
const speaker = (name: string, role: string, company: string, tag: string): Speaker => ({
  name,
  role,
  company,
  tags: tag ? [tag] : [],
});

export const fallbackSpeakers: Speaker[] = [
  speaker("Odinachi David", "Mobile Engineer", "HealaTech", "Monetization"),
  speaker("Kudus Rufai", "Mobile Engineer", "Sterling Bank", "Real-Time UX"),
  speaker("Sebastine Odeh", "Senior Mobile Engineer", "Aku Fintech", "Testing"),
  speaker("Sasha Denisov", "Chief Software Engineer · Flutter GDE", "EPAM", "AI"),
  speaker("Festus Olusegun", "Software Engineer", "Traid", "Code Quality"),
  speaker("Agalaba Ifeanyi", "Founder & Software Engineer", "VenbrinoDevs", "AI"),
  speaker("Nikki Eke", "Mobile Engineer", "Fertitude", "UX"),
  speaker("Chima Precious", "Software Engineer", "Invertase", "Dart"),
  speaker("Ayomiposi Fabiyi", "Flutter Developer", "", "Games"),
  speaker("David Oluwabusayo", "Chief Technical Officer", "Paperless", "Wellbeing"),
  speaker("Glory Olaifa", "Flutter Ogbomoso Lead Organiser", "", "Native"),
  speaker("Emmanuel Akinfulubi", "AI Developer", "Abeytrust Tech Solution", "AI"),
  speaker("Caleb Jesusegun", "Mobile Developer", "Civic24", "Tooling"),
  speaker("Jesutoni Aderibigbe", "Mobile Engineer", "Kwikpay Credit", "Testing"),
  speaker("Sodiq Eniola", "Software Engineer", "Deveote", "UI"),
  speaker("Temitayo Olakunle", "Co-founder & Mobile Engineer", "Ruut CSM", "Product"),
  speaker("Michael Ogundipe", "Flutter Developer", "Converge Group", "Performance"),
  speaker("Samuel Adekunle", "Software Engineer", "1app", "Backend"),
  speaker("Hassan Bahati", "Developer", "Invertase", "AI"),
  speaker("Ayodeji Michael", "Mobile Engineer", "", "AI"),
  speaker("Ajayi Ayodele", "Mobile App Developer", "Bizconnect24", "AI"),
  speaker("Samuel Mayowa", "Flutter Engineer", "Tutero", "Web"),
  speaker("Anuoluwapo Famakinwa", "Mobile Engineer", "MyCoverGenius", "Architecture"),
  speaker("Daniel Modupe Asaboro", "Software Engineering Intern", "Banana Dispatch", "Web3"),
  speaker("Adewale Adeosun", "Mobile Lead Engineer", "Vesti", "Security"),
  speaker("Blessing Wisdom", "Software Engineer", "University of Calabar", "HealthTech"),
  speaker("Samuel Abada", "Google Developer Expert · Flutter & Dart", "Yousend", "Design Systems"),
  speaker("Viktor Lidholt", "Founder & CTO", "Serverpod", "Backend"),
];
