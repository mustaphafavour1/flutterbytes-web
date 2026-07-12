import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Apply to Volunteer — FlutterBytes Conference 2026",
  description: "Apply to volunteer at FlutterBytes Conference 2026. Applications opening soon.",
};

export default function ApplyToVolunteerPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-fbc-navy pt-16">
        {/* Hero */}
        <div
          className="relative py-24 overflow-hidden bg-fbc-dark"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-fbc-sky/10 blur-[80px] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="font-space font-bold text-4xl md:text-6xl text-fbc-white mb-6 leading-tight">
              Apply to Volunteer
            </h1>
            <p className="text-fbc-muted text-lg md:text-xl leading-relaxed max-w-2xl">
              Be part of the team that makes FlutterBytes happen.
            </p>
          </div>
        </div>

        {/* Coming soon content */}
        <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
          <div className="text-6xl mb-6">🙋</div>
          <h2 className="font-space font-bold text-3xl md:text-4xl text-fbc-white mb-4">
            Volunteer Applications Opening Soon
          </h2>
          <p className="text-fbc-muted text-lg leading-relaxed max-w-md">
            Want to be part of the team that makes FlutterBytes happen? Applications open soon.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
