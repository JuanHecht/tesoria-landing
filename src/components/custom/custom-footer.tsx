import { Instagram } from "lucide-react";
import { Footer } from "@/components/ui/footer";
import Image from "next/image";
import { Linkedin } from "lucide-react";

export const CustomFooter = () => (
  <Footer
    logo={
      <Image
        src="/logo_dark.svg"
        alt="logo"
        width={200}
        height={200}
        className="md:h-20 md:w-20 h-15 w-15"
      />
    }
    brandName="Tesoria"
    socialLinks={[
      {
        icon: <Linkedin className="h-5 w-5" />,
        href: "https://www.linkedin.com/company/tesoria",
        label: "Linkedin",
      },
      {
        icon: <Instagram className="h-5 w-5" />,
        href: "https://www.instagram.com/tesoria.ai/",
        label: "Instagram",
      },
    ]}
    mainLinks={[
      { href: "/#problem", label: "Problema" },
      { href: "/#solution", label: "Solución" },
      { href: "/contact", label: "Contacto" },
    ]}
    legalLinks={[
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ]}
    copyright={{
      text: "© 2025 Tesoria",
      license: "All rights reserved",
    }}
  />
);
