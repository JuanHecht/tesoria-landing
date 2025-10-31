import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tesoria",
  description:
    "Tesoria es una plataforma de análisis financiero que te ayuda a entender tu negocio.",
  keywords: [
    "Tesoria",
    "Análisis financiero",
    "Negocio",
    "Inteligencia financiera",
  ],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Tesoria",
    description:
      "Tesoria es una plataforma de análisis financiero que te ayuda a entender tu negocio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
