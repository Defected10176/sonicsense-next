import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "SonicSense — Environmental Sound Awareness",
  description:
    "Real-time AI-powered sound detection for anyone who can't fully hear their surroundings. Built with ESP32-S3, TinyML, and a 4-mic array.",
  keywords: ["sound awareness", "accessibility", "TinyML", "ESP32", "AI"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
