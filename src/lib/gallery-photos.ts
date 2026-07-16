import fs from "fs";
import path from "path";

const IMG_RE = /^(?:(\d+)-)?(.+)\.(png|jpe?g|webp|avif|gif)$/i;

/**
 * List images in a /public/<folder>. Optional "N-" filename prefix controls
 * order (lower first); the rest sort alphabetically after. Returns web paths
 * like "/<folder>/1-opening.jpg". Missing folder -> empty array.
 */
export function listPublicImages(folder: string): string[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", folder));
  } catch {
    return [];
  }
  return files
    .map((f) => {
      const m = f.match(IMG_RE);
      if (!m) return null;
      return { file: f, order: m[1] ? parseInt(m[1], 10) : Number.POSITIVE_INFINITY };
    })
    .filter((x): x is { file: string; order: number } => x !== null)
    .sort((a, b) => a.order - b.order || a.file.localeCompare(b.file))
    .map((x) => `/${folder}/${x.file}`);
}

/** Curated event photos in /public/gallery. */
export const getGalleryImages = () => listPublicImages("gallery");

/** Social-media testimonial screenshots in /public/testimonials. */
export const getTestimonialImages = () => listPublicImages("testimonials");
