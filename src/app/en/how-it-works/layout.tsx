import type { Metadata } from "next";
import { JetBrains_Mono, Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({ variable: "--font-nunito", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const titulo = "How Tesoria works";
const descripcion =
  "How much cash will you have in 13 weeks? The answer is already in your company. Here's how Tesoria puts it in order: collections, payments and cash flow.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: {
    canonical: "/en/how-it-works",
    languages: { "es-MX": "/como-funciona", en: "/en/how-it-works", "x-default": "/como-funciona" },
  },
  openGraph: { title: titulo, description: descripcion, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: titulo, description: descripcion },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${nunito.variable} ${jetbrains.variable}`}>{children}</div>;
}
