"use client";
import { motion } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";

const speakers = [
  { name: "Odinachi David", role: "Flutter Developer", company: "Google", gradient: "from-fbc-200 to-fbc-300" },
  { name: "Kudus Rufai", role: "Mobile Engineer", company: "Paystack", gradient: "from-fbc-300 to-fbc-400" },
  { name: "Anuoluwapo Famakinwa", role: "Senior Flutter Dev", company: "Interswitch", gradient: "from-fbc-100 to-fbc-200" },
  { name: "Nikki Eke", role: "Tech Lead", company: "Meta", gradient: "from-fbc-400 to-fbc-500" },
  { name: "Temitayo Adefope", role: "Flutter GDE", company: "Independent", gradient: "from-fbc-200 to-fbc-400" },
  { name: "Chisom Obi", role: "Mobile Architect", company: "Flutterwave", gradient: "from-fbc-100 to-fbc-300" },
  { name: "Adewale Sulaimon", role: "DevRel", company: "Google", gradient: "from-fbc-300 to-fbc-200" },
  { name: "Priscilla Nwosu", role: "Engineering Manager", company: "Kuda", gradient: "from-fbc-400 to-fbc-200" },
];

function SpeakerCard({ speaker, index }: { speaker: typeof speakers[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center group"
    >
      {/* Oval portrait frame */}
      <div
        className="relative mb-4"
        style={{ width: 140, height: 160 }}
      >
        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(ellipse, rgba(42,157,244,0.35) 0%, transparent 70%)",
            filter: "blur(8px)",
            transform: "scale(1.1)",
          }}
          aria-hidden="true"
        />
        {/* Photo frame */}
        <div
          className={`w-full h-full rounded-[50%] bg-gradient-to-b ${speaker.gradient} p-0.5`}
          style={{ borderRadius: "50% / 50%" }}
        >
          <div
            className="w-full h-full bg-gradient-to-br from-fbc-100 to-fbc-200 flex items-center justify-center"
            style={{ borderRadius: "50% / 50%" }}
          >
            {/* Placeholder initials */}
            <span className="font-gigasans font-bold text-2xl text-white/80">
              {speaker.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
        </div>
      </div>
      <h3 className="font-gigasans font-semibold text-fbc-500 text-base leading-tight">
        {speaker.name}
      </h3>
      <p className="text-fbc-500/60 text-sm mt-0.5">{speaker.role}</p>
      <p className="text-fbc-200 text-xs font-medium mt-0.5">{speaker.company}</p>
    </motion.div>
  );
}

export default function Speakers() {
  return (
    <section id="speakers" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="mb-12">
            <h2 className="section-title mb-2">Meet the amazing lineup of Speakers</h2>
            <p className="text-fbc-500/60 text-base">
              World-class Flutter engineers sharing cutting-edge knowledge.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-10">
          {speakers.map((speaker, i) => (
            <SpeakerCard key={speaker.name} speaker={speaker} index={i} />
          ))}
        </div>

        <AnimateOnScroll delay={0.3}>
          <div className="text-center mt-14">
            <a href="#" className="pill-btn-outline">
              See all speakers →
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
