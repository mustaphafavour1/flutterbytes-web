/**
 * FlutterBytes × Serverpod Hackathon: single source of truth for links,
 * dates and the submission form. All times are WAT (UTC+1).
 */
export const TICKETS_URL = "https://www.harpen.in/flutterbytes-conference-2026";

/**
 * The Google Form behind the branded /hackathon/apply page. Submissions are
 * POSTed silently to `formResponse` with these entry IDs.
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
    /**
     * Entry ID of the "Short video" question once it is a SHORT ANSWER (video
     * link) instead of a file upload. Leave empty until then: Google Forms can't
     * accept file uploads from a website, and a form with a file-upload question
     * forces Google sign-in, which rejects silent submissions.
     */
    videoLink: "",
  },
};

export const GOOGLE_FORM_VIEW_URL = `https://docs.google.com/forms/d/e/${HACKATHON_FORM.id}/viewform`;
export const GOOGLE_FORM_POST_URL = `https://docs.google.com/forms/d/e/${HACKATHON_FORM.id}/formResponse`;

/** True once the video question is a link field, so the whole entry can be sent silently. */
export const SILENT_SUBMIT_READY = HACKATHON_FORM.entries.videoLink !== "";

/**
 * Where "Apply now" buttons go: the branded on-site form once silent submission
 * is ready; until then, straight to the Google Form so no entry is ever lost.
 */
export const HACKATHON_APPLY_URL = SILENT_SUBMIT_READY ? "/hackathon/apply" : GOOGLE_FORM_VIEW_URL;
export const isExternalUrl = (url: string) => /^https?:\/\//.test(url);

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
