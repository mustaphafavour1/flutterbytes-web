export interface CommitteeMember {
  name: string;
  role: string;
  title?: string;
  photo?: string;
  /** Optional filename base in /public/committee (defaults to slug of name). */
  photoBase?: string;
  bio?: string;
}

/**
 * Organizing team. Photos live in /public/committee/ (any extension) and resolve
 * automatically by name (see src/lib/committee-photos.ts); set `photoBase` when
 * the uploaded filename differs from the person's name.
 */
const member = (name: string, role: string, photoBase?: string): CommitteeMember => ({
  name,
  role,
  photoBase,
});

export const fallbackCommittee: CommitteeMember[] = [
  member("Jamiu Okanlawon", "Convener"),
  member("David Adegoke", "Co-Convener / Organizing Committee Lead"),
  member("Mariam Hamzat (BusyBee)", "Co-Convener / PowerHouse", "mariam-hamzat"),
  member("Rebecca Saka", "Program Team Lead"),
  member("Olamilekan Akinjobi", "Project Team Lead"),
  member("Favour Mustapha", "Design Team Lead"),
  member("Peter Nathaniel", "Infrastructure Team Lead"),
  member("Damilola Alimi", "Volunteer Team Lead"),
  member("Emmanuella Ijeoma Ogbonna", "Content / PR", "emmanuella-ijeoma"),
  member("Christopher Nwosu-Madueke", "Hackathon Co-ordinator"),
  member("Kendi J", "FlutterBytes Ladies Community Co-ordinator"),
  member("Shalom Adebola", "Host"),
  member("Bamigboye TiOluwani", "Co-Host"),
];
