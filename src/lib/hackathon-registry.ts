import { createHash } from "crypto";

/**
 * One entry per builder, without keeping anyone's details: each submitted email
 * and Serverpod project ID is stored only as a one-way SHA-256 fingerprint in a
 * small Redis store (Upstash, connected in Vercel → Storage). Nothing a visitor
 * types is saved as text or ever shown on the site.
 */
const PREFIX = "fbc-hackathon-2026";
const KEEP_FOR_SECONDS = String(60 * 24 * 60 * 60); // fingerprints delete themselves after 60 days

export type ClaimKind = "email" | "projectId";

/**
 * Upstash's REST URL + token. Vercel names them KV_REST_API_URL/TOKEN, or with a
 * custom prefix when the store is connected (e.g. STORAGE_KV_REST_API_URL);
 * Upstash itself uses UPSTASH_REDIS_REST_URL/TOKEN. Accept any of these.
 */
function storeConfig() {
  const names = Object.keys(process.env).filter((k) => /(?:^|_)(?:KV_REST_API|REDIS_REST)_URL$/.test(k));
  for (const urlName of names) {
    const tokenName = urlName.replace(/_URL$/, "_TOKEN");
    const url = process.env[urlName];
    const token = process.env[tokenName];
    if (url && token) return { url: url.replace(/\/+$/, ""), token, names: [urlName, tokenName] };
  }
  return null;
}

export const fingerprint = (kind: ClaimKind, value: string) =>
  `${PREFIX}:${kind}:${createHash("sha256").update(value.trim().toLowerCase()).digest("hex")}`;

async function redis(command: string[]) {
  const store = storeConfig();
  if (!store) throw new Error("no store connected");
  const res = await fetch(store.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${store.token}` },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.error) throw new Error(`store HTTP ${res.status}: ${body.error ?? "no body"}`);
  return body.result;
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
  if (!storeConfig()) {
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

/** For the status check: is the duplicate check on, and does the store answer? (No secrets.) */
export async function registryStatus() {
  const store = storeConfig();
  const related = Object.keys(process.env).filter((k) => /KV_|REDIS|UPSTASH/i.test(k)).sort();
  if (!store) {
    return { duplicateCheck: "off", reason: "No Upstash REST URL + token found in this deployment", envVarNames: related };
  }
  try {
    const pong = await redis(["PING"]);
    return { duplicateCheck: pong === "PONG" ? "on" : "off", store: `answered ${String(pong)}`, using: store.names, envVarNames: related };
  } catch (err) {
    return { duplicateCheck: "off", store: `unreachable: ${(err as Error).message}`, using: store.names, envVarNames: related };
  }
}
