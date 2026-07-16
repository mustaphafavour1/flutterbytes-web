"use client";
import { useState } from "react";
import Image from "next/image";
import type { Speaker } from "@/data/fallback-speakers";

function SpeakerAvatar({ s }: { s: Speaker }) {
  const [ok, setOk] = useState(true);
  const initials = s.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col items-center text-center gap-2.5 w-32 sm:w-36">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-fbc-border bg-fbc-card">
        {ok && s.photo ? (
          <Image
            src={s.photo}
            alt={s.name}
            fill
            className="object-cover"
            sizes="96px"
            onError={() => setOk(false)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-gigasans font-bold text-fbc-sky/70 text-lg">{initials}</span>
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-fbc-white text-sm font-semibold leading-tight">{s.name}</p>
        {s.role && <p className="text-fbc-muted text-xs mt-0.5 leading-tight">{s.role}</p>}
        {s.company && <p className="text-fbc-blue text-xs leading-tight">{s.company}</p>}
      </div>
    </div>
  );
}

export default function SpeakerGrid({ speakers }: { speakers: Speaker[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
      {speakers.map((s) => (
        <SpeakerAvatar key={s.name} s={s} />
      ))}
    </div>
  );
}
