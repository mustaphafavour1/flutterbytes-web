"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Be a sponsor", href: "#sponsors" },
  { label: "Event Agenda", href: "/agenda" },
  { label: "Speakers", href: "/speakers" },
  { label: "About us", href: "/about" },
];

function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const src = !mounted || resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png";
  return (
    <a href="/" className="flex items-center" aria-label="FlutterBytes Conference Home">
      <Image src={src} alt="FlutterBytes Conference" width={120} height={32} className="h-8 w-auto" priority />
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm ${
          scrolled ? "border-b border-fbc-border/20" : ""
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14">
            {/* Logo — flex-1 left */}
            <div className="flex-1 flex items-center">
              <Logo />
            </div>

            {/* Center pill nav — desktop only, truly centered */}
            <div className="hidden lg:flex items-center bg-fbc-card/60 backdrop-blur border border-fbc-border rounded-full px-2 py-1 gap-0.5">
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

            {/* Right side — flex-1 right */}
            <div className="flex-1 flex items-center justify-end gap-3">
              {/* Desktop: Get Tickets then ThemeToggle */}
              <a
                href="#tickets"
                className="hidden lg:inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(96,165,250,0.6)]"
              >
                Get Tickets
              </a>
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
              {/* Mobile hamburger */}
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-fbc-border/40 text-fbc-muted hover:text-fbc-white transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
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
                  className="text-xl font-space font-semibold text-fbc-white/80 hover:text-fbc-sky py-4 border-b border-fbc-border transition-colors"
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
                <div className="flex justify-center pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
