import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prompt Generator | Der beste Prompt für jedes KI-Tool",
  description: "Wizard-geführte Prompt-Erstellung für ChatGPT, Claude, Midjourney, Perplexity und 10 weitere Tools. Mit tool-spezifischen Optimierungen und Qualitäts-Check.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
