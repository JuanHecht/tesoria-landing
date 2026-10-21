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
      { href: "/como-funciona", label: "Cómo funciona" },
      { href: "/contact", label: "Contacto" },
      { href: "https://app.tesoria.ai", label: "Ingresar" },
    ]}
    legalLinks={[
      { href: "/privacy", label: "Aviso de privacidad" },
      { href: "/terms", label: "Términos y condiciones" },
    ]}
    copyright={{
      text: "© 2026 Tesoria Technologies, S.A.P.I. de C.V.",
      license: "Todos los derechos reservados.",
    }}
  />
);
