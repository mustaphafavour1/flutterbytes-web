import { NextResponse } from "next/server";
import {
  GOOGLE_FORM_POST_URL, HACKATHON_FORM, entryParams,
  type HackathonEntry, type HackathonField,
} from "@/data/hackathon";
import { claimEntry, releaseEntry } from "@/lib/hackathon-registry";

export const dynamic = "force-dynamic";

const MAX_LEN = 5000;

/**
 * Plain text only: drops control characters (and line breaks outside the
 * description) and caps the length. Answers are only ever passed on to the
 * Google Form; the site never stores or displays them.
 */
function plainText(value: unknown, multiline: boolean) {
  if (typeof value !== "string") return "";
  const text = value
    .normalize("NFC")
    .replace(multiline ? /[\u0000-\u0008\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, multiline ? "" : " ")
    .trim();
  return text.slice(0, MAX_LEN);
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
    const v = plainText(data[k], k === "projectInfo");
    if (!v) return NextResponse.json({ ok: false, reason: "missing_field", field: k }, { status: 400 });
    entry[k] = v;
  }

  // One entry per builder: the same email or Serverpod project can't enter twice.
  const { taken, claimed } = await claimEntry(entry);
  if (taken) {
    return NextResponse.json({ ok: false, reason: "duplicate", field: taken }, { status: 409 });
  }

  let ok = false;
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
    ok = res.status === 200 && !html.includes("data-params");
    if (!ok) console.warn(`[hackathon] Google Form refused the entry (HTTP ${res.status})`);
  } catch (err) {
    console.error("[hackathon] Google Form unreachable", err);
  }

  // Not sent: free the email and project again so the builder can retry.
  if (!ok) await releaseEntry(claimed);
  return NextResponse.json({ ok }, { status: ok ? 200 : 502 });
}
