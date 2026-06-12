"use client";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import GalleryCard from "@/components/GalleryCard";
import { galleryItems } from "@/data/gallery";

export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-24 bg-fbc-dark dark:bg-fbc-dark overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-space font-bold text-3xl md:text-5xl text-fbc-white mb-2">
            What happens at FlutterBytes,
          </h2>
          <h2 className="font-space font-bold text-3xl md:text-5xl text-fbc-white mb-3">
            doesn&apos;t stay at FlutterBytes
          </h2>
          <p className="text-fbc-muted text-base mb-10 max-w-xl">
            Real sessions. Real energy. Real developers going back home to ship things.
          </p>
        </AnimateOnScroll>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {galleryItems.map((item, i) => (
            <GalleryCard key={item.id} item={item} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
