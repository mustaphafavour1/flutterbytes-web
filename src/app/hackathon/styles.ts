import type { CSSProperties } from "react";

/** Shared hackathon look: used by the hero snippet and the submission form. */

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-gigasans font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_24px_rgba(42,157,244,0.45)]";

/** Brand blue gradient as a 12px border at 50% opacity (pair with the `grad-ring` class). */
export const GRADIENT_RING = {
  "--ring-w": "12px",
  "--ring-bg": "linear-gradient(135deg, #2563EB 0%, #2A9DF4 35%, #38BDF8 65%, #2563EB 100%)",
  "--ring-opacity": "0.5",
} as CSSProperties;

/** Frosted glass fill at 50%, as a gradient. */
export const GLASS_PANEL: CSSProperties = {
  background: "linear-gradient(160deg, rgb(var(--color-card) / 0.5) 0%, rgb(var(--color-navy) / 0.5) 100%)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
};
