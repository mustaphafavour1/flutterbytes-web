import fs from "fs";
import path from "path";
import { slugify } from "./slug";
import type { CommitteeMember } from "@/data/fallback-committee";

const IMG_RE = /^(.+)\.(png|jpe?g|webp|avif|gif)$/i;

/**
 * Match each committee member to an image in /public/committee (any extension),
 * by `photoBase` when set, otherwise by the slug of their name. Missing photos
 * are left undefined so the UI shows an initials avatar.
 */
export function resolveCommittee(members: CommitteeMember[]): CommitteeMember[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", "committee"));
  } catch {
    return members;
  }
  const bySlug = new Map<string, string>();
  for (const f of files) {
    const m = f.match(IMG_RE);
    if (m) bySlug.set(m[1].toLowerCase(), `/committee/${f}`);
  }
  return members.map((mem) => {
    const base = (mem.photoBase ?? slugify(mem.name)).toLowerCase();
    return { ...mem, photo: bySlug.get(base) ?? mem.photo };
  });
}
