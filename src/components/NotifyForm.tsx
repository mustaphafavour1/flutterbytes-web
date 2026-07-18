"use client";
import { useState } from "react";
import { Bell } from "lucide-react";

/**
 * Collects name + email and forwards to the FlutterBytes Google Form via a
 * prefilled link (opens in a new tab so the visitor confirms the submission).
 */
const FORM_BASE =
  "https://docs.google.com/forms/d/e/1FAIpQLScjn2_DB4ZKhtwydxrwwEUbMA95ozipDD8yxRjMyh0WR4HsFg/viewform?usp=pp_url";
const NAME_ENTRY = "entry.442994522";
const EMAIL_ENTRY = "entry.434293815";

export default function NotifyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${FORM_BASE}&${NAME_ENTRY}=${encodeURIComponent(name)}&${EMAIL_ENTRY}=${encodeURIComponent(email)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "flex-1 min-w-0 rounded-full px-5 py-3 bg-fbc-dark border border-fbc-border text-fbc-white placeholder:text-fbc-muted/50 text-sm focus:outline-none focus:border-fbc-blue transition-colors";

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="notify-name" className="sr-only">Your name</label>
        <input
          id="notify-name"
          type="text"
          required
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        className="rounded-full px-6 py-3 font-space font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all inline-flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
      >
        <Bell size={15} /> Get notified →
      </button>
    </form>
  );
}
