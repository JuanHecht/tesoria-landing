import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonColorful } from "@/components/ui/button-colorful";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "predecir tu flujo de caja",
      "dejar de usar Excel",
      "modelar contratación",
      "conciliar cuentas",
      "gestionar presupuesto",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          {/* <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Read our launch article <MoveRight className="w-4 h-4" />
            </Button>
          </div> */}
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-primary">Tu AI CFO para:</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Deja de operar a ciegas. Cargamos toda tu data (SAT y bancos) y
              usamos IA para darte una visión clara de tu negocio. Por fin, la
              inteligencia que necesitas para tomar decisiones, no solo para
              pagar impuestos.
            </p>
          </div>
          <div className="flex md:flex-row flex-col gap-3">
            {/* <Button size="lg" className="gap-4" variant="outline">
              Jump on a call <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4">
              Sign up here <MoveRight className="w-4 h-4" />
            </Button> */}
            <Button
              variant="expandIcon"
              size="lg"
              Icon={() => <PhoneCall className="h-4 w-4" />}
              iconPlacement="right"
            >
              Agenda una llamada
            </Button>
            <ButtonColorful>Sign up here</ButtonColorful>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
