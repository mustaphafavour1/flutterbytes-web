import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "fbc-100": "#D0EFFF",
        "fbc-200": "#2A9DF4",
        "fbc-300": "#187BCD",
        "fbc-400": "#1167B1",
        "fbc-500": "#03254C",
      },
      fontFamily: {
        gigasans: ["GigaSans", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "scroll-left": "scrollLeft 40s linear infinite",
        "scroll-right": "scrollRight 40s linear infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 15px rgba(42,157,244,0.3), 0 0 30px rgba(42,157,244,0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 40px rgba(42,157,244,0.7), 0 0 80px rgba(42,157,244,0.3)",
          },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at 50% 50%, rgba(42,157,244,0.15) 0%, rgba(3,37,76,1) 70%)",
        "page-gradient":
          "linear-gradient(135deg, #D0EFFF 0%, #ffffff 60%, rgba(42,157,244,0.06) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
