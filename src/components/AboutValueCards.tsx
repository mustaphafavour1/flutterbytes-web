"use client";
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
    <div className="divide-y divide-fbc-border/30">
      {values.map(({ Icon, title, desc }, i) => (
        <AnimateOnScroll key={title} delay={i * 0.08}>
          <div className="flex gap-5 py-6">
            <Icon size={18} className="text-fbc-sky mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-space font-semibold text-fbc-white text-sm mb-1">{title}</h3>
              <p className="text-fbc-muted text-sm leading-relaxed">{desc}</p>
            </div>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
