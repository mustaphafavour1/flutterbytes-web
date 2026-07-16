import { speakerPhoto } from "@/lib/slug";

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
 * Real FlutterBytes speakers (from the submitted sessions list).
 *
 * Photos: drop each person's picture into /public/speakers/ named
 * `<firstname-lastname>.jpg` (e.g. odinachi-david.jpg). The filename is derived
 * automatically from the name, so no code change is needed once the file exists.
 * Until a photo is uploaded, the speaker shows an initials avatar.
 *
 * `role` = job title. The sessions CSV did not include job titles, so these are
 * left blank for now — fill each one in and it appears on the speaker card.
 */
const speaker = (name: string, tag: string, role = ""): Speaker => ({
  name,
  role,
  company: "",
  photo: speakerPhoto(name),
  tags: tag ? [tag] : [],
});

export const fallbackSpeakers: Speaker[] = [
  speaker("Odinachi David", "Monetization"),
  speaker("Kudus Rufai", "Real-Time UX"),
  speaker("Atuoha Anthony", "Architecture"),
  speaker("Sebastine Odeh", "Testing"),
  speaker("Sasha Denisov", "AI"),
  speaker("Festus Olusegun", "Code Quality"),
  speaker("Agalaba Ifeanyi", "AI"),
  speaker("Mrinal Jain", "Multiplatform"),
  speaker("Nikki Eke", "UX"),
  speaker("Chima Precious", "Dart"),
  speaker("Ayomiposi Fabiyi", "Games"),
  speaker("David Oluwabusayo", "Wellbeing"),
  speaker("Glory Olaifa", "Native"),
  speaker("Emmanuel Akinfulubi", "AI"),
  speaker("Caleb Jesusegun", "Tooling"),
  speaker("Jesutoni Aderibigbe", "Testing"),
  speaker("Sodiq Eniola", "UI"),
  speaker("Temitayo Olakunle", "Product"),
  speaker("Yunwen Eric", "UI"),
  speaker("Michael Ogundipe", "Performance"),
  speaker("Samuel Adekunle", "Backend"),
  speaker("Hassan Bahati", "AI"),
  speaker("Ayodeji Michael", "AI"),
  speaker("Ajayi Ayodele", "AI"),
  speaker("Samuel Mayowa", "Web"),
  speaker("Anuoluwapo Famakinwa", "Architecture"),
  speaker("Daniel Modupe Asaboro", "Web3"),
  speaker("Adewale Adeosun", "Security"),
  speaker("Blessing Wisdom", "HealthTech"),
  speaker("Samuel Abada", "Design Systems"),
  speaker("Viktor Lidholt", "Backend"),
];
