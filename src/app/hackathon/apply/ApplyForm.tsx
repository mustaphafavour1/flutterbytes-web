"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Film, Loader2, Lock, Pencil, Ticket } from "lucide-react";
import {
  HACKATHON_FORM, GOOGLE_FORM_VIEW_URL, GOOGLE_FORM_POST_URL, SILENT_SUBMIT_READY,
  HACKATHON_CLOSES, TICKETS_URL, hackathonPhase,
} from "@/data/hackathon";
import { btnPrimary, GRADIENT_RING, GLASS_PANEL } from "../styles";

type Field = keyof typeof HACKATHON_FORM.entries;
type Values = Record<Field, string>;

type FieldDef = {
  key: Field;
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

const ABOUT_YOU: FieldDef[] = [
  { key: "name", label: "Full name", placeholder: "Your full name", autoComplete: "name", half: true },
  { key: "email", label: "Email address", placeholder: "you@example.com", type: "email", inputMode: "email", autoComplete: "email", half: true },
];

const YOUR_BUILD: FieldDef[] = [
  { key: "projectName", label: "Project name", placeholder: "What's it called?", half: true },
  { key: "projectId", label: "Project ID", hint: "Your Serverpod Cloud project ID", placeholder: "my-product", half: true },
  { key: "projectLink", label: "Project link", hint: "Where the live product runs", placeholder: "https://", inputMode: "url", link: true },
  {
    key: "projectInfo",
    label: "Project information",
    hint: "What the product does and the problem it solves",
    placeholder: "Who it's for, what it does, and why it matters.",
    multiline: true,
  },
  // Only asked here once the Google Form takes a video link instead of a file upload.
  ...(SILENT_SUBMIT_READY
    ? [{
        key: "videoLink" as const,
        label: "Demo video",
        hint: "A short video link: YouTube (unlisted), Loom or Google Drive",
        placeholder: "https://",
        inputMode: "url" as const,
        link: true,
      }]
    : []),
];

const ALL_FIELDS = [...ABOUT_YOU, ...YOUR_BUILD];
const EMPTY: Values = { name: "", email: "", projectName: "", projectId: "", projectInfo: "", projectLink: "", videoLink: "" };

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

function validate(v: Values): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  for (const f of ALL_FIELDS) {
    const val = v[f.key].trim();
    if (!val) errors[f.key] = `Add your ${f.label[0].toLowerCase()}${f.label.slice(1)}`;
    else if (f.key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) errors[f.key] = "That email doesn't look right";
    else if (f.link && !isLink(val)) errors[f.key] = "Use a full link, like https://myapp.com";
  }
  return errors;
}

function clean(v: Values): Values {
  const out = { ...v };
  (Object.keys(out) as Field[]).forEach((k) => (out[k] = out[k].trim()));
  out.email = out.email.toLowerCase();
  out.projectLink = withProtocol(out.projectLink);
  if (out.videoLink) out.videoLink = withProtocol(out.videoLink);
  return out;
}

/** Every field mapped to its Google Form entry ID (skips fields without one). */
function entryParams(v: Values) {
  const params = new URLSearchParams();
  (Object.keys(HACKATHON_FORM.entries) as Field[]).forEach((k) => {
    const id = HACKATHON_FORM.entries[k];
    if (id && v[k]) params.append(id, v[k]);
  });
  return params;
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
      {f.hint && <p id={`${id}-hint`} className="text-xs text-fbc-muted mt-0.5">{f.hint}</p>}
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

function GroupTitle({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <legend className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fbc-blue mb-5">
      <span>{n}</span>
      <span>{children}</span>
    </legend>
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
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "handoff" | "done">("idle");
  const [handoffUrl, setHandoffUrl] = useState(GOOGLE_FORM_VIEW_URL);
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

  const closed = hackathonPhase(now) !== "open";
  const errors = validate(values);
  const showError = (k: Field) => (attempted || touched[k] ? errors[k] : undefined);
  const sending = status === "sending";

  const set = (k: Field) => (v: string) => setValues((s) => ({ ...s, [k]: v }));
  const touch = (k: Field) => () => setTouched((t) => ({ ...t, [k]: true }));

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
    if (SILENT_SUBMIT_READY) {
      setStatus("sending");
      try {
        // no-cors: the request reaches Google Forms even though the response can't be read
        await fetch(GOOGLE_FORM_POST_URL, { method: "POST", mode: "no-cors", body: entryParams(entry) });
      } catch {
        // Opaque/no-cors errors are expected; the submission still goes through.
      }
      setStatus("done");
    } else {
      // Video files can only be attached on Google Forms itself: open it prefilled.
      const url = `${GOOGLE_FORM_VIEW_URL}?usp=pp_url&${entryParams(entry).toString()}`;
      setHandoffUrl(url);
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("handoff");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const view = closed ? "closed" : status === "sending" ? "idle" : status;

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
                One entry per builder. Closes Fri, Oct 30 · 11:59pm WAT.
              </p>

              <div className="relative">
                <div className="absolute -inset-8 rounded-[48px] bg-gradient-to-br from-fbc-blue/25 via-fbc-sky/10 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />
                <Card>
                  <form ref={formRef} onSubmit={submit} noValidate className="relative space-y-10">
                    <fieldset>
                      <GroupTitle n="01">About you</GroupTitle>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {ABOUT_YOU.map((f) => (
                          <FormField key={f.key} f={f} value={values[f.key]} error={showError(f.key)} disabled={sending}
                            onChange={set(f.key)} onBlur={touch(f.key)} />
                        ))}
                      </div>
                    </fieldset>

                    <fieldset>
                      <GroupTitle n="02">Your build</GroupTitle>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {YOUR_BUILD.map((f) => (
                          <FormField key={f.key} f={f} value={values[f.key]} error={showError(f.key)} disabled={sending}
                            onChange={set(f.key)} onBlur={touch(f.key)} />
                        ))}
                      </div>
                    </fieldset>

                    {!SILENT_SUBMIT_READY && (
                      <fieldset>
                        <GroupTitle n="03">Demo video</GroupTitle>
                        <div className="flex gap-4 rounded-xl border border-dashed border-fbc-border bg-fbc-navy/30 p-4">
                          <Film size={20} className="text-fbc-blue flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-fbc-white">You&apos;ll attach it on the next step</p>
                            <p className="text-xs text-fbc-muted mt-1 leading-relaxed">
                              We open Google Forms with your details filled in. Sign in, add a short video of your product and press Submit.
                            </p>
                          </div>
                        </div>
                      </fieldset>
                    )}

                    {/* honeypot */}
                    <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                      <label htmlFor="hk-company">Company</label>
                      <input id="hk-company" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                    </div>

                    <div className="flex flex-col items-center gap-3 pt-2">
                      <button type="submit" disabled={sending} className={`${btnPrimary} disabled:opacity-70`}>
                        {sending ? (
                          <><Loader2 size={17} className="animate-spin" /> Submitting</>
                        ) : SILENT_SUBMIT_READY ? (
                          <>Submit entry <ArrowRight size={17} /></>
                        ) : (
                          <>Continue to video upload <ArrowUpRight size={17} /></>
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

          {view === "handoff" && (
            <motion.div key="handoff" {...fade}>
              <Card>
                <div className="text-center">
                  <StateIcon><Film size={24} /></StateIcon>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fbc-blue mt-6">One last step</p>
                  <h1 className="font-gigasans font-bold text-3xl sm:text-4xl text-fbc-white mt-2 mb-3">Attach your demo video</h1>
                  <p className="text-fbc-muted text-sm sm:text-base max-w-md mx-auto">
                    Your entry opened in a new tab with your details filled in. Sign in with Google, add your video and press Submit there.
                  </p>
                </div>

                <ol className="mt-8 space-y-3 max-w-sm mx-auto">
                  {[
                    { label: "Details filled in", state: "done" },
                    { label: "Attach a short video of your product", state: "live" },
                    { label: "Press Submit on Google Forms", state: "next" },
                  ].map((s) => (
                    <li key={s.label} className="flex items-center gap-3 text-sm">
                      {s.state === "done" ? (
                        <span className="flex w-6 h-6 items-center justify-center rounded-full bg-fbc-blue text-white"><Check size={13} strokeWidth={3} /></span>
                      ) : s.state === "live" ? (
                        <span className="relative flex w-6 h-6 items-center justify-center rounded-full border-2 border-fbc-blue">
                          <span className="w-2 h-2 rounded-full bg-fbc-blue" />
                        </span>
                      ) : (
                        <span className="w-6 h-6 rounded-full border border-fbc-border" />
                      )}
                      <span className={s.state === "next" ? "text-fbc-muted" : "text-fbc-white"}>{s.label}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-9 flex flex-col items-center gap-4">
                  <a href={handoffUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                    Open the form again <ArrowUpRight size={17} />
                  </a>
                  <button type="button" onClick={() => setStatus("idle")} className={linkQuiet}>
                    <Pencil size={13} /> Edit my details
                  </button>
                </div>
              </Card>
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
