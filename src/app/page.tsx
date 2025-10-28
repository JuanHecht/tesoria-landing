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
import { Timeline } from "@/components/ui/timeline";

// demo.tsx
const projects = [
  {
    title: "Automatiza tus datos",
    description:
      "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    link: "/frame1.png",
    color: "var(--brand-accent)",
  },
  {
    title: "Automatiza tus datos",
    description:
      "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément.",
    link: "/frame2.png",
    color: "var(--brand-accent)",
  },
  {
    title: "Automatiza tus datos",
    description:
      "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal.",
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
      <section className="bg-foreground">
        <Component projects={projects} />
      </section>
    </div>
  );
}
