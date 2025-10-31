"use client";

import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/ui/gradient-background";
import { useRouter } from "next/navigation";

function CTA() {
  const router = useRouter();

  return (
    <div className="w-full">
      {/* <GradientBackground> */}
      <div className="md:px-4 lg:px-8">
        <GradientBackground className="h-[60vh] md:h-[50vh] flex items-center justify-center">
          <div className="flex flex-col text-center rounded-md p-4 lg:p-14 gap-8 items-center">
            <div>{/* <Badge>Get started</Badge> */}</div>
            <div className="flex flex-col gap-2">
              <h2 className="text-balance text-4xl font-semibold lg:text-5xl max-w-xl md:max-w-2xl">
                Unete a la revolución de la inteligencia financiera
              </h2>
            </div>
            <div className="flex flex-row gap-4">
              <Button
                onClick={() => router.push("/contact")}
                variant="expandIcon"
                size="lg"
                Icon={() => <PhoneCall className="h-4 w-4" />}
                iconPlacement="right"
              >
                Agenda una llamada
              </Button>
            </div>
          </div>
        </GradientBackground>
      </div>
      {/* </GradientBackground> */}
    </div>
  );
}

export { CTA };
