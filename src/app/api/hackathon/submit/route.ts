import { NextResponse } from "next/server";
import {
  GOOGLE_FORM_POST_URL, HACKATHON_FORM, entryParams,
  type HackathonEntry, type HackathonField,
} from "@/data/hackathon";
import { getHackathonSubmissionRows } from "@/lib/sheets";

export const dynamic = "force-dynamic";

const MAX_LEN = 5000;
const norm = (s: string | undefined) => (s ?? "").trim().toLowerCase();

/**
 * One entry per builder: is this email or Serverpod project already in the
 * responses sheet? Returns null when it isn't, or when the sheet can't be read
 * (then the entry goes through rather than turning a real applicant away).
 */
async function findDuplicate(entry: HackathonEntry): Promise<"email" | "projectId" | null> {
  const rows = await getHackathonSubmissionRows();
  if (!rows || rows.length < 2) return null;
  const header = rows[0].map(norm);
  const emailCol = header.findIndex((h) => h.includes("email"));
  const projectCol = header.findIndex((h) => h.startsWith("project id"));
  for (const row of rows.slice(1)) {
    if (emailCol >= 0 && norm(row[emailCol]) === norm(entry.email)) return "email";
    if (projectCol >= 0 && norm(row[projectCol]) === norm(entry.projectId)) return "projectId";
  }
  return null;
}

/**
 * Sends a hackathon entry to the Google Form from the server, so we can read
 * Google's answer. A browser no-cors POST can't, and would report success even
 * when Google refuses the entry (e.g. while the form requires sign-in).
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  const entry = {} as HackathonEntry;
  for (const k of Object.keys(HACKATHON_FORM.entries) as HackathonField[]) {
    const v = typeof data[k] === "string" ? (data[k] as string).trim().slice(0, MAX_LEN) : "";
    if (!v) return NextResponse.json({ ok: false, reason: "missing_field", field: k }, { status: 400 });
    entry[k] = v;
  }

  const duplicate = await findDuplicate(entry);
  if (duplicate) {
    return NextResponse.json({ ok: false, reason: "duplicate", field: duplicate }, { status: 409 });
  }

  try {
    const res = await fetch(GOOGLE_FORM_POST_URL, {
      method: "POST",
      body: entryParams(entry),
      redirect: "manual",
      cache: "no-store",
    });
    // Accepted: 200 with the confirmation page. Sign-in required: a redirect or 401.
    // Rejected answers: 400, or the questions rendered again (they carry data-params).
    const html = res.status === 200 ? await res.text() : "";
    const ok = res.status === 200 && !html.includes("data-params");
    if (!ok) console.warn(`[hackathon] Google Form refused the entry (HTTP ${res.status})`);
    return NextResponse.json({ ok }, { status: ok ? 200 : 502 });
  } catch (err) {
    console.error("[hackathon] Google Form unreachable", err);
    return NextResponse.json({ ok: false, reason: "network" }, { status: 502 });
  }
}
