import { Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SponsorsSection from "@/components/sections/SponsorsSection";

export const metadata = {
  title: "Sponsors — FlutterBytes Conference 2026",
  description: "Partner with Africa's biggest Flutter conference. Sponsorship opportunities for FBC 2026.",
};

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

        {/* Contact CTA */}
        <div className="py-20 pb-24 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <AnimateOnScroll>
            <h2 className="font-space font-bold text-2xl text-fbc-white mb-3">
              Ready to partner with us?
            </h2>
            <p className="text-fbc-muted mb-6">
              Reach out and we&apos;ll put together a custom package for your goals.
            </p>
            <div className="flex justify-center">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact.flutterbytes@gmail.com&su=Sponsorship%20Deck%20Request&body=Hello%20FlutterBytes%20team%2C%20I%27d%20love%20to%20sponsor%20the%20next%20edition."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-6 py-3 font-space font-semibold text-white bg-fbc-blue hover:bg-fbc-glow transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] inline-flex items-center justify-center gap-2"
              >
                <Mail size={16} /> Request sponsorship deck →
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </main>
      <Footer />
    </>
  );
}
