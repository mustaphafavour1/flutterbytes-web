import { Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotifyForm from "@/components/NotifyForm";

export default function HackathonPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-fbc-navy flex items-center justify-center pt-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-fbc-blue/20 blur-[100px] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-fbc-blue/20 border border-fbc-border flex items-center justify-center">
              <Rocket size={28} className="text-fbc-blue" />
            </div>
          </div>

          <span className="inline-block font-mono text-xs uppercase tracking-widest text-fbc-blue border border-fbc-border rounded-full px-3 py-1 mb-4">
            Coming Soon
          </span>

          <h1 className="font-space font-bold text-4xl md:text-6xl text-fbc-white mb-4 leading-tight">
            FlutterBytes
            <br />
            <span className="text-fbc-blue">Hackathon 2026</span>
          </h1>

          <p className="text-fbc-muted text-lg mb-3 leading-relaxed">
            Build something in Flutter. AI bonus points. More details dropping soon.
          </p>
          <p className="text-fbc-muted/60 text-sm mb-10">
            October 30–31, 2026 · The Zone, Gbagada, Lagos
          </p>

          {/* Get notified */}
          <div className="rounded-2xl bg-fbc-card border border-fbc-border p-6 text-left">
            <p className="text-fbc-white font-space font-semibold mb-4 text-center">
              Get notified when details drop
            </p>
            <NotifyForm category="Hackathon" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
