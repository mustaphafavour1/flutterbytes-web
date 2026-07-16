import fs from "fs";
import path from "path";

const IMG_RE = /^(?:(\d+)-)?(.+)\.(png|jpe?g|webp|avif|gif)$/i;

/**
 * Curated gallery highlights — any images placed in /public/gallery/.
 * Optional "N-" filename prefix controls order (lower first); the rest sort
 * alphabetically after. Returns web paths like "/gallery/1-opening.jpg".
 */
export function getGalleryImages(): string[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", "gallery"));
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
    .map((x) => `/gallery/${x.file}`);
}
