import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HackathonContent from "./HackathonContent";

// Re-render regularly so the server-rendered state (open → closed → ended)
// stays in step with the deadline; the client also re-checks live.
export const revalidate = 60;

export const metadata = {
  title: "FlutterBytes × Serverpod Hackathon — FBC 2026",
  description:
    "A one-week solo hackathon by FlutterBytes and Serverpod. Build on Serverpod, deploy to Serverpod Cloud, and win up to $400. Applications close October 30, 11:59pm WAT.",
};

export default function HackathonPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HackathonContent serverNow={Date.now()} />
      </main>
      <Footer />
    </>
  );
}
