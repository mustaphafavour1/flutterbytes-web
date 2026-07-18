import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import GalleryShowcase from "@/components/GalleryShowcase";
import type { ResponsiveImage } from "@/lib/gallery-photos";

export default function GallerySection({ years = [], testimonials = [] }: { years?: ResponsiveImage[]; testimonials?: ResponsiveImage[] }) {
  return (
    <section id="gallery" className="relative py-16 sm:py-24 md:py-32 sec-bg-2 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(42,157,244,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-white mb-2 text-center">
            What happens at FlutterBytes
          </h2>
          <h2 className="font-gigasans font-bold text-3xl md:text-5xl text-fbc-blue mb-3 text-center">
            doesn&apos;t end at FlutterBytes
          </h2>
          <p className="text-fbc-muted text-sm mb-10 text-center max-w-xl mx-auto">
            The impact of each edition always outlasts the event day, and the evidence abounds.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.05}>
          <GalleryShowcase years={years} testimonials={testimonials} />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="rounded-full px-7 py-3 font-gigasans font-semibold text-sm border border-fbc-sky/30 text-fbc-blue hover:bg-fbc-sky/10 transition-all inline-flex items-center gap-2"
            >
              See full gallery →
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
