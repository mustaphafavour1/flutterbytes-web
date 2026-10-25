import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplyForm from "./ApplyForm";

// Keep the open/closed state in step with the deadline.
export const revalidate = 60;

export const metadata = {
  title: "Submit your build | FlutterBytes × Serverpod Hackathon 2026",
  description:
    "Submit your FlutterBytes × Serverpod Hackathon entry: your Serverpod Cloud project ID, live link, project description and demo video. Closes October 30, 11:59pm WAT.",
};

export default function HackathonApplyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ApplyForm serverNow={Date.now()} />
      </main>
      <Footer />
    </>
  );
}
