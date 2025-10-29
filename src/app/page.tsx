"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { Navbar } from "@/components/ui/mini-navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Features } from "@/components/blocks/features-1";
import { Hero } from "@/components/ui/animated-hero";
import Component from "@/components/ui/stacking-card";
import React from "react";
/* import TimelineDemo from "./timeline"; */

// demo.tsx
const projects = [
  {
    title: "Base: La fundación de la verdad",
    description:
      "Todo empieza aquí. El motor que automáticamente recolecta, centraliza y organiza tus datos (SAT y bancos) en una fuente única y confiable.",
    link: "/frame1.png",
    color: "#4F3E88",
  },
  {
    title: "Enmedio: Claridad en Tiempo Real",
    description:
      'Responde al "¿Dónde estamos ahora?". Te damos visibilidad total de tu flujo de caja y operación en dashboards claros y siempre actualizados.',
    link: "/frame2.png",
    color: "var(--accent)",
  },
  {
    title: "Punta: Estrategia a Futuro",
    description:
      'Define el "¿Hacia dónde vamos?". Modela escenarios "what-if", proyecta tu runway y toma decisiones de alto nivel sobre tu crecimiento con una visión de largo plazo.',
    link: "/frame3.png",
    color: "var(--brand-accent)",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="overflow-hidden">
        <AuroraBackground>
          <Navbar />
          <Hero />
        </AuroraBackground>
      </section>
      <section className="bg-background overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-foreground">
                Unleash the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Scroll Animations
                </span>
              </h1>
            </>
          }
        >
          <Image
            src="/ipad_ss.png"
            alt="iPad screenshot"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
        <Features />
      </section>
      <section className="bg-foreground py-16 md:py-32">
        <div className="@container mx-auto max-w-5xl px-6 text-background">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
              Solución de 3 niveles
            </h2>
            {/* <p className="text-lg md:text-xl leading-relaxed tracking-tight text-center">
              Deja de operar a ciegas. Cargamos toda tu data (SAT y bancos) y
              usamos IA para darte una visión clara de tu negocio. Por fin, la
              inteligencia que necesitas para tomar decisiones, no solo para
              pagar impuestos.
            </p> */}
          </div>
        </div>
        <Component projects={projects} />
      </section>
    </div>
  );
}
