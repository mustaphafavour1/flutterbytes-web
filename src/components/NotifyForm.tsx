"use client";
import { useState } from "react";
import { Bell, Check } from "lucide-react";

/**
 * Collects name + email and submits silently to the FlutterBytes Google Form in
 * the background (fetch no-cors) — the visitor never leaves the site or sees the
 * form. `category` is attached automatically to record which page it came from.
 */
const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScjn2_DB4ZKhtwydxrwwEUbMA95ozipDD8yxRjMyh0WR4HsFg/formResponse";
const NAME_ENTRY = "entry.442994522";
const EMAIL_ENTRY = "entry.434293815";
const CATEGORY_ENTRY = "entry.597695322";

export default function NotifyForm({ category }: { category: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const body = new URLSearchParams();
    body.append(NAME_ENTRY, name);
    body.append(EMAIL_ENTRY, email);
    body.append(CATEGORY_ENTRY, category);
    try {
      // no-cors: the request reaches Google Forms even though we can't read the response
      await fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body });
    } catch {
      // Opaque/no-cors errors are expected; the submission still goes through.
    }
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-2 py-2 text-center">
        <div className="w-10 h-10 rounded-full bg-fbc-blue/20 border border-fbc-border flex items-center justify-center">
          <Check size={18} className="text-fbc-blue" />
        </div>
        <p className="text-fbc-white font-space font-semibold text-sm">You&apos;re on the list!</p>
        <p className="text-fbc-muted text-xs">We&apos;ll email you as soon as details drop.</p>
      </div>
    );
  }

  const inputClass =
    "flex-1 min-w-0 rounded-full px-5 py-3 bg-fbc-dark border border-fbc-border text-fbc-white placeholder:text-fbc-muted/50 text-sm focus:outline-none focus:border-fbc-blue transition-colors disabled:opacity-60";

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="notify-name" className="sr-only">Your name</label>
        <input
          id="notify-name"
          type="text"
          required
          disabled={status === "sending"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClass}
        />
        <label htmlFor="notify-email" className="sr-only">Email address</label>
        <input
          id="notify-email"
          type="email"
          required
          disabled={status === "sending"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="self-center rounded-full px-5 py-2.5 text-sm font-space font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all inline-flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-70"
      >
        <Bell size={15} /> {status === "sending" ? "Submitting…" : "Get notified →"}
      </button>
    </form>
  );
}
