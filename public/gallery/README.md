# Gallery images

The homepage "What happens at FlutterBytes" section and the `/gallery` page show
**one combined image per edition** (full width — no masonry) plus testimonial
images, split into a **Testimonials** tab (default) and a **Photos** tab.

Upload everything into **this** folder (`public/gallery/`). Any image extension
works (`.jpg`, `.png`, `.webp`, …).

## Filenames

Editions (Photos tab) — one combined image per year, desktop + mobile:

| Base filename | Shown |
|---------------|-------|
| `2022-desktop` / `2022-mobile` | 2022 edition |
| `2023-desktop` / `2023-mobile` | 2023 edition |
| `2024-desktop` / `2024-mobile` | 2024 edition |
| `2025-desktop` / `2025-mobile` | 2025 edition |

Testimonials (Testimonials tab) — desktop + mobile per testimonial:

| Base filename | Shown |
|---------------|-------|
| `testimonial1-desktop` / `testimonial1-mobile` | Testimonial 1 |
| `testimonial2-desktop` / `testimonial2-mobile` | Testimonial 2 |
| `testimonial3-desktop` / `testimonial3-mobile` | (optional, up to 8) |

Notes:
- Desktop version shows on tablet/desktop; mobile version on phones.
- If you upload only one of the pair, it's used for both breakpoints.
- Missing years/testimonials are simply skipped.
