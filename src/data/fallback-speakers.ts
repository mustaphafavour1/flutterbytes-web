export interface Speaker {
  name: string;
  role: string;
  company: string;
  twitter?: string;
  photo?: string;
  bio?: string;
  tags?: string[];
}

const m = (n: number) => `https://randomuser.me/api/portraits/men/${n}.jpg`;
const w = (n: number) => `https://randomuser.me/api/portraits/women/${n}.jpg`;

export const fallbackSpeakers: Speaker[] = [
  { name: "Odinachi David",        role: "Flutter Developer",       company: "Google",        photo: m(32), twitter: "@odinachidavid",  bio: "Flutter GDE and speaker with deep expertise in building production Flutter applications. Passionate about AI integration in mobile development.",    tags: ["AI", "Architecture"] },
  { name: "Kudus Rufai",           role: "Mobile Engineer",         company: "Paystack",      photo: m(44), twitter: "@kudus_rufai",    bio: "Building mobile payment experiences that power African commerce. Expert in Flutter performance optimization and testing.",                          tags: ["Architecture", "Testing"] },
  { name: "Anuoluwapo Famakinwa",  role: "Senior Flutter Developer", company: "Interswitch",  photo: w(11), twitter: "@anuoluwapo_f",  bio: "Senior mobile engineer crafting beautiful, performant Flutter applications at scale in the fintech space.",                                      tags: ["UI", "Architecture"] },
  { name: "Nikki Eke",             role: "Tech Lead",               company: "Meta",          photo: w(49), twitter: "@nikkiflutter",  bio: "Tech lead building developer tools and experiences at Meta. Speaker, mentor, and community builder.",                                          tags: ["AI", "Community"] },
  { name: "Temitayo Adefope",      role: "Flutter GDE",             company: "Independent",   photo: w(60), twitter: "@temitayo_flutter", bio: "Flutter GDE and conference speaker focused on making Flutter accessible to developers across Africa.",                                   tags: ["Community", "AI"] },
  { name: "Chisom Obi",            role: "Mobile Architect",        company: "Flutterwave",   photo: w(72), twitter: "@chisom_builds", bio: "Building fintech mobile experiences that scale across Africa. Expert in mobile architecture and CI/CD.",                                      tags: ["Architecture", "Testing"] },
  { name: "Adewale Sulaimon",      role: "DevRel Engineer",         company: "Google",        photo: m(55), twitter: "@adewale_dev",   bio: "Developer Relations at Google, helping Flutter developers build better apps and grow their skills.",                                         tags: ["Community", "AI"] },
  { name: "Priscilla Nwosu",       role: "Engineering Manager",     company: "Kuda",          photo: w(88), twitter: "@priscilla_ng", bio: "Engineering manager building Africa's most loved digital bank. Passionate about engineering culture and team growth.",                         tags: ["Architecture", "Leadership"] },
  { name: "Emeka Okafor",          role: "Senior Mobile Engineer",  company: "Andela",        photo: m(68), twitter: "@emeka_builds", bio: "Helping African engineers build world-class mobile products. Expert in state management and performance profiling.",                          tags: ["Architecture", "Testing"] },
  { name: "Fatima Yusuf",          role: "Flutter GDE",             company: "Google",        photo: w(7),  twitter: "@fatima_dev",   bio: "Flutter GDE championing developer education across West Africa. Speaker, author, and open-source contributor.",                               tags: ["Community", "UI"] },
  { name: "Tunde Awoniyi",         role: "Mobile Architect",        company: "PiggyVest",     photo: m(81), twitter: "@tunde_mobile", bio: "Mobile architect powering the savings revolution in Africa. Obsessed with clean architecture, great UX, and fast CI/CD pipelines.",          tags: ["Architecture", "Testing"] },
  { name: "Amaka Chukwuemeka",     role: "Engineering Lead",        company: "Carbon",        photo: w(23), twitter: "@amaka_eng",    bio: "Engineering lead at one of Africa's fastest-growing lending platforms. Focuses on team building and building products for offline-first users.", tags: ["Leadership", "Architecture"] },
  { name: "Segun Akintunde",       role: "DevRel & Community Lead", company: "Flutter Community", photo: m(38), twitter: "@segun_dev", bio: "Driving Flutter adoption across Nigeria and the continent through meetups, workshops, and online content for 50k+ developers.",              tags: ["Community", "AI"] },
  { name: "Ngozi Okonkwo",         role: "Senior Developer",        company: "OPay",          photo: w(39), twitter: "@ngozi_builds", bio: "Senior Flutter developer building payment infrastructure for millions of users across Africa. Expert in performance and offline-first design.", tags: ["UI", "Architecture"] },
  { name: "Damilola Adisa",        role: "ML & Flutter Engineer",   company: "Andela",        photo: w(56), twitter: "@dami_ml",      bio: "Bridging the gap between machine learning and mobile UX. Specialises in on-device AI and TFLite integration in Flutter apps.",                 tags: ["AI", "Architecture"] },
  { name: "Ifeanyi Uche",          role: "Flutter & Firebase Expert", company: "KPMG",        photo: m(47), twitter: "@ifeanyi_dev",  bio: "Building enterprise Flutter applications with Firebase at scale. Speaker, GDE candidate, and mentor to 200+ developers.",                    tags: ["Architecture", "Community"] },
];
