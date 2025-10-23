import React from "react";
import Image from "next/image";
import { LiquidCard } from "@/components/ui/liquid-glass-card";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const timelineData: TimelineEntry[] = [
  {
    title: "Paso 1",
    content: (
      <LiquidCard className="max-w-lg w-full min-h-[500px]">
        <div className="space-y-6">
          <div className="w-full h-68 relative overflow-hidden rounded-t-lg">
            <Image
              src="/transactions.png"
              alt="Transactions"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              La Fundación de la Verdad
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg leading-relaxed">
              Todo empieza aquí. El motor que automáticamente recolecta,
              centraliza y organiza tus datos financieros (SAT y bancos) en una
              fuente única y confiable.
            </p>
          </div>
        </div>
      </LiquidCard>
    ),
  },
  {
    title: "Paso 2",
    content: (
      <LiquidCard className="max-w-lg w-full min-h-[500px]">
        <div className="space-y-6">
          <div className="w-full h-48 relative overflow-hidden rounded-t-lg">
            <Image
              src="/cashflow.png"
              alt="Cashflow"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Claridad en Tiempo Real
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg leading-relaxed">
              Responde al &ldquo;¿Dónde estamos ahora?&rdquo;. Te damos
              visibilidad total de tu operación diaria y flujo de caja en
              dashboards claros y siempre actualizados.
            </p>
          </div>
        </div>
      </LiquidCard>
    ),
  },
  {
    title: "Paso 3",
    content: (
      <LiquidCard className="max-w-lg w-full min-h-[500px]">
        <div className="space-y-6">
          <div className="w-full h-48 relative overflow-hidden rounded-t-lg">
            <Image src="/fpa.png" alt="FPA" fill className="object-cover" />
          </div>
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Estrategia a Futuro
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg leading-relaxed">
              Define el &ldquo;¿Hacia dónde vamos?&rdquo;. Modela escenarios
              &ldquo;what-if&rdquo;, proyecta tu runway y toma decisiones de
              alto nivel sobre tu crecimiento con una visión de largo plazo.
            </p>
          </div>
        </div>
      </LiquidCard>
    ),
  },
];
