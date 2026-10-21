import type { Metadata } from "next";
import { JetBrains_Mono, Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({ variable: "--font-nunito", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const titulo = "Cómo funciona Tesoria";
const descripcion =
  "¿Cuánto dinero vas a tener en 13 semanas? La respuesta ya está en tu empresa. Así la pone en orden Tesoria: cobranza, pagos y flujo de efectivo.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  openGraph: { title: titulo, description: descripcion, locale: "es_MX", type: "website" },
  twitter: { card: "summary_large_image", title: titulo, description: descripcion },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${nunito.variable} ${jetbrains.variable}`}>{children}</div>;
}
