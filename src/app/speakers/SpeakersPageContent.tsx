"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, AtSign, ExternalLink } from "lucide-react";
import Image from "next/image";
import SpeakerCard from "@/components/SpeakerCard";
import type { Speaker } from "@/data/fallback-speakers";

interface ModalProps {
  speaker: Speaker;
  onClose: () => void;
}

function SpeakerModal({ speaker, onClose }: ModalProps) {
  const initials = speaker.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="bg-fbc-card border border-fbc-border rounded-3xl p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-fbc-border flex items-center justify-center text-fbc-muted hover:text-fbc-white transition-colors"
          aria-label="Close"
        >
          <X size={14} />
        </button>

        <div className="flex items-center gap-5 mb-6">
          <div
            className="rounded-[40%] border-2 border-fbc-border overflow-hidden flex-shrink-0"
            style={{ width: 80, height: 100 }}
          >
            {speaker.photo && !speaker.photo.includes("ui-avatars") ? (
              <Image src={speaker.photo} alt={speaker.name} width={80} height={100} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full bg-fbc-dark flex items-center justify-center">
                <span className="font-space font-bold text-lg text-fbc-sky/70">{initials}</span>
              </div>
            )}
          </div>
          <div>
            <h2 className="font-space font-bold text-fbc-white text-xl">{speaker.name}</h2>
            <p className="text-fbc-muted text-sm">{speaker.role}</p>
            <p className="text-fbc-blue text-sm font-medium">{speaker.company}</p>
            {speaker.twitter && (
              <a
                href={`https://twitter.com/${speaker.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-fbc-sky/70 text-xs mt-1 hover:text-fbc-sky transition-colors"
              >
                <AtSign size={11} />
                {speaker.twitter}
                <ExternalLink size={9} />
              </a>
            )}
          </div>
        </div>

        {speaker.bio && (
          <p className="text-fbc-muted text-sm leading-relaxed mb-4">{speaker.bio}</p>
        )}

        {speaker.tags && speaker.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {speaker.tags.map((t) => (
              <span key={t} className="text-xs rounded-full px-3 py-1 bg-fbc-blue/15 text-fbc-sky border border-fbc-border">
                {t}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function SpeakersPageContent({ speakers }: { speakers: Speaker[] }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Speaker | null>(null);

  const filtered = speakers.filter((s) => {
    return (
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.company.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Search */}
      <div className="flex mb-10">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-fbc-muted" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search speakers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full bg-fbc-card border border-fbc-border text-fbc-white placeholder:text-fbc-muted/50 text-sm focus:outline-none focus:border-fbc-sky transition-colors"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {filtered.map((s, i) => (
          <SpeakerCard key={s.name} speaker={s} index={i} onClick={() => setSelected(s)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-fbc-muted py-20">No speakers match your search.</p>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <SpeakerModal speaker={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
