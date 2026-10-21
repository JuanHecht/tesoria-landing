import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Nunito_Sans, Outfit } from "next/font/google";
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

const nunito = Nunito_Sans({ variable: "--font-nunito", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tesoria.ai"),
  title: "Tesoria",
  description:
    "Tesoria cobra, paga y concilia por ti. Con eso te dice cuánto vas a tener cada semana, trece semanas antes.",
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
      "Cobranza, pagos y flujo de efectivo a 13 semanas, encima de tu ERP.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${outfit.variable} ${nunito.variable} ${jetbrains.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
