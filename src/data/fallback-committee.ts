export interface CommitteeMember {
  name: string;
  role: string;
  title?: string;
  photo?: string;
  bio?: string;
}

export const fallbackCommittee: CommitteeMember[] = [
  { name: "Jamiu Okanlawon", role: "Convener", title: "FlutterBytes Conference" },
  { name: "David Adegoke", role: "Co-Convener / Organizing Committee Lead", title: "FlutterBytes Conference" },
  { name: "Mariam Hamzat BusyBee", role: "Co-Convener / PowerHouse", title: "FlutterBytes Conference" },
  { name: "Taiwo Adeyemi", role: "Head of Design", title: "Creative Team" },
  { name: "Funmi Okafor", role: "Head of Logistics", title: "Operations Team" },
  { name: "Emeka Nwachukwu", role: "Head of Sponsorship", title: "Business Team" },
  { name: "Aisha Mohammed", role: "Head of Marketing", title: "Marketing Team" },
  { name: "Tunde Adeleke", role: "Head of Volunteers", title: "Community Team" },
  { name: "Blessing Okonkwo", role: "Content Lead", title: "Content Team" },
  { name: "Kelechi Eze", role: "Technical Lead", title: "Tech Team" },
  { name: "Sade Williams", role: "Speaker Liaison", title: "Program Team" },
  { name: "Obinna Chukwu", role: "Photography Lead", title: "Media Team" },
  { name: "Fatima Yusuf", role: "Social Media Manager", title: "Marketing Team" },
  { name: "Chidi Okoye", role: "Venue Manager", title: "Operations Team" },
  { name: "Ngozi Igwe", role: "Registration Lead", title: "Operations Team" },
  { name: "Babatunde Olatunji", role: "Security Lead", title: "Operations Team" },
];
