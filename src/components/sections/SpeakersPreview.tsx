import Link from "next/link";
import SpeakerCard from "@/components/SpeakerCard";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Speaker } from "@/data/fallback-speakers";

interface Props {
  speakers: Speaker[];
}

export default function SpeakersPreview({ speakers }: Props) {
  const preview = speakers.slice(0, 4);

  return (
    <section id="speakers" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-space font-bold text-3xl md:text-5xl text-fbc-light-text dark:text-fbc-white mb-2">
            People who actually know what they&apos;re talking about
          </h2>
          <p className="text-fbc-light-sub dark:text-fbc-muted text-base mb-12 max-w-xl">
            Hand-picked engineers, founders and Flutter enthusiasts from across Africa and beyond.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          {preview.map((s, i) => (
            <SpeakerCard key={s.name} speaker={s} index={i} />
          ))}
        </div>

        <AnimateOnScroll delay={0.2}>
          <div className="text-center">
            <Link
              href="/speakers"
              className="rounded-full px-8 py-3.5 font-space font-semibold border border-fbc-sky/40 text-fbc-sky hover:bg-fbc-sky/10 transition-all inline-flex items-center gap-2"
            >
              See all speakers →
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
