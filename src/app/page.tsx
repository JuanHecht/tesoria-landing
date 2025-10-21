"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { Navbar } from "@/components/ui/mini-navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Features } from "@/components/blocks/features-1";
import { Hero } from "@/components/ui/animated-hero";

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      <section>
        <AuroraBackground>
          <Navbar />
          <Hero />
        </AuroraBackground>
      </section>
      <section className="bg-background">
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
            src={`https://ui.aceternity.com/_next/image?url=%2Flinear.webp&w=3840&q=75`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
        <Features />
      </section>
    </div>
  );
}
