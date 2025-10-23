import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Puzzle, PenTool, Dices } from "lucide-react";
import { ReactNode } from "react";

export function Features() {
  return (
    <section className="bg-background py-16 md:py-32">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Crecer crea cuellos de botella
          </h2>
          <p className="mt-4">
            Estás creciendo rápido. Tus ingresos están subiendo, pero también el
            caos. El mayor problema para las empresas listas para escalar es que
            no saben lo que no saben.
          </p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          <Card className="group shadow-primary/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Puzzle className="size-12" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Data dispersa</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Hojas de excel, SAT, Estados de cuenta, reportes de ventas, etc.
                Ya no sabes en que data confiar.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-primary/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <PenTool className="size-12" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Procesos manuales</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Conciliar cuentas, generar reportes, etc. Todo esto se hace
                manualmente y no hay un sistema que te permita hacerlo de manera
                automática.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-primary/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Dices className="size-12" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">¿Decisiones por Intuición?</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Estás tomando decisiones críticas de contratación y gastos
                basándote en el instinto en lugar de en datos?
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div
    aria-hidden
    className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,var(--brand-dark)_70%,transparent_100%)]"
  >
    <div className="absolute inset-0 [--border:var(--brand-dark)] dark:[--border:var(--brand-secondary)] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l">
      {children}
    </div>
  </div>
);
