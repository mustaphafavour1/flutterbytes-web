# 2026 speaker photos

Drop each 2026 speaker's picture in **this** folder (`public/speakers_2026/`).

## Naming

- Name the file after the person, lowercase with hyphens: `odinachi-david.jpg`
- **Any image extension works** — `.jpg`, `.png`, `.webp`, etc.
- **Optional ordering prefix:** put `N-` in front to control who shows first on
  the wheel/grid (lower = earlier): `1-jane-doe.jpg`. No prefix needed otherwise.
- Square images look best (~400×400px).

A speaker shows an initials avatar until their photo is added, so you can upload
them gradually.

The speaker list (names, taglines/roles, companies) lives in
`src/data/speakers-2026.ts`. The filename must match the lowercase-hyphenated
version of the name there. While that list is empty, the "2026 Speakers" tab stays
on the coming-soon state.
