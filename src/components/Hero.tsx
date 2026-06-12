"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const isTop = position.startsWith("t");
  const isLeft = position.endsWith("l");
  return (
    <div
      className="absolute w-8 h-8 pointer-events-none"
      style={{
        top: isTop ? -2 : "auto",
        bottom: isTop ? "auto" : -2,
        left: isLeft ? -2 : "auto",
        right: isLeft ? "auto" : -2,
        borderTop: isTop ? "2px solid rgba(42,157,244,0.6)" : "none",
        borderBottom: isTop ? "none" : "2px solid rgba(42,157,244,0.6)",
        borderLeft: isLeft ? "2px solid rgba(42,157,244,0.6)" : "none",
        borderRight: isLeft ? "none" : "2px solid rgba(42,157,244,0.6)",
      }}
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();

    const SPACING = 56;
    let cols = Math.ceil(canvas.width / SPACING) + 1;
    let rows = Math.ceil(canvas.height / SPACING) + 1;

    interface Dot {
      bx: number;
      by: number;
      ox: number;
      oy: number;
      phase: number;
      amp: number;
      size: number;
    }

    let dots: Dot[] = [];

    const buildDots = () => {
      cols = Math.ceil(canvas.width / SPACING) + 1;
      rows = Math.ceil(canvas.height / SPACING) + 1;
      dots = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            bx: i * SPACING,
            by: j * SPACING,
            ox: (Math.random() - 0.5) * 8,
            oy: (Math.random() - 0.5) * 8,
            phase: Math.random() * Math.PI * 2,
            amp: 3 + Math.random() * 5,
            size: 0.8 + Math.random() * 1.4,
          });
        }
      }
    };
    buildDots();

    let animId: number;
    let t = 0;

    const animate = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* grid lines */
      ctx.strokeStyle = "rgba(42,157,244,0.07)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * SPACING, 0);
        ctx.lineTo(i * SPACING, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * SPACING);
        ctx.lineTo(canvas.width, j * SPACING);
        ctx.stroke();
      }

      /* animated dots */
      dots.forEach((d) => {
        const x = d.bx + d.ox + Math.sin(t + d.phase) * d.amp;
        const y = d.by + d.oy + Math.cos(t * 0.7 + d.phase) * d.amp;
        const alpha = 0.25 + Math.sin(t + d.phase) * 0.2;
        ctx.beginPath();
        ctx.arc(x, y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(42,157,244,${alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    const ro = new ResizeObserver(() => {
      setSize();
      buildDots();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-fbc-500"
      aria-label="Hero section"
    >
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(42,157,244,0.12) 0%, rgba(3,37,76,0.6) 60%, rgba(3,37,76,0.95) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Hero card */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-6 text-center py-32 pt-36"
      >
        {/* Corner brackets */}
        <div className="relative inline-block px-16 py-12">
          <CornerBracket position="tl" />
          <CornerBracket position="tr" />
          <CornerBracket position="bl" />
          <CornerBracket position="br" />

          {/* Theme badge */}
          <motion.div variants={item} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-fbc-200/50 bg-fbc-200/10 px-5 py-2 text-sm font-medium text-fbc-200 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-fbc-200 animate-pulse" />
              FlutterBytes Conference 2026
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={item}
            className="font-gigasans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] mb-6"
          >
            <span className="block text-fbc-200">Becoming Flutter</span>
            <span className="block text-white">AI Engineer</span>
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            variants={item}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Africa&apos;s premier Flutter conference returns for its 5th edition.
            Two days of AI-powered sessions, workshops, and community.
          </motion.p>

          {/* Date pill */}
          <motion.div variants={item} className="flex justify-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 backdrop-blur-sm px-5 py-2.5 text-white/80 text-sm font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Friday &amp; Saturday, October 30th &amp; 31st, 2026
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div variants={item}>
            <a
              href="#tickets"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 text-lg font-bold text-white shadow-lg shadow-fbc-200/30 hover:shadow-fbc-200/50 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #2A9DF4 0%, #1167B1 100%)",
              }}
            >
              Get Tickets
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          aria-hidden="true"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-5 text-white/30"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
