"use client";
import { MapPin } from "lucide-react";
import { Suspense } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import CountdownTimer from "@/components/CountdownTimer";

function AfricanWave({ className }: { className?: string }) {
  return (
    <svg
      className={`absolute right-0 top-0 h-full w-1/2 ${className}`}
      viewBox="0 0 200 300"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="wave-pat" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="#38BDF8" strokeWidth="1" />
          <polygon points="20,12 28,20 20,28 12,20" fill="#38BDF8" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wave-pat)" opacity="0.12" />
    </svg>
  );
}

export default function EventSnapshot() {
  return (
    <section
      id="event-info"
      className="relative py-24 bg-fbc-dark dark:bg-fbc-dark overflow-hidden"
    >
      {/* Light VS Code grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Card 1 — Date & Venue (large) */}
          <AnimateOnScroll delay={0}>
            <div className="relative rounded-3xl overflow-hidden bg-fbc-card border border-fbc-border p-8 min-h-[260px] flex flex-col justify-between">
              <AfricanWave />
              <div className="relative z-10">
                <span className="inline-block font-mono text-xs uppercase tracking-widest text-fbc-sky/70 mb-4 border border-fbc-border rounded-full px-3 py-1">
                  A 2-Day Event
                </span>
                <h2 className="font-space font-bold text-2xl md:text-3xl text-fbc-white leading-snug mb-3">
                  Friday &amp; Saturday
                </h2>
                <p className="text-fbc-sky text-xl font-semibold mb-4">
                  October 30th &amp; 31st, 2026
                </p>
                <span className="inline-flex items-center gap-2 bg-fbc-blue/20 border border-fbc-blue/30 rounded-full px-4 py-2 text-fbc-white text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-fbc-sky" />
                  9:00 AM on both days
                </span>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Card 2 — Stats */}
            <AnimateOnScroll delay={0.1}>
              <div className="rounded-3xl bg-fbc-card border border-fbc-border p-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: "35", l: "Speakers" },
                    { n: "600+", l: "Flutter Devs" },
                    { n: "32", l: "Sessions" },
                    { n: "02", l: "Days" },
                  ].map((s) => (
                    <div key={s.l} className="text-center p-3 rounded-2xl bg-fbc-dark/60">
                      <div className="font-space font-bold text-4xl text-fbc-sky">{s.n}</div>
                      <div className="text-fbc-muted text-sm mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Card 3 — Location */}
            <AnimateOnScroll delay={0.15}>
              <div className="rounded-3xl bg-fbc-card border border-fbc-border p-6 flex items-center gap-5 flex-1">
                {/* Map placeholder */}
                <div
                  className="w-16 h-16 flex-shrink-0 rounded-2xl flex items-center justify-center relative overflow-hidden"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.2) 1px, transparent 1px)",
                    backgroundSize: "8px 8px",
                    backgroundColor: "#0A1628",
                    border: "1px solid #1E3A5F",
                  }}
                >
                  <MapPin size={24} className="text-fbc-sky" />
                </div>
                <div>
                  <p className="font-space font-semibold text-fbc-white text-base leading-tight">
                    The Zone (Zone Tech Park)
                  </p>
                  <p className="text-fbc-muted text-sm mt-1">Gbagada, Lagos, Nigeria</p>
                  <a
                    href="https://maps.google.com/?q=Zone+Tech+Park+Gbagada+Lagos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fbc-sky text-xs font-semibold mt-1.5 inline-flex items-center gap-1 hover:text-fbc-glow transition-colors"
                  >
                    View on map →
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Full-width bottom bar */}
        <AnimateOnScroll delay={0.2}>
          <div className="rounded-3xl bg-fbc-card border border-fbc-border px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-space font-bold text-xl text-fbc-white">
                Don&apos;t miss out on all the fun!
              </p>
              <p className="text-fbc-muted text-sm mt-0.5">
                Join 600+ Flutter developers for two unforgettable days.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Suspense fallback={<div className="w-36 h-10" />}>
                <CountdownTimer />
              </Suspense>
              <a
                href="#tickets"
                className="whitespace-nowrap rounded-full px-6 py-3 font-space font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                Pick Up a Ticket →
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
