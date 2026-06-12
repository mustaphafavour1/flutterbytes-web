"use client";
import AfricanPattern from "./AfricanPattern";
import AnimateOnScroll from "./AnimateOnScroll";

const stats = [
  { value: "35", label: "Speakers" },
  { value: "600+", label: "Flutter Devs" },
  { value: "32", label: "Sessions" },
  { value: "2", label: "Days" },
];

export default function EventInfo() {
  return (
    <section id="event-info" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left — Date card */}
          <AnimateOnScroll delay={0}>
            <div
              className="relative rounded-3xl overflow-hidden p-8 min-h-[260px] flex flex-col justify-between"
              style={{
                background: "linear-gradient(135deg, #1167B1 0%, #2A9DF4 60%, #187BCD 100%)",
              }}
            >
              <AfricanPattern color="#ffffff" opacity={0.08} />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 uppercase tracking-widest mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  A 2-day Event
                </span>
                <h2 className="font-gigasans font-bold text-2xl md:text-3xl text-white leading-snug mb-4">
                  Friday and Saturday,
                  <br />
                  October 30th &amp; 31st, 2026
                </h2>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-semibold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  9:00 AM both days
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right — Stats + Map stacked */}
          <div className="flex flex-col gap-6">
            {/* Stats */}
            <AnimateOnScroll delay={0.1}>
              <div className="glass-card p-6">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center p-3 rounded-2xl bg-fbc-100/40">
                      <div className="font-gigasans font-black text-4xl text-fbc-200 leading-none">
                        {s.value}
                      </div>
                      <div className="text-fbc-500/70 text-sm font-medium mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Map */}
            <AnimateOnScroll delay={0.15}>
              <div className="glass-card p-6 flex items-center gap-4 flex-1">
                {/* Map placeholder */}
                <div
                  className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #D0EFFF 0%, #2A9DF4 100%)",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1167B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="font-gigasans font-semibold text-fbc-500 text-lg leading-tight">
                    The Zone (Zone Tech Park)
                  </div>
                  <div className="text-fbc-500/60 text-sm mt-1">Gbagada, Lagos, Nigeria</div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fbc-200 text-xs font-semibold mt-1.5 inline-flex items-center gap-1 hover:text-fbc-300 transition-colors"
                  >
                    View on map
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Bottom full-width CTA */}
        <AnimateOnScroll delay={0.2}>
          <div className="relative glass-card overflow-hidden px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <AfricanPattern color="#2A9DF4" opacity={0.04} />
            <div className="relative z-10">
              <p className="font-gigasans font-bold text-2xl md:text-3xl text-fbc-500">
                Don&apos;t miss out on all the fun!
              </p>
              <p className="text-fbc-500/60 mt-1 text-sm">
                Join 600+ Flutter developers for two unforgettable days.
              </p>
            </div>
            <div className="relative z-10">
              <a href="#tickets" className="pill-btn-primary whitespace-nowrap">
                Pick Up a Ticket
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
