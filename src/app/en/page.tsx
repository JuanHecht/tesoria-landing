import type { Metadata } from "next";
import { InicioA } from "@/components/inicio/InicioA";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tesoria · See your cash coming",
  description:
    "Tesoria collects, pays and reconciles for you. Then it tells you how much cash you'll have every week, thirteen weeks ahead.",
  alternates: { canonical: "/en", languages: { "es-MX": "/", en: "/en", "x-default": "/" } },
  openGraph: { locale: "en_US", type: "website", title: "Tesoria · See your cash coming" },
};

export default function HomeEn() {
  const hoy = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City" }).format(new Date());
  return <InicioA hoy={hoy} lang="en" />;
}
