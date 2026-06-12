"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Be a sponsor", href: "#sponsors" },
  { label: "Event Agenda", href: "#agenda" },
  { label: "About us", href: "#about" },
  { label: "5 Editions", href: "#editions" },
];

function FlutterBytesLogo({ size = "md" }: { size?: "sm" | "md" }) {
  const textSize = size === "sm" ? "text-sm" : "text-base";
  return (
    <a href="#" className="flex items-center gap-2 group" aria-label="FlutterBytes Conference Home">
      {/* Grid/hash icon */}
      <svg
        width={size === "sm" ? 28 : 34}
        height={size === "sm" ? 28 : 34}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="34" height="34" rx="8" fill="#2A9DF4" />
        <line x1="11" y1="6" x2="11" y2="28" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="23" y1="6" x2="23" y2="28" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="6" y1="12" x2="28" y2="12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="6" y1="22" x2="28" y2="22" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <div className={`font-gigasans font-bold ${textSize} leading-tight text-white`}>
        <span className="text-fbc-200">Flutter</span>
        <span>Bytes</span>
        <div className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase -mt-0.5">
          Conference
        </div>
      </div>
    </a>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-fbc-500/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5"
            : "bg-fbc-500/80 backdrop-blur-sm"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <FlutterBytesLogo />

            {/* Center pill nav — desktop */}
            <div className="hidden md:flex items-center bg-white/8 border border-white/15 rounded-full px-2 py-1 gap-1">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-pill-link">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right — desktop */}
            <div className="hidden md:flex items-center gap-3">
              <a href="#tickets" className="pill-btn-primary text-sm py-2 px-5">
                Get Tickets
              </a>
              <button
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Toggle dark mode"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              </button>
            </div>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden w-10 h-10 rounded-full border border-white/20 flex flex-col items-center justify-center gap-1.5 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-fbc-500/98 backdrop-blur-md border-b border-white/10 shadow-xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white py-3 px-4 rounded-xl hover:bg-white/10 transition-all font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 mt-2">
                <a href="#tickets" className="pill-btn-primary w-full justify-center">
                  Get Tickets
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
