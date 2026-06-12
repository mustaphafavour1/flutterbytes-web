import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlutterBytes Conference 2026 — Becoming Flutter AI Engineer",
  description:
    "Africa's premier Flutter conference returns for its 5th edition. Two days of AI-powered sessions, workshops, and community. October 30–31, 2026 | Lagos, Nigeria.",
  keywords: ["Flutter", "conference", "Africa", "Lagos", "mobile development", "AI"],
  openGraph: {
    title: "FlutterBytes Conference 2026",
    description: "Africa's premier Flutter conference — Becoming Flutter AI Engineer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased">
        {/* Noise texture overlay for glossy feel */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
