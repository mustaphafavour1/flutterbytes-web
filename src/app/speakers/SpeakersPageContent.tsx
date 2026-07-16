"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeakerWheel from "@/components/SpeakerWheel";
import SpeakerGrid from "@/components/SpeakerGrid";
import type { Speaker } from "@/data/fallback-speakers";

interface Props {
  speakers: Speaker[];
  pastSpeakers: Speaker[];
}

export default function SpeakersPageContent({ speakers, pastSpeakers }: Props) {
  const [tab, setTab] = useState<"2026" | "past">("past");
  const allPast = pastSpeakers.length > 0 ? pastSpeakers : speakers;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Tabs */}
      <div className="flex gap-2 mb-12 justify-center" role="tablist">
        {([["2026", "2026 Speakers"], ["past", "Past Editions"]] as const).map(([val, label]) => (
          <button
            key={val}
            role="tab"
            aria-selected={tab === val}
            onClick={() => setTab(val)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              tab === val
                ? "bg-fbc-blue text-white shadow-[0_0_14px_rgba(42,157,244,0.4)]"
                : "bg-fbc-card border border-fbc-border text-fbc-muted hover:text-fbc-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex items-center justify-center">
        <AnimatePresence mode="wait">
          {tab === "2026" ? (
            <motion.div
              key="2026"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="relative w-full"
            >
              {/* Blurred wheel behind overlay */}
              <div className="pointer-events-none select-none" style={{ filter: "blur(4px)", opacity: 0.3 }}>
                <SpeakerWheel speakers={allPast} />
              </div>
              {/* Coming soon overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-fbc-card/95 backdrop-blur-xl rounded-2xl px-8 py-10 text-center border border-fbc-border max-w-sm shadow-2xl">
                  <div className="text-5xl mb-5">🚀</div>
                  <h3 className="font-gigasans font-bold text-fbc-white text-2xl mb-3">
                    Speakers coming soon
                  </h3>
                  <p className="text-fbc-muted text-sm leading-relaxed mb-6">
                    We&apos;re finalising an incredible lineup of speakers for the 5th edition. Stay tuned.
                  </p>
                  <button
                    onClick={() => setTab("past")}
                    className="rounded-full px-6 py-3 font-gigasans font-semibold text-sm border border-fbc-sky/30 text-fbc-sky hover:bg-fbc-sky/10 transition-all"
                  >
                    See past speakers
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="past"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <SpeakerWheel speakers={allPast} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full grid — see every speaker without spinning */}
      {tab === "past" && allPast.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-fbc-border/60" />
            <p className="text-fbc-muted text-sm whitespace-nowrap">
              All {allPast.length} past speakers
            </p>
            <div className="h-px flex-1 bg-fbc-border/60" />
          </div>
          <SpeakerGrid speakers={allPast} />
        </div>
      )}
    </div>
  );
}
