"use client";

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@flutterbytes.ng",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const linkCols = [
  {
    links: [
      { label: "Apply to speak", href: "#" },
      { label: "Apply to volunteer", href: "#" },
      { label: "FlutterBytes Hackathon", href: "#" },
    ],
  },
  {
    links: [
      { label: "Event Agenda", href: "#agenda" },
      { label: "Gallery & Testimonials", href: "#gallery" },
      { label: "Speakers", href: "#speakers" },
      { label: "Organizing Committee", href: "#committee" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-fbc-500 border-t border-fbc-400/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Left — logo + social */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                <rect width="34" height="34" rx="8" fill="#2A9DF4" />
                <line x1="11" y1="6" x2="11" y2="28" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="23" y1="6" x2="23" y2="28" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="6" y1="12" x2="28" y2="12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="6" y1="22" x2="28" y2="22" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <div className="font-gigasans font-bold text-base leading-tight text-white">
                <span className="text-fbc-200">Flutter</span>Bytes
                <div className="text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase -mt-0.5">
                  Conference
                </div>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-5 leading-relaxed max-w-xs">
              Africa&apos;s premier Flutter developer conference.
              Building the future, one Flutter app at a time.
            </p>
            {/* Social icons */}
            <div className="flex gap-2" role="list" aria-label="Social media links">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  role="listitem"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-fbc-200 hover:bg-fbc-200/10 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — link columns */}
          {linkCols.map((col, ci) => (
            <div key={ci}>
              <ul className="space-y-3" role="list">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            ©2026 Copyrights FlutterBytes
          </p>
          <p className="text-white/30 text-xs">
            The Zone, Gbagada, Lagos, Nigeria · Oct 30–31, 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
