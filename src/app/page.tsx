import type { Metadata } from "next";
import { InicioA } from "@/components/inicio/InicioA";

// Las fechas de ejemplo se recorren solas: se regenera cada hora.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tesoria · Ve venir tu dinero",
  description:
    "Tesoria cobra, paga y concilia por ti. Con eso te dice cuánto vas a tener cada semana, trece semanas antes.",
  alternates: { canonical: "/", languages: { "es-MX": "/", en: "/en", "x-default": "/" } },
  openGraph: { locale: "es_MX", type: "website", title: "Tesoria · Ve venir tu dinero" },
};

export default function Home() {
  const hoy = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City" }).format(new Date());
  return <InicioA hoy={hoy} lang="es" />;
}
