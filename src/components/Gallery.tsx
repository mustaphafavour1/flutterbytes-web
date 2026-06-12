"use client";
import AnimateOnScroll from "./AnimateOnScroll";

const rowOne = [
  { type: "tweet", handle: "@devmustapha", quote: "Best Flutter conference in Africa! The sessions were next level 🚀 #FlutterBytes2025" },
  { type: "photo", year: "2025", label: "Opening Keynote" },
  { type: "tweet", handle: "@flutterdev_ng", quote: "The workshops at #FlutterBytes were so hands-on. Already applying what I learned to my app!" },
  { type: "photo", year: "2025", label: "Workshop Hall" },
  { type: "tweet", handle: "@mobileengineer", quote: "Met so many amazing devs at #FlutterBytes2025. The networking is unmatched 🙌" },
  { type: "photo", year: "2024", label: "Community Night" },
  { type: "tweet", handle: "@flutterfan_ke", quote: "Came from Nairobi for FlutterBytes and it was ABSOLUTELY worth it. See you in 2026!" },
  { type: "photo", year: "2025", label: "Speaker Panel" },
  // duplicate for loop
  { type: "tweet", handle: "@devmustapha", quote: "Best Flutter conference in Africa! The sessions were next level 🚀 #FlutterBytes2025" },
  { type: "photo", year: "2025", label: "Opening Keynote" },
  { type: "tweet", handle: "@flutterdev_ng", quote: "The workshops at #FlutterBytes were so hands-on. Already applying what I learned to my app!" },
  { type: "photo", year: "2025", label: "Workshop Hall" },
  { type: "tweet", handle: "@mobileengineer", quote: "Met so many amazing devs at #FlutterBytes2025. The networking is unmatched 🙌" },
  { type: "photo", year: "2024", label: "Community Night" },
  { type: "tweet", handle: "@flutterfan_ke", quote: "Came from Nairobi for FlutterBytes and it was ABSOLUTELY worth it. See you in 2026!" },
  { type: "photo", year: "2025", label: "Speaker Panel" },
];

const rowTwo = [
  { type: "photo", year: "2023", label: "First Keynote" },
  { type: "tweet", handle: "@nikkiflutter", quote: "FlutterBytes 2025 was incredible. The AI sessions opened my mind to what Flutter can do 🤯" },
  { type: "photo", year: "2024", label: "Hackathon Results" },
  { type: "tweet", handle: "@chisom_builds", quote: "Finally met my Flutter Twitter fam IRL at #FlutterBytes. Community >> everything else ❤️" },
  { type: "photo", year: "2023", label: "Networking Lunch" },
  { type: "tweet", handle: "@adewale_dev", quote: "The scale of FBC keeps growing every year. 2026 is going to be legendary 🔥" },
  { type: "photo", year: "2025", label: "Closing Ceremony" },
  { type: "tweet", handle: "@priscilla_ng", quote: "As a first-time speaker at #FlutterBytes, the crowd was amazing. Thank you Lagos!" },
  // duplicate for loop
  { type: "photo", year: "2023", label: "First Keynote" },
  { type: "tweet", handle: "@nikkiflutter", quote: "FlutterBytes 2025 was incredible. The AI sessions opened my mind to what Flutter can do 🤯" },
  { type: "photo", year: "2024", label: "Hackathon Results" },
  { type: "tweet", handle: "@chisom_builds", quote: "Finally met my Flutter Twitter fam IRL at #FlutterBytes. Community >> everything else ❤️" },
  { type: "photo", year: "2023", label: "Networking Lunch" },
  { type: "tweet", handle: "@adewale_dev", quote: "The scale of FBC keeps growing every year. 2026 is going to be legendary 🔥" },
  { type: "photo", year: "2025", label: "Closing Ceremony" },
  { type: "tweet", handle: "@priscilla_ng", quote: "As a first-time speaker at #FlutterBytes, the crowd was amazing. Thank you Lagos!" },
];

const photoGradients = [
  "from-fbc-400 to-fbc-500",
  "from-fbc-300 to-fbc-400",
  "from-fbc-200 to-fbc-300",
  "from-fbc-500 to-fbc-400",
];

function Card({ item, idx }: { item: (typeof rowOne)[0]; idx: number }) {
  if (item.type === "photo") {
    const g = photoGradients[idx % photoGradients.length];
    return (
      <div
        className={`flex-shrink-0 w-52 h-36 rounded-2xl bg-gradient-to-br ${g} relative overflow-hidden flex items-end p-3`}
        aria-label={`Photo from FBC ${item.year} — ${item.label}`}
      >
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        <div className="relative z-10">
          <div className="text-white/60 text-[10px] font-medium">FBC {item.year} 📸</div>
          <div className="text-white font-semibold text-sm leading-tight">{item.label}</div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="flex-shrink-0 w-64 bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-4 shadow-sm"
      aria-label={`Social post from ${item.handle}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fbc-200 to-fbc-400 flex items-center justify-center text-white text-xs font-bold">
          {item.handle?.slice(1, 3).toUpperCase()}
        </div>
        <span className="text-fbc-400 text-xs font-semibold">{item.handle}</span>
        {/* X icon */}
        <svg className="ml-auto text-fbc-500/30" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      </div>
      <p className="text-fbc-500 text-xs leading-relaxed">{item.quote}</p>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-20 overflow-hidden">
      {/* Subtle bg tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-fbc-100/30 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <AnimateOnScroll>
          <h2 className="section-title mb-2">Testimonials and Pictures</h2>
          <p className="text-fbc-500/60 text-base">From Previous Editions</p>
        </AnimateOnScroll>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative overflow-hidden mb-4 group">
        <div
          className="flex gap-4 w-max"
          style={{
            animation: "scrollLeft 40s linear infinite",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState =
              "paused")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState =
              "running")
          }
          aria-hidden="true"
        >
          {rowOne.map((item, i) => (
            <Card key={i} item={item} idx={i} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative overflow-hidden group">
        <div
          className="flex gap-4 w-max"
          style={{
            animation: "scrollRight 45s linear infinite",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState =
              "paused")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState =
              "running")
          }
          aria-hidden="true"
        >
          {rowTwo.map((item, i) => (
            <Card key={i} item={item} idx={i + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
