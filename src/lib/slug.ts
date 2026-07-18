/**
 * Turn a display name into a URL/filename-safe slug.
 * "Odinachi David"        -> "odinachi-david"
 * "Daniel Modupe Asaboro" -> "daniel-modupe-asaboro"
 * "Zapp!"                 -> "zapp"
 * Used so an uploaded image named `<slug>.jpg` in /public auto-matches its person.
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD") // decompose accents; combining marks are dropped by the next line
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
