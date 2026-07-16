import { ExternalLink, Images, PlayCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import GalleryShowcase from "@/components/GalleryShowcase";
import { getGalleryImages, getTestimonialImages } from "@/lib/gallery-photos";

export const revalidate = 60;

export const metadata = {
  title: "Gallery — FlutterBytes Conference",
  description: "Photos and livestreams from every edition of FlutterBytes Conference — 2022 to 2025.",
};

type LinkItem = { label: string; href: string; kind: "photos" | "youtube" };
type Edition = { year: string; note?: string; items: LinkItem[] };

/**
 * Full album links per edition. Add YouTube livestream links here as they come in
 * (kind: "youtube"). Photo albums live on Google Drive / Google Photos.
 */
const EDITIONS: Edition[] = [
  {
    year: "2025",
    items: [
      { label: "Part 1 — Photo album", href: "https://drive.google.com/drive/folders/1zZHEjbKyH3pxV6D87WYFdJxkzakzmDqJ", kind: "photos" },
      { label: "Part 2 — Photo album", href: "https://drive.google.com/drive/folders/17qwsr1d8RqRydXp9fI2aczEKV-NvQ4FL", kind: "photos" },
    ],
  },
  {
    year: "2024",
    items: [
      { label: "Part 1 — Photo album", href: "https://drive.google.com/drive/folders/1onB3VCrRjKdOi4ymzb8_Pdv5i9VDKzQs", kind: "photos" },
      { label: "Part 2 — Photo album", href: "https://drive.google.com/drive/folders/1kowq1qPEwTzY9XxfPYcBlrVXvdjcRCTv", kind: "photos" },
    ],
  },
  {
    year: "2023",
    items: [
      { label: "Photo album", href: "https://drive.google.com/drive/folders/1ZJtcPiSPNKjkc1V7fxbgl7Jmjy3vOYCc", kind: "photos" },
    ],
  },
  {
    year: "2022",
    items: [
      { label: "Photo album", href: "https://photos.google.com/share/AF1QipPh_Hlefl03GloblxUzmlvhXjrE9O_6X33Ldrbc8tbjQrrRS_THOVW2Xa9rUXM1TA?key=T1JIelpJVDlvLUZ5OVpLaTNaRkhfUVFkanZtbkVB", kind: "photos" },
    ],
  },
];

export default function GalleryPage() {
  const photos = getGalleryImages();
  const testimonials = getTestimonialImages();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-fbc-navy pt-16">
        {/* Hero */}
        <div
          className="relative py-20 bg-fbc-dark overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
            <h1 className="font-space font-bold text-4xl md:text-6xl text-fbc-white mb-3 leading-tight">
              The FlutterBytes Gallery
            </h1>
            <p className="text-fbc-muted text-lg max-w-2xl">
              A few highlights below — and the full photo albums and livestreams from
              every edition, all in one place.
            </p>
          </div>
        </div>

        {/* Testimonials + photos, tabbed (testimonials default) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <GalleryShowcase images={photos} testimonials={testimonials} />
        </div>

        {/* Full albums by edition */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 pb-28">
          <AnimateOnScroll>
            <h2 className="font-space font-bold text-2xl text-fbc-white mb-2">Full albums by edition</h2>
            <p className="text-fbc-muted text-sm mb-10 max-w-xl">
              Every photo from each edition lives in these albums. Livestream recordings are
              added here as they become available.
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-5">
            {EDITIONS.map((ed, idx) => (
              <AnimateOnScroll key={ed.year} delay={idx * 0.05}>
                <div className="rounded-3xl border border-fbc-border bg-fbc-card/50 backdrop-blur p-6 h-full">
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="font-space font-bold text-3xl text-fbc-sky">{ed.year}</h3>
                    <span className="text-fbc-muted/50 text-xs uppercase tracking-widest">Edition</span>
                  </div>
                  <ul className="space-y-2.5">
                    {ed.items.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 rounded-xl border border-fbc-border/60 hover:border-fbc-sky/40 bg-fbc-navy/40 hover:bg-fbc-sky/5 px-4 py-3 transition-all"
                        >
                          {item.kind === "youtube" ? (
                            <PlayCircle size={16} className="text-fbc-sky flex-shrink-0" />
                          ) : (
                            <Images size={16} className="text-fbc-sky flex-shrink-0" />
                          )}
                          <span className="text-fbc-white text-sm flex-1">{item.label}</span>
                          <ExternalLink size={14} className="text-fbc-muted group-hover:text-fbc-sky transition-colors flex-shrink-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
