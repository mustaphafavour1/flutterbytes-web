"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Info, Loader2, Lock, Pencil, Ticket } from "lucide-react";
import {
  CONTACT_EMAIL, HACKATHON_CLOSES, TICKETS_URL, hackathonPhase, prefilledFormUrl,
  type HackathonEntry, type HackathonField,
} from "@/data/hackathon";
import { btnPrimary, GRADIENT_RING, GLASS_PANEL } from "../styles";

type FieldDef = {
  key: HackathonField;
  label: string;
  hint?: string;
  placeholder: string;
  type?: "text" | "email";
  inputMode?: "text" | "email" | "url";
  autoComplete?: string;
  multiline?: boolean;
  half?: boolean;
  link?: boolean;
};

// Same order as the Google Form.
const ABOUT_YOU: FieldDef[] = [
  { key: "name", label: "Full name", placeholder: "Your full name", autoComplete: "name", half: true },
  { key: "email", label: "Email address", placeholder: "you@example.com", type: "email", inputMode: "email", autoComplete: "email", half: true },
];

const YOUR_BUILD: FieldDef[] = [
  { key: "projectName", label: "Project name", placeholder: "What's it called?", half: true },
  { key: "projectId", label: "Project ID", hint: "Your Serverpod Cloud project ID", placeholder: "my-product", half: true },
  {
    key: "projectInfo",
    label: "Project information",
    hint: "What the product does and the problem it solves",
    placeholder: "Who it's for, what it does, and why it matters.",
    multiline: true,
  },
  { key: "projectLink", label: "Project link", hint: "Where the live product runs", placeholder: "https://", inputMode: "url", link: true },
];

const DEMO_VIDEO: FieldDef[] = [
  {
    key: "videoLink",
    label: "Demo video link",
    hint: "Upload your video to Google Drive and set access to \"Anyone with the link\"",
    placeholder: "https://drive.google.com/",
    inputMode: "url",
    link: true,
  },
];

const ALL_FIELDS = [...ABOUT_YOU, ...YOUR_BUILD, ...DEMO_VIDEO];
const SUBMITTED_KEY = "fbc-hackathon-2026-entry"; // set in this browser after a successful entry
const EMPTY: HackathonEntry = { name: "", email: "", projectName: "", projectId: "", projectInfo: "", projectLink: "", videoLink: "" };

/** Accept "myapp.com" as well as "https://myapp.com". */
const withProtocol = (v: string) => (/^https?:\/\//i.test(v) ? v : `https://${v}`);

function isLink(v: string) {
  try {
    const u = new URL(withProtocol(v));
    return /^https?:$/.test(u.protocol) && u.hostname.includes(".");
  } catch {
    return false;
  }
}

function validate(v: HackathonEntry): Partial<Record<HackathonField, string>> {
  const errors: Partial<Record<HackathonField, string>> = {};
  for (const f of ALL_FIELDS) {
    const val = v[f.key].trim();
    if (!val) errors[f.key] = `Add your ${f.label[0].toLowerCase()}${f.label.slice(1)}`;
    else if (f.key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) errors[f.key] = "That email doesn't look right";
    else if (f.link && !isLink(val)) errors[f.key] = "Use a full link, like https://myapp.com";
  }
  return errors;
}

function clean(v: HackathonEntry): HackathonEntry {
  const out = { ...v };
  (Object.keys(out) as HackathonField[]).forEach((k) => (out[k] = out[k].trim()));
  out.email = out.email.toLowerCase();
  out.projectLink = withProtocol(out.projectLink);
  out.videoLink = withProtocol(out.videoLink);
  return out;
}

const inputBase =
  "w-full rounded-xl px-4 py-3 bg-fbc-navy/60 border text-fbc-white placeholder:text-fbc-muted/50 text-sm focus:outline-none focus:ring-2 transition-colors disabled:opacity-60";

/* ─────────────────────────── pieces ─────────────────────────── */

function FormField({
  f, value, error, disabled, onChange, onBlur,
}: {
  f: FieldDef; value: string; error?: string; disabled: boolean;
  onChange: (v: string) => void; onBlur: () => void;
}) {
  const id = `hk-${f.key}`;
  const describedBy = [f.hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const cls = `${inputBase} ${
    error ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/20" : "border-fbc-border focus:border-fbc-blue focus:ring-fbc-blue/20"
  }`;
  const shared = {
    id, name: f.key, value, disabled, placeholder: f.placeholder,
    "aria-invalid": !!error, "aria-describedby": describedBy, "aria-required": true,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    onBlur,
  };
  return (
    <div className={f.half ? "" : "sm:col-span-2"}>
      <label htmlFor={id} className="block text-sm font-semibold text-fbc-white">
        {f.label} <span className="text-fbc-blue" aria-hidden="true">*</span>
      </label>
      {/* hint sits under the input so side-by-side inputs always line up */}
      <div className="mt-2">
        {f.multiline ? (
          <textarea {...shared} rows={5} className={`${cls} resize-y min-h-[132px] leading-relaxed`} />
        ) : (
          <input
            {...shared}
            type={f.type ?? "text"}
            inputMode={f.inputMode}
            autoComplete={f.autoComplete ?? "off"}
            spellCheck={f.link || f.type === "email" ? false : undefined}
            className={cls}
          />
        )}
      </div>
      {f.hint && <p id={`${id}-hint`} className="text-xs text-fbc-muted mt-1.5">{f.hint}</p>}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-rose-500 overflow-hidden"
          >
            <span className="block pt-1.5">{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldGroup({
  n, title, fields, values, showError, disabled, set, touch,
}: {
  n: string; title: string; fields: FieldDef[]; values: HackathonEntry; disabled: boolean;
  showError: (k: HackathonField) => string | undefined;
  set: (k: HackathonField) => (v: string) => void;
  touch: (k: HackathonField) => () => void;
}) {
  return (
    <fieldset>
      <legend className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fbc-blue mb-5">
        <span>{n}</span>
        <span>{title}</span>
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map((f) => (
          <FormField key={f.key} f={f} value={values[f.key]} error={showError(f.key)} disabled={disabled}
            onChange={set(f.key)} onBlur={touch(f.key)} />
        ))}
      </div>
    </fieldset>
  );
}

/** Glass card with the 12px gradient ring, same as the hackathon snippet. */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="grad-ring relative rounded-[28px] p-2 sm:p-3 shadow-2xl" style={GRADIENT_RING}>
      <div className="rounded-[20px] sm:rounded-2xl p-6 sm:p-9" style={GLASS_PANEL}>{children}</div>
    </div>
  );
}

function StateIcon({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "emerald" }) {
  return (
    <span
      className={`mx-auto flex w-14 h-14 items-center justify-center rounded-full border ${
        tone === "emerald" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500" : "border-fbc-blue/30 bg-fbc-blue/10 text-fbc-blue"
      }`}
    >
      {children}
    </span>
  );
}

const linkQuiet = "inline-flex items-center gap-1.5 text-sm font-semibold text-fbc-muted hover:text-fbc-white transition-colors";

/* ─────────────────────────── page ─────────────────────────── */

const fade = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(6px)" },
  transition: { duration: 0.35, ease: "easeOut" },
} as const;

export default function ApplyForm({ serverNow }: { serverNow: number }) {
  const [now, setNow] = useState(serverNow);
  const [values, setValues] = useState<HackathonEntry>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<HackathonField, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "fallback" | "already">("idle");
  const [alreadyBy, setAlreadyBy] = useState<"email" | "projectId" | "browser">("browser");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [trap, setTrap] = useState(""); // honeypot: real people never see or fill it
  const formRef = useRef<HTMLFormElement>(null);

  // Live clock (+ ?preview=closed to see the closed state early).
  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("preview");
    const tick = () => setNow(preview === "closed" ? HACKATHON_CLOSES + 1 : Date.now());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // One entry per builder: this browser already sent one.
  useEffect(() => {
    try {
      if (localStorage.getItem(SUBMITTED_KEY)) setStatus("already");
    } catch {
      // storage blocked: the server-side email check still applies
    }
  }, []);

  const closed = hackathonPhase(now) !== "open";
  const errors = validate(values);
  const showError = (k: HackathonField) => (attempted || touched[k] ? errors[k] : undefined);
  const sending = status === "sending";

  const set = (k: HackathonField) => (v: string) => setValues((s) => ({ ...s, [k]: v }));
  const touch = (k: HackathonField) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    if (trap) { setStatus("done"); return; }

    const firstInvalid = ALL_FIELDS.find((f) => errors[f.key]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#hk-${firstInvalid.key}`)?.focus();
      return;
    }

    const entry = clean(values);
    setStatus("sending");
    let result: { ok?: boolean; reason?: string; field?: "email" | "projectId" } = {};
    try {
      const res = await fetch("/api/hackathon/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      result = await res.json();
    } catch {
      // network error: offer the Google Form below
    }

    if (result.reason === "duplicate") {
      setAlreadyBy(result.field ?? "email");
      setStatus("already");
    } else if (result.ok) {
      try {
        localStorage.setItem(SUBMITTED_KEY, JSON.stringify({ email: entry.email, at: Date.now() }));
      } catch {
        // storage blocked: fine, the entry is in
      }
      setStatus("done");
    } else {
      setFallbackUrl(prefilledFormUrl(entry));
      setStatus("fallback");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const view = closed ? "closed" : status === "sending" ? "idle" : status;
  const groupProps = { values, showError, disabled: sending, set, touch };

  return (
    <section className="relative overflow-hidden sec-plain pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(42,157,244,0.12) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        aria-hidden="true"
      />
      <div className="absolute -top-24 right-0 w-[30rem] h-[30rem] rounded-full bg-fbc-blue/15 blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <Link href="/hackathon" className={`${linkQuiet} mb-8`}>
          <ArrowLeft size={14} /> Hackathon
        </Link>

        <AnimatePresence mode="wait">
          {view === "idle" && (
            <motion.div key="form" {...fade}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fbc-blue mb-3">FlutterBytes × Serverpod Hackathon</p>
              <h1 className="font-gigasans font-bold text-4xl sm:text-5xl leading-[1.05] tracking-tight text-fbc-white mb-4">
                Submit your <span className="text-fbc-blue">build.</span>
              </h1>
              <p className="text-fbc-muted text-sm sm:text-base mb-10">
                One submission per person. Closes Fri, Oct 30 · 11:59pm WAT.
              </p>

              <div className="relative">
                <div className="absolute -inset-8 rounded-[48px] bg-gradient-to-br from-fbc-blue/25 via-fbc-sky/10 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />
                <Card>
                  <form ref={formRef} onSubmit={submit} noValidate className="relative space-y-10">
                    <FieldGroup n="01" title="About you" fields={ABOUT_YOU} {...groupProps} />
                    <FieldGroup n="02" title="Your build" fields={YOUR_BUILD} {...groupProps} />
                    <FieldGroup n="03" title="Demo video" fields={DEMO_VIDEO} {...groupProps} />

                    {/* honeypot */}
                    <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                      <label htmlFor="hk-company">Company</label>
                      <input id="hk-company" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                    </div>

                    <div className="flex flex-col items-center gap-3 pt-2">
                      <p className="flex items-center gap-2 rounded-full border border-fbc-border/70 bg-fbc-navy/40 px-4 py-2 text-xs text-fbc-muted text-center">
                        <Info size={14} className="text-fbc-blue flex-shrink-0" />
                        You can only submit once, so check your details first.
                      </p>
                      <button type="submit" disabled={sending} className={`${btnPrimary} disabled:opacity-70`}>
                        {sending ? (
                          <><Loader2 size={17} className="animate-spin" /> Submitting</>
                        ) : (
                          <>Submit entry <ArrowRight size={17} /></>
                        )}
                      </button>
                      {attempted && Object.keys(errors).length > 0 && (
                        <p className="text-xs text-rose-500" role="alert">Fill in the highlighted fields to continue.</p>
                      )}
                    </div>
                  </form>
                </Card>
              </div>
            </motion.div>
          )}

          {view === "done" && (
            <motion.div key="done" {...fade}>
              <Card>
                <div className="text-center">
                  <StateIcon tone="emerald"><Check size={26} strokeWidth={3} /></StateIcon>
                  <h1 className="font-gigasans font-bold text-3xl sm:text-4xl text-fbc-white mt-6 mb-3">Your entry is in.</h1>
                  <p className="text-fbc-muted text-sm sm:text-base max-w-md mx-auto">
                    Judging starts after Oct 30. The top three are crowned live at FlutterBytes 2026, Nov 6–7.
                  </p>
                  <div className="mt-9 flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
                    <a href={TICKETS_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                      <Ticket size={17} /> Get tickets
                    </a>
                    <Link href="/hackathon" className={linkQuiet}>Back to the hackathon <ArrowRight size={14} /></Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {view === "already" && (
            <motion.div key="already" {...fade}>
              <Card>
                <div className="text-center">
                  <StateIcon tone="emerald"><Check size={26} strokeWidth={3} /></StateIcon>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fbc-blue mt-6">One entry per builder</p>
                  <h1 className="font-gigasans font-bold text-3xl sm:text-4xl text-fbc-white mt-2 mb-3">Submission already made</h1>
                  <p className="text-fbc-muted text-sm sm:text-base max-w-md mx-auto">
                    {alreadyBy === "email"
                      ? "An entry with this email is already in."
                      : alreadyBy === "projectId"
                      ? "An entry for this Serverpod project is already in."
                      : "You've already sent an entry from this browser."}{" "}
                    Need to change something? Email{" "}
                    <a href={`mailto:${CONTACT_EMAIL}?subject=Hackathon%20entry`} className="text-fbc-blue hover:underline">{CONTACT_EMAIL}</a>.
                  </p>
                  <div className="mt-9 flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
                    <a href={TICKETS_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                      <Ticket size={17} /> Get tickets
                    </a>
                    <Link href="/hackathon" className={linkQuiet}>Back to the hackathon <ArrowRight size={14} /></Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {view === "fallback" && (
            <motion.div key="fallback" {...fade}>
              <Card>
                <div className="text-center">
                  <StateIcon><ArrowUpRight size={24} /></StateIcon>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fbc-blue mt-6">One more step</p>
                  <h1 className="font-gigasans font-bold text-3xl sm:text-4xl text-fbc-white mt-2 mb-3">Finish on Google Forms</h1>
                  <p className="text-fbc-muted text-sm sm:text-base max-w-md mx-auto">
                    We couldn&apos;t send your entry from here. Your answers are already filled in there; sign in if Google asks, then press Submit.
                  </p>
                  <div className="mt-9 flex flex-col items-center gap-4">
                    <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                      Open Google Forms <ArrowUpRight size={17} />
                    </a>
                    <button type="button" onClick={() => setStatus("idle")} className={linkQuiet}>
                      <Pencil size={13} /> Edit my details
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {view === "closed" && (
            <motion.div key="closed" {...fade}>
              <Card>
                <div className="text-center">
                  <StateIcon><Lock size={22} /></StateIcon>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fbc-blue mt-6">Applications closed</p>
                  <h1 className="font-gigasans font-bold text-3xl sm:text-4xl text-fbc-white mt-2 mb-3">Submissions are closed.</h1>
                  <p className="text-fbc-muted text-sm sm:text-base max-w-md mx-auto">
                    Entries closed Oct 30, 11:59pm WAT. See the winners crowned live at FlutterBytes 2026, Nov 6–7.
                  </p>
                  <div className="mt-9 flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
                    <a href={TICKETS_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                      <Ticket size={17} /> Get tickets
                    </a>
                    <Link href="/hackathon" className={linkQuiet}>Back to the hackathon <ArrowRight size={14} /></Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
