import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'fbc-navy': '#050E1F',
        'fbc-dark': '#0A1628',
        'fbc-card': '#0F1E38',
        'fbc-blue': '#2563EB',
        'fbc-sky': '#38BDF8',
        'fbc-glow': '#60A5FA',
        'fbc-white': '#F8FAFF',
        'fbc-muted': '#94A3B8',
        'fbc-border': '#1E3A5F',
        'fbc-light-bg': '#F0F6FF',
        'fbc-light-card': '#FFFFFF',
        'fbc-light-border': '#CBD5E1',
        'fbc-light-text': '#0F172A',
        'fbc-light-sub': '#475569',
      },
      fontFamily: {
        'space': ['GigaSans', 'var(--font-space)', 'Space Grotesk', 'sans-serif'],
        'gigasans': ['GigaSans', 'sans-serif'],
        'inter': ['GigaSans', 'var(--font-inter)', 'Inter', 'sans-serif'],
        'mono': ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'scroll-left': 'scrollLeft 40s linear infinite',
        'scroll-right': 'scrollRight 40s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'gradient-shift': 'gradientShift 4s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scrollLeft: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        scrollRight: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37,99,235,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(37,99,235,0.6), 0 0 100px rgba(56,189,248,0.2)' },
        },
        cursorBlink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
      },
      backgroundImage: {
        'vscode-grid': 'radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)',
        'vscode-grid-light': 'radial-gradient(circle, rgba(37,99,235,0.07) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-32': '32px 32px',
      },
    },
  },
  plugins: [],
};
export default config;
