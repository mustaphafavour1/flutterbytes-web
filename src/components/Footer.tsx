import { AtSign, Share2, Globe, Mail } from "lucide-react";

const socialLinks = [
  { label: "X (Twitter)", href: "https://twitter.com/flutterbytes_ng", Icon: AtSign },
  { label: "LinkedIn", href: "https://linkedin.com/company/flutterbytes", Icon: Share2 },
  { label: "Instagram", href: "https://instagram.com/flutterbytes", Icon: Globe },
  { label: "Email", href: "mailto:hello@flutterbytes.ng", Icon: Mail },
];

const linkCols = [
  [
    { label: "Apply to speak", href: "#" },
    { label: "Apply to volunteer", href: "#" },
    { label: "FlutterBytes Hackathon", href: "/hackathon" },
  ],
  [
    { label: "Event Agenda", href: "/agenda" },
    { label: "Gallery & Testimonials", href: "#gallery" },
    { label: "Speakers", href: "/speakers" },
    { label: "Organizing Committee", href: "/about#committee" },
  ],
];

export default function Footer() {
  return (
    <footer className="bg-fbc-navy border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Left — logo + tagline + social */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="#2563EB" />
                <rect x="9" y="5" width="2" height="22" rx="1" fill="white" />
                <rect x="21" y="5" width="2" height="22" rx="1" fill="white" />
                <rect x="5" y="10" width="22" height="2" rx="1" fill="white" />
                <rect x="5" y="20" width="22" height="2" rx="1" fill="white" />
              </svg>
              <div className="font-space font-bold text-sm leading-tight">
                <span className="text-fbc-sky">Flutter</span>
                <span className="text-fbc-white">Bytes</span>
                <div className="text-[9px] font-medium tracking-[0.25em] text-fbc-muted/60 uppercase">
                  Conference
                </div>
              </div>
            </div>
            <p className="text-fbc-muted text-sm mb-5 leading-relaxed max-w-xs">
              Africa&apos;s premier Flutter developer conference.
              Building the future, one Flutter app at a time.
            </p>
            <div className="flex gap-2" role="list" aria-label="Social media links">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  role="listitem"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-fbc-border flex items-center justify-center text-fbc-muted hover:text-fbc-sky hover:border-fbc-sky/40 transition-all"
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {linkCols.map((col, ci) => (
            <div key={ci}>
              <ul className="space-y-3" role="list">
                {col.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-fbc-muted hover:text-fbc-white text-sm transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-fbc-muted/40 text-sm">&copy;2026 Copyrights FlutterBytes</p>
          <p className="text-fbc-muted/30 text-xs">
            The Zone, Gbagada, Lagos, Nigeria &middot; Oct 30&ndash;31, 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
