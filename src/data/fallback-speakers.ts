export interface Speaker {
  name: string;
  role: string;
  company: string;
  twitter?: string;
  photo?: string;
  bio?: string;
  tags?: string[];
}

export const fallbackSpeakers: Speaker[] = [
  { name: "Odinachi David", role: "Flutter Developer", company: "Google", twitter: "@odinachidavid", bio: "Flutter GDE and speaker with deep expertise in building production Flutter applications. Passionate about AI integration in mobile development.", tags: ["AI", "Architecture"] },
  { name: "Kudus Rufai", role: "Mobile Engineer", company: "Paystack", twitter: "@kudus_rufai", bio: "Building mobile payment experiences that power African commerce. Expert in Flutter performance optimization and testing.", tags: ["Architecture", "Testing"] },
  { name: "Anuoluwapo Famakinwa", role: "Senior Flutter Developer", company: "Interswitch", twitter: "@anuoluwapo_f", bio: "Senior mobile engineer crafting beautiful, performant Flutter applications at scale in the fintech space.", tags: ["UI", "Architecture"] },
  { name: "Nikki Eke", role: "Tech Lead", company: "Meta", twitter: "@nikkiflutter", bio: "Tech lead building developer tools and experiences at Meta. Speaker, mentor, and community builder.", tags: ["AI", "Community"] },
  { name: "Temitayo Adefope", role: "Flutter GDE", company: "Independent", twitter: "@temitayo_flutter", bio: "Flutter GDE and conference speaker focused on making Flutter accessible to developers across Africa.", tags: ["Community", "AI"] },
  { name: "Chisom Obi", role: "Mobile Architect", company: "Flutterwave", twitter: "@chisom_builds", bio: "Building fintech mobile experiences that scale across Africa. Expert in mobile architecture and CI/CD.", tags: ["Architecture", "Testing"] },
  { name: "Adewale Sulaimon", role: "DevRel Engineer", company: "Google", twitter: "@adewale_dev", bio: "Developer Relations at Google, helping Flutter developers build better apps and grow their skills.", tags: ["Community", "AI"] },
  { name: "Priscilla Nwosu", role: "Engineering Manager", company: "Kuda", twitter: "@priscilla_ng", bio: "Engineering manager building Africa's most loved digital bank. Passionate about engineering culture and team growth.", tags: ["Architecture", "Leadership"] },
];
