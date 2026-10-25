/**
 * FlutterBytes × Serverpod Hackathon — single source of truth for links and
 * dates. All times are WAT (UTC+1).
 */
export const HACKATHON_APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd9lGTKMS_lQwqlfWnAntWo-n3Kt0XGV0uX8_z6yK1kaYNpUA/viewform";
export const TICKETS_URL = "https://www.harpen.in/flutterbytes-conference-2026";

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
