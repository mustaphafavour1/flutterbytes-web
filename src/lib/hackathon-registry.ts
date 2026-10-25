import { createHash } from "crypto";

/**
 * One entry per builder, without keeping anyone's details: each submitted email
 * and Serverpod project ID is stored only as a one-way SHA-256 fingerprint in a
 * small Redis store (Upstash, connected in Vercel → Storage). Nothing a visitor
 * types is saved as text or ever shown on the site.
 */
const STORE_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const STORE_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const PREFIX = "fbc-hackathon-2026";
const KEEP_FOR_SECONDS = String(60 * 24 * 60 * 60); // fingerprints delete themselves after 60 days

export type ClaimKind = "email" | "projectId";

export const fingerprint = (kind: ClaimKind, value: string) =>
  `${PREFIX}:${kind}:${createHash("sha256").update(value.trim().toLowerCase()).digest("hex")}`;

async function redis(command: string[]) {
  const res = await fetch(STORE_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${STORE_TOKEN}` },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`store HTTP ${res.status}`);
  return (await res.json()).result;
}

export async function releaseEntry(keys: string[]) {
  if (!keys.length) return;
  try {
    await redis(["DEL", ...keys]);
  } catch (err) {
    console.error("[hackathon] couldn't release claimed fingerprints", err);
  }
}

/**
 * Claims this entry's email and project ID ("add if new", so two entries sent
 * at the same moment can't both get through). Returns which one was already
 * taken, or the claimed keys to release if the entry later fails to send.
 * Without a reachable store nothing is claimed and the entry goes through.
 */
export async function claimEntry(entry: Record<ClaimKind, string>): Promise<{ taken: ClaimKind | null; claimed: string[] }> {
  if (!STORE_URL || !STORE_TOKEN) {
    console.warn("[hackathon] duplicate check is off: no Upstash Redis store connected");
    return { taken: null, claimed: [] };
  }
  const claimed: string[] = [];
  try {
    for (const kind of ["email", "projectId"] as const) {
      const key = fingerprint(kind, entry[kind]);
      const result = await redis(["SET", key, new Date().toISOString(), "NX", "EX", KEEP_FOR_SECONDS]);
      if (result !== "OK") {
        await releaseEntry(claimed);
        return { taken: kind, claimed: [] };
      }
      claimed.push(key);
    }
    return { taken: null, claimed };
  } catch (err) {
    console.error("[hackathon] duplicate check unavailable", err);
    await releaseEntry(claimed);
    return { taken: null, claimed: [] };
  }
}
