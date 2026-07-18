import fs from "fs";
import path from "path";

const IMG_RE = /^(.+)\.(png|jpe?g|webp|avif|gif)$/i;

/** Map of every /public/gallery image by its base filename (lowercase, no ext). */
function galleryMap(): Map<string, string> {
  let files: string[] = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", "gallery"));
  } catch {
    return new Map();
  }
  const map = new Map<string, string>();
  for (const f of files) {
    const m = f.match(IMG_RE);
    if (m) map.set(m[1].toLowerCase(), `/gallery/${f}`);
  }
  return map;
}

export type ResponsiveImage = { label: string; desktop?: string; mobile?: string };

const YEARS = ["2022", "2023", "2024", "2025"];

/**
 * One combined image per edition. Upload to /public/gallery as
 * `<year>-desktop.<ext>` and `<year>-mobile.<ext>` (any image extension).
 */
export function getGalleryYears(): ResponsiveImage[] {
  const map = galleryMap();
  return YEARS
    .map((y) => ({ label: y, desktop: map.get(`${y}-desktop`), mobile: map.get(`${y}-mobile`) }))
    .filter((y) => y.desktop || y.mobile);
}

/**
 * Testimonial images. Upload to /public/gallery as
 * `testimonial<N>-desktop.<ext>` and `testimonial<N>-mobile.<ext>`.
 */
export function getTestimonialPairs(): ResponsiveImage[] {
  const map = galleryMap();
  const out: ResponsiveImage[] = [];
  for (let i = 1; i <= 8; i++) {
    const desktop = map.get(`testimonial${i}-desktop`);
    const mobile = map.get(`testimonial${i}-mobile`);
    if (desktop || mobile) out.push({ label: `Testimonial ${i}`, desktop, mobile });
  }
  return out;
}
