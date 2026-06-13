"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Be a sponsor", href: "#sponsors" },
  { label: "Event Agenda", href: "/agenda" },
  { label: "Speakers", href: "/speakers" },
  { label: "5 Editions", href: "#editions" },
  { label: "About us", href: "/about" },
];

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5 group" aria-label="FlutterBytes Conference Home">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#2563EB" />
        <rect x="9" y="5" width="2" height="22" rx="1" fill="white" />
        <rect x="21" y="5" width="2" height="22" rx="1" fill="white" />
        <rect x="5" y="10" width="22" height="2" rx="1" fill="white" />
        <rect x="5" y="20" width="22" height="2" rx="1" fill="white" />
      </svg>
      <div className="font-space font-bold text-sm leading-tight">
        <span className="text-fbc-sky dark:text-fbc-sky">Flutter</span>
        <span className="text-white">Bytes</span>
        <div className="text-[9px] font-medium tracking-[0.25em] text-white/40 uppercase">
          Conference
        </div>
      </div>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-fbc-navy/80 backdrop-blur-xl ${
          scrolled ? "border-b border-white/[0.07] shadow-lg shadow-black/20" : "border-b border-white/[0.04]"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Center pill nav — desktop */}
            <div className="hidden lg:flex items-center bg-fbc-card/60 backdrop-blur border border-white/10 rounded-full px-2 py-1 gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-fbc-muted hover:text-fbc-white hover:bg-fbc-blue/20 transition-all duration-200 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#tickets"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(96,165,250,0.6)]"
              >
                Get Tickets
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-fbc-muted hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-fbc-navy/98 backdrop-blur-xl flex flex-col pt-20 px-6"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="flex flex-col gap-2"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                  className="text-xl font-space font-semibold text-fbc-white/80 hover:text-fbc-sky py-4 border-b border-white/5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-6 flex flex-col gap-3">
                <a
                  href="#tickets"
                  className="rounded-full px-6 py-4 text-center font-semibold text-white bg-fbc-blue shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Tickets
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
