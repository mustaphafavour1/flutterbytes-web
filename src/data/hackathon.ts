/**
 * FlutterBytes × Serverpod Hackathon: single source of truth for links,
 * dates and the submission form. All times are WAT (UTC+1).
 */
export const TICKETS_URL = "https://www.harpen.in/flutterbytes-conference-2026";
export const CONTACT_EMAIL = "contact.flutterbytes@gmail.com";

/**
 * The Google Form behind the branded /hackathon/apply page. Entries are sent to
 * it from the server (/api/hackathon/submit) using these entry IDs.
 */
export const HACKATHON_FORM = {
  id: "1FAIpQLSd9lGTKMS_lQwqlfWnAntWo-n3Kt0XGV0uX8_z6yK1kaYNpUA",
  entries: {
    name: "entry.2005620554",
    email: "entry.1045781291",
    projectName: "entry.1831882274",
    projectId: "entry.73303985",
    projectInfo: "entry.507386588",
    projectLink: "entry.1301816772",
    videoLink: "entry.535272690",
  },
};

export type HackathonField = keyof typeof HACKATHON_FORM.entries;
export type HackathonEntry = Record<HackathonField, string>;

export const GOOGLE_FORM_VIEW_URL = `https://docs.google.com/forms/d/e/${HACKATHON_FORM.id}/viewform`;
export const GOOGLE_FORM_POST_URL = `https://docs.google.com/forms/d/e/${HACKATHON_FORM.id}/formResponse`;

/** Every answer keyed by its Google Form entry ID. */
export function entryParams(entry: HackathonEntry) {
  const params = new URLSearchParams();
  (Object.keys(HACKATHON_FORM.entries) as HackathonField[]).forEach((k) => {
    if (entry[k]) params.append(HACKATHON_FORM.entries[k], entry[k]);
  });
  return params;
}

/** The Google Form with every answer already filled in (fallback if a silent submit is refused). */
export const prefilledFormUrl = (entry: HackathonEntry) =>
  `${GOOGLE_FORM_VIEW_URL}?usp=pp_url&${entryParams(entry).toString()}`;

/** Where every "Apply now" button goes. */
export const HACKATHON_APPLY_URL = "/hackathon/apply";

export const HACKATHON_OPENS = Date.parse("2026-10-23T00:00:00+01:00");
/** Applications/submissions close Friday, Oct 30 at 11:59pm WAT. */
export const HACKATHON_CLOSES = Date.parse("2026-10-30T23:59:59+01:00");
/** Winners are announced at the conference, Nov 6–7. */
export const WINNERS_START = Date.parse("2026-11-06T09:00:00+01:00");
export const WINNERS_END = Date.parse("2026-11-07T23:59:59+01:00");

/**
 * open   → applications open (until the Oct 30 deadline)
 * closed → submissions closed, judging / announcement at the conference
 * ended  → conference is over, winners announced
 */
export type HackathonPhase = "open" | "closed" | "ended";

export function hackathonPhase(now: number): HackathonPhase {
  if (now <= HACKATHON_CLOSES) return "open";
  if (now <= WINNERS_END) return "closed";
  return "ended";
}
