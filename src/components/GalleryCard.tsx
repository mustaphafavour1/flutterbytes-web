"use client";
import Image from "next/image";
import { Camera, AtSign } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";

const photoBgs = [
  "from-indigo-900 to-blue-800",
  "from-blue-900 to-cyan-800",
  "from-cyan-900 to-teal-800",
  "from-fbc-card to-fbc-blue/40",
  "from-fbc-dark to-fbc-border",
];

interface Props {
  item: GalleryItem;
  idx?: number;
}

export default function GalleryCard({ item, idx = 0 }: Props) {
  const aspectClass =
    item.aspect === "square"
      ? "aspect-square"
      : item.aspect === "tall"
      ? "aspect-[3/4]"
      : "aspect-[4/3]";

  if (item.type === "photo" && item.placeholder) {
    const bg = photoBgs[idx % photoBgs.length];
    return (
      <div
        className={`${aspectClass} w-full rounded-2xl bg-gradient-to-br ${bg} flex flex-col items-center justify-center gap-2 relative overflow-hidden break-inside-avoid mb-4`}
      >
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        <Camera size={28} className="text-fbc-white/30 relative z-10" />
        <span className="text-fbc-white/40 text-xs relative z-10">FBC Photo</span>
      </div>
    );
  }

  if (item.type === "photo" && item.src) {
    return (
      <div className={`${aspectClass} w-full rounded-2xl overflow-hidden relative break-inside-avoid mb-4`}>
        <Image src={item.src} alt="FlutterBytes event photo" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
      </div>
    );
  }

  // Screenshot / testimonial card
  return (
    <div className="w-full rounded-2xl bg-fbc-card border border-fbc-border p-4 break-inside-avoid mb-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fbc-blue to-fbc-sky flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {item.author?.charAt(0) ?? "F"}
        </div>
        <div className="min-w-0">
          <p className="text-fbc-white text-xs font-semibold truncate">{item.author}</p>
          <p className="text-fbc-sky text-[10px] truncate">{item.handle}</p>
        </div>
        <AtSign size={12} className="text-fbc-muted ml-auto flex-shrink-0" />
      </div>
      <p className="text-fbc-muted text-xs leading-relaxed">{item.quote}</p>
    </div>
  );
}
