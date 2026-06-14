import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Apply to Speak — FlutterBytes Conference 2026",
  description: "Apply to speak at FlutterBytes Conference 2026. Applications opening soon.",
};

export default function ApplyToSpeakPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-fbc-navy pt-16">
        {/* Hero */}
        <div
          className="relative py-24 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #050E1F 0%, #0A1628 100%)",
            backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-fbc-sky/10 blur-[80px] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="font-space font-bold text-4xl md:text-6xl text-fbc-white mb-6 leading-tight">
              Apply to Speak
            </h1>
            <p className="text-fbc-muted text-lg md:text-xl leading-relaxed max-w-2xl">
              Share your expertise with Africa&apos;s premier Flutter community.
            </p>
          </div>
        </div>

        {/* Coming soon content */}
        <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
          <div className="text-6xl mb-6">🎙️</div>
          <h2 className="font-space font-bold text-3xl md:text-4xl text-fbc-white mb-4">
            Applications Opening Soon
          </h2>
          <p className="text-fbc-muted text-lg leading-relaxed max-w-md">
            We&apos;re preparing the speaker application for FlutterBytes 2026. Check back soon.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
