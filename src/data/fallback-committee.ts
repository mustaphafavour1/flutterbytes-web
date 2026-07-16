import { committeePhoto } from "@/lib/slug";

export interface CommitteeMember {
  name: string;
  role: string;
  title?: string;
  photo?: string;
  bio?: string;
}

/**
 * Organizing team.
 *
 * Photos: drop each person's picture into /public/committee/ named
 * `<firstname-lastname>.jpg` (e.g. jamiu-okanlawon.jpg). The filename is derived
 * automatically from the name. Until uploaded, an initials avatar shows.
 *
 * Edit the names/roles below to match your real team.
 */
const member = (name: string, role: string, title?: string): CommitteeMember => ({
  name,
  role,
  title,
  photo: committeePhoto(name),
});

export const fallbackCommittee: CommitteeMember[] = [
  member("Jamiu Okanlawon", "Convener", "FlutterBytes Conference"),
  member("David Adegoke", "Co-Convener / Organizing Committee Lead", "FlutterBytes Conference"),
  member("Mariam Hamzat BusyBee", "Co-Convener / PowerHouse", "FlutterBytes Conference"),
  member("Taiwo Adeyemi", "Head of Design", "Creative Team"),
  member("Funmi Okafor", "Head of Logistics", "Operations Team"),
  member("Emeka Nwachukwu", "Head of Sponsorship", "Business Team"),
  member("Aisha Mohammed", "Head of Marketing", "Marketing Team"),
  member("Tunde Adeleke", "Head of Volunteers", "Community Team"),
  member("Blessing Okonkwo", "Content Lead", "Content Team"),
  member("Kelechi Eze", "Technical Lead", "Tech Team"),
  member("Sade Williams", "Speaker Liaison", "Program Team"),
  member("Obinna Chukwu", "Photography Lead", "Media Team"),
  member("Fatima Yusuf", "Social Media Manager", "Marketing Team"),
  member("Chidi Okoye", "Venue Manager", "Operations Team"),
  member("Ngozi Igwe", "Registration Lead", "Operations Team"),
  member("Babatunde Olatunji", "Security Lead", "Operations Team"),
];
