import { Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SponsorsSection from "@/components/sections/SponsorsSection";

export const metadata = {
  title: "Sponsors — FlutterBytes Conference 2026",
  description: "Partner with Africa's biggest Flutter conference. Sponsorship opportunities for FBC 2026.",
};

const tiers = [
  {
    name: "Platinum",
    price: "On request",
    color: "text-amber-400",
    border: "border-amber-400/50",
    perks: ["Keynote slot (30 min)", "Premium booth", "Logo on all materials", "Social shoutouts", "5 complimentary tickets", "Dedicated email blast"],
  },
  {
    name: "Gold",
    price: "On request",
    color: "text-yellow-400",
    border: "border-yellow-400/40",
    perks: ["Talk slot (20 min)", "Standard booth", "Logo on materials", "Social mentions", "3 complimentary tickets"],
  },
  {
    name: "Silver",
    price: "On request",
    color: "text-slate-400",
    border: "border-slate-400/40",
    perks: ["Logo on materials", "Social mention", "2 complimentary tickets", "Branded swag table"],
  },
  {
    name: "Bronze",
    price: "On request",
    color: "text-amber-700",
    border: "border-amber-700/40",
    perks: ["Logo on website", "1 complimentary ticket"],
  },
];

const testimonials = [
  {
    quote: "Sponsoring FlutterBytes gave us direct access to the most talented Flutter engineers in Africa. The quality of developers attending is exceptional.",
    author: "Developer Relations Lead",
    company: "Google",
  },
  {
    quote: "We saw real ROI from our sponsorship — three key hires came from conversations started at FlutterBytes. Highly recommend to any company building with Flutter.",
    author: "CTO",
    company: "Flutterwave",
  },
];

export default function SponsorsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-fbc-navy pt-16">
        {/* Hero */}
        <div
          className="relative py-24 bg-fbc-dark overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="font-space font-bold text-4xl md:text-6xl text-fbc-white mb-4">
              Partner with FlutterBytes
            </h1>
            <p className="text-fbc-muted text-lg max-w-xl">
              Reach 600+ Flutter developers, engineers, and tech leaders at our annual conference in Lagos.
            </p>
          </div>
        </div>

        {/* Current sponsors */}
        <SponsorsSection />

        {/* Tier comparison table */}
        <div className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <h2 className="font-space font-bold text-3xl text-fbc-white mb-8">
              Sponsorship Packages
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <div className="rounded-3xl overflow-hidden border border-fbc-border bg-fbc-card/40 backdrop-blur">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="bg-fbc-blue/20">
                      <th className="text-left px-6 py-4 text-fbc-sky text-sm font-semibold">Benefit</th>
                      {tiers.map((t) => (
                        <th key={t.name} className={`text-center px-4 py-4 text-sm font-semibold ${t.color}`}>
                          {t.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "Speaking slot",
                      "Exhibition booth",
                      "Logo on materials",
                      "Social mentions",
                      "Complimentary tickets",
                      "Email blast",
                      "Branded swag table",
                    ].map((perk, i) => (
                      <tr key={perk} className={`border-t border-fbc-border/50 ${i % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                        <td className="px-6 py-3 text-fbc-muted text-sm">{perk}</td>
                        {tiers.map((t) => (
                          <td key={t.name} className="px-4 py-3 text-center">
                            {t.perks.some((p) => p.toLowerCase().includes(perk.toLowerCase().split(" ")[0])) ? (
                              <span className={`text-lg ${t.color}`}>✓</span>
                            ) : (
                              <span className="text-fbc-muted/30">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="border-t border-fbc-border/50 bg-fbc-dark/40">
                      <td className="px-6 py-3 text-fbc-muted text-sm font-semibold">Investment</td>
                      {tiers.map((t) => (
                        <td key={t.name} className={`px-4 py-3 text-center text-sm font-semibold ${t.color}`}>
                          {t.price}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Testimonials */}
        <div className="py-12 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <h2 className="font-space font-bold text-2xl text-fbc-white mb-8">
              What past sponsors say
            </h2>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="rounded-2xl bg-fbc-card border border-fbc-border p-6">
                  <p className="text-fbc-muted text-sm leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-fbc-white text-sm font-semibold">{t.author}</p>
                  <p className="text-fbc-sky text-xs">{t.company}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="pb-24 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <AnimateOnScroll>
            <h2 className="font-space font-bold text-2xl text-fbc-white mb-3">
              Ready to partner with us?
            </h2>
            <p className="text-fbc-muted mb-6">
              Reach out and we&apos;ll put together a custom package for your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:sponsors@flutterbytes.ng"
                className="rounded-full px-6 py-3 font-space font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] inline-flex items-center justify-center gap-2"
              >
                <Mail size={16} /> Send us a mail →
              </a>
              <a
                href="tel:+2348000000000"
                className="rounded-full px-6 py-3 font-space font-semibold border border-fbc-sky/40 text-fbc-sky hover:bg-fbc-sky/10 transition-all inline-flex items-center justify-center gap-2"
              >
                <Phone size={16} /> Call us
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </main>
      <Footer />
    </>
  );
}
