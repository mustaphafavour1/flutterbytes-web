"use client";
import AnimateOnScroll from "./AnimateOnScroll";

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Connection",
    desc: "Bringing Flutter developers across Africa together under one roof.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
    title: "Innovation",
    desc: "Showcasing cutting-edge Flutter and AI developments.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Growth",
    desc: "Accelerating the careers and skills of mobile engineers.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Community",
    desc: "Fostering an inclusive, welcoming ecosystem for all developers.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="section-title mb-8 text-center">About us</h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div
            className="rounded-3xl p-8 md:p-12"
            style={{ background: "linear-gradient(135deg, #03254C 0%, #1167B1 100%)" }}
          >
            <div className="text-center mb-10">
              {/* Logo */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <svg width="40" height="40" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                  <rect width="34" height="34" rx="8" fill="rgba(42,157,244,0.5)" />
                  <line x1="11" y1="6" x2="11" y2="28" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="23" y1="6" x2="23" y2="28" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="6" y1="12" x2="28" y2="12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="6" y1="22" x2="28" y2="22" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                <span className="font-gigasans font-bold text-xl text-white">
                  <span className="text-fbc-200">Flutter</span>Bytes Conference
                </span>
              </div>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                FlutterBytes is Africa&apos;s premier Flutter developer community and
                conference. We bring together mobile engineers, tech enthusiasts, and
                industry leaders to celebrate, learn, and grow together.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="glass-card-dark rounded-2xl p-5 text-center hover:bg-white/10 transition-colors"
                >
                  <div className="text-fbc-200 mb-3 flex justify-center">{v.icon}</div>
                  <h3 className="font-gigasans font-semibold text-white text-base mb-1">
                    {v.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
