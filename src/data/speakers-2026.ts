import type { Speaker } from "@/data/fallback-speakers";

/**
 * FlutterBytes 2026 speakers.
 *
 * Photos: drop each person's picture into /public/speakers_2026/ named
 * `<firstname-lastname>.jpg` (any extension; optional `N-` prefix to order).
 * Fill one entry per speaker below — `role` is the tagline/job title, `company`
 * optional, `twitter` optional (handle or full URL), `tags` optional (shown as chips).
 *
 * While this list is empty the "2026 Speakers" tab stays on the coming-soon state.
 */
export const speaker = (name: string, role: string, company = "", twitter?: string, tag?: string): Speaker => ({
  name,
  role,
  company,
  twitter,
  tags: tag ? [tag] : [],
});

export const speakers2026: Speaker[] = [
  // Example (delete once real speakers are added):
  // speaker("Jane Doe", "Senior Flutter Engineer", "Paystack", "@janedoe", "AI"),
];
