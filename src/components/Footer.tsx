"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.26 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com/flutterbyteconf", Icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/flutterbytes_c/", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/flutterbytes/posts/?feedView=all", Icon: LinkedinIcon },
];

const linkCols = [
  {
    heading: "Participate",
    links: [
      { label: "Apply to speak", href: "https://sessionize.com/flutterbytes-conference-2026/" },
      { label: "Apply to volunteer", href: "/apply-volunteer" },
      { label: "Product showcase", href: "/product-showcase" },
      { label: "FlutterBytes Hackathon", href: "/hackathon" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Event Agenda", href: "/agenda" },
      { label: "Gallery", href: "/gallery" },
      { label: "Speakers", href: "/speakers" },
      { label: "Organizing Committee", href: "/about#committee" },
    ],
  },
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const linkVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function FooterLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const src = !mounted || resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png";
  return (
    <a href="/" aria-label="FlutterBytes Conference Home">
      <Image src={src} alt="FlutterBytes Conference" width={140} height={36} className="h-9 w-auto" />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-fbc-navy border-t border-fbc-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-10">
          {/* Left — logo + tagline + social */}
          <div className="md:max-w-xs">
            <div className="mb-4">
              <FooterLogo />
            </div>
            <p className="text-fbc-muted text-sm mb-5 leading-relaxed">
              The Largest Community of Flutter Developers in Africa.
            </p>
            <div className="flex gap-2" role="list" aria-label="Social media links">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-fbc-border flex items-center justify-center text-fbc-muted hover:text-fbc-sky hover:border-fbc-sky/40 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — far right */}
          <div className="flex gap-12 md:gap-20">
            {linkCols.map((col) => (
              <div key={col.heading}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-fbc-muted/40 mb-4">
                  {col.heading}
                </p>
                <motion.ul
                  className="space-y-3"
                  role="list"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={listVariants}
                >
                  {col.links.map((l) => {
                    const isExternal = l.href.startsWith("http");
                    return (
                      <motion.li key={l.label} variants={linkVariants}>
                        <a
                          href={l.href}
                          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-fbc-muted hover:text-fbc-white text-sm transition-colors"
                        >
                          {l.label}
                        </a>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-fbc-border/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-fbc-muted/40 text-sm">&copy; 2026 FlutterBytes Conference</p>
          <p className="text-fbc-sky/70 text-xs font-medium">Becoming Flutter AI Engineer</p>
        </div>
      </div>
    </footer>
  );
}
