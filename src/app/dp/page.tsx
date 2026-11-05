import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DpContent from "./DpContent";

export const metadata = {
  title: "Get your DP | FlutterBytes Conference 2026",
  description:
    "Make your \"I'm attending FlutterBytes 2026\" DP: drop your photo into the official frame, or let AI turn a selfie into a hologram-style portrait. November 6–7, Lagos.",
};

export default function DpPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <DpContent />
      </main>
      <Footer />
    </>
  );
}
