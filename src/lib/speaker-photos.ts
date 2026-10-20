import fs from "fs";
import path from "path";
import { slugify } from "./slug";
import type { Speaker } from "@/data/fallback-speakers";

const IMG_RE = /^(?:(\d+)-)?(.+)\.(png|jpe?g|webp|avif|gif)$/i;

/**
 * Match each speaker to an image file in /public/<folder>.
 *
 * Filenames:
 *   - are the person's name, lowercase-hyphenated  → `odinachi-david.jpg`
 *   - may use ANY common extension (.jpg/.png/.webp/…) — whichever you uploaded
 *   - may OPTIONALLY start with "N-" to pin display order, lower = earlier
 *       `1-odinachi-david.png`  → shown first
 *     Prefixed speakers sort ascending and come first; everyone else keeps their
 *     original list order after them. No prefix needed until you want to reorder.
 *
 * Missing photos are left undefined so the UI shows an initials avatar.
 */
export function resolveSpeakerPhotos(speakers: Speaker[], folder: string): Speaker[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", folder));
  } catch {
    return speakers; // folder missing / unreadable — everyone falls back to initials
  }

  const bySlug = new Map<string, { file: string; order: number }>();
  for (const f of files) {
    const m = f.match(IMG_RE);
    if (!m) continue;
    const order = m[1] ? parseInt(m[1], 10) : Number.POSITIVE_INFINITY;
    const slug = slugify(m[2]);
    const existing = bySlug.get(slug);
    // Prefer the lowest-numbered file if the same person has more than one.
    if (!existing || order < existing.order) bySlug.set(slug, { file: f, order });
  }

  return speakers
    .map((s, idx) => {
      const hit = bySlug.get(slugify(s.name));
      return {
        speaker: { ...s, photo: hit ? `/${folder}/${hit.file}` : s.photo },
        order: hit ? hit.order : Number.POSITIVE_INFINITY,
        idx,
      };
    })
    .sort((a, b) => a.order - b.order || a.idx - b.idx)
    .map((w) => w.speaker);
}

/** Past-edition speakers resolve their photos from /public/past_speakers. */
export const resolvePastSpeakers = (speakers: Speaker[]) => resolveSpeakerPhotos(speakers, "past_speakers");

/** 2026 speakers resolve their photos from /public/speakers_2026. */
export const resolveSpeakers2026 = (speakers: Speaker[]) => resolveSpeakerPhotos(speakers, "speakers_2026");
