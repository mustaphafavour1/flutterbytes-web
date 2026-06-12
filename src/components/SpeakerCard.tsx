"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { AtSign } from "lucide-react";
import type { Speaker } from "@/data/fallback-speakers";

interface Props {
  speaker: Speaker;
  onClick?: () => void;
  index?: number;
}

export default function SpeakerCard({ speaker, onClick, index = 0 }: Props) {
  const initials = speaker.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onClick={onClick}
      className={`flex flex-col items-center text-center group ${onClick ? "cursor-pointer" : ""}`}
    >
      {/* Oval portrait */}
      <div
        className="relative mb-4 overflow-hidden rounded-[40%] border-2 border-fbc-border group-hover:border-fbc-sky transition-all duration-300"
        style={{ width: 128, height: 160 }}
      >
        {speaker.photo && !speaker.photo.includes("ui-avatars") ? (
          <Image
            src={speaker.photo}
            alt={speaker.name}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="w-full h-full bg-fbc-card flex items-center justify-center">
            <span className="font-space font-bold text-2xl text-fbc-sky/70">{initials}</span>
          </div>
        )}
        {/* Hover glow */}
        <div className="absolute inset-0 bg-fbc-blue/0 group-hover:bg-fbc-blue/10 transition-all duration-300" />
      </div>

      <h3 className="font-space font-semibold text-fbc-light-text dark:text-fbc-white text-sm leading-tight mb-1">
        {speaker.name}
      </h3>
      <p className="text-fbc-light-sub dark:text-fbc-muted text-xs">{speaker.role}</p>
      <p className="text-fbc-blue text-xs font-medium mt-0.5">{speaker.company}</p>
      {speaker.twitter && (
        <span className="flex items-center gap-1 text-fbc-sky/60 text-[11px] mt-1">
          <AtSign size={10} />
          {speaker.twitter.replace("@", "")}
        </span>
      )}
      {speaker.tags && speaker.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2 justify-center">
          {speaker.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[9px] font-medium rounded-full px-2 py-0.5 bg-fbc-blue/10 text-fbc-sky border border-fbc-border"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
