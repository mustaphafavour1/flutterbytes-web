import { redirect } from "next/navigation";

export const metadata = {
  title: "Apply to Speak — FlutterBytes Conference 2026",
  description: "Apply to speak at FlutterBytes Conference 2026 via Sessionize.",
};

export default function ApplyToSpeakPage() {
  // Call for speakers is handled on Sessionize.
  redirect("/");
}
