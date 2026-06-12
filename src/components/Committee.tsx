"use client";
import { motion } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";

const members = [
  {
    name: "Jamiu Okanlawon",
    role: "Convener",
    gradient: "from-fbc-200 to-fbc-300",
  },
  {
    name: "David Adegoke",
    role: "Co-Convener / Organizing Committee Lead",
    gradient: "from-fbc-300 to-fbc-400",
  },
  {
    name: "Mariam Hamzat BusyBee",
    role: "Co-Convener / PowerHouse",
    gradient: "from-fbc-100 to-fbc-200",
  },
];

function MemberCard({ member, index }: { member: typeof members[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center glass-card p-6"
    >
      {/* Oval portrait */}
      <div
        className={`mb-4 rounded-[50%] bg-gradient-to-b ${member.gradient} p-0.5 flex items-center justify-center`}
        style={{ width: 120, height: 140 }}
      >
        <div
          className="w-full h-full bg-gradient-to-br from-fbc-100 to-fbc-200 flex items-center justify-center"
          style={{ borderRadius: "50% / 50%" }}
        >
          <span className="font-gigasans font-bold text-2xl text-white/80">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </span>
        </div>
      </div>
      <h3 className="font-gigasans font-semibold text-fbc-500 text-base leading-tight mb-1">
        {member.name}
      </h3>
      <p className="text-fbc-500/60 text-sm leading-snug">{member.role}</p>
    </motion.div>
  );
}

function OthersCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center glass-card p-6"
    >
      {/* Grid of mini avatars */}
      <div
        className="mb-4 flex flex-col items-center justify-center"
        style={{ width: 120, height: 140 }}
      >
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-gradient-to-br from-fbc-100 to-fbc-200 border border-fbc-200/40"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <h3 className="font-gigasans font-semibold text-fbc-500 text-base leading-tight mb-1">
        +13 other committee members
      </h3>
      <p className="text-fbc-500/60 text-sm leading-snug">Across 10 teams</p>
    </motion.div>
  );
}

export default function Committee() {
  return (
    <section id="committee" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="mb-12">
            <h2 className="section-title mb-2">Meet the Organizing Committee</h2>
            <p className="text-fbc-500/60 text-base">
              The passionate people who make FlutterBytes possible.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {members.map((m, i) => (
            <MemberCard key={m.name} member={m} index={i} />
          ))}
          <OthersCard />
        </div>

        <AnimateOnScroll delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="pill-btn-outline">
              Apply to volunteer →
            </a>
            <a href="#" className="pill-btn-primary">
              See full committee →
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
