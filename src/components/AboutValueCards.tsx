"use client";
import { motion } from "framer-motion";
import { Users, BrainCircuit, TrendingUp, Heart } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const values = [
  { Icon: Users, title: "Connection", desc: "Bringing Flutter developers across Africa together under one roof, edition after edition." },
  { Icon: BrainCircuit, title: "Innovation", desc: "Showcasing cutting-edge Flutter and AI developments that push the boundaries of mobile." },
  { Icon: TrendingUp, title: "Growth", desc: "Accelerating the careers and technical skills of mobile engineers at every stage." },
  { Icon: Heart, title: "Community", desc: "Fostering an inclusive, welcoming ecosystem for all developers, beginners and veterans alike." },
];

export default function AboutValueCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {values.map(({ Icon, title, desc }, i) => (
        <AnimateOnScroll key={title} delay={i * 0.1}>
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(42,157,244,0.15)" }}
            className="rounded-2xl bg-fbc-card border border-fbc-border p-6 flex gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-fbc-blue/20 flex items-center justify-center flex-shrink-0">
              <Icon size={20} className="text-fbc-sky" />
            </div>
            <div>
              <h3 className="font-space font-semibold text-fbc-white mb-1">{title}</h3>
              <p className="text-fbc-muted text-sm leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
