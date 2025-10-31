"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/mini-navbar";
import { ContactCard } from "@/components/ui/contact-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CustomFooter } from "@/components/custom/custom-footer";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xanldrvn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          mensaje: "",
        });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col bg-muted-foreground">
      <AuroraBackground>
        <section className="overflow-hidden">
          <Navbar />
        </section>
        <section className="text-background max-w-6xl mx-auto">
          <ContactCard
            title="Contactanos"
            description="Platicanos de tu proyecto y te ayudamos a llevarlo a la cima. Cuales son tus retos financieros, mayores dificultades, etc."
          >
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              {submitSuccess && (
                <div className="bg-green-500/20 border border-green-500 text-green-700 px-4 py-3 rounded">
                  ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label className="text-background">Nombre</Label>
                <Input
                  className="bg-brand-neutral text-background"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-background">Email</Label>
                <Input
                  className="bg-brand-neutral text-background"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-background">Teléfono</Label>
                <Input
                  className="bg-brand-neutral text-background"
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-background">Mensaje</Label>
                <Textarea
                  className="bg-brand-neutral text-background"
                  rows={4}
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                className="w-full bg-background text-muted-foreground hover:bg-background/90"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </ContactCard>
        </section>
      </AuroraBackground>
      <section className="text-background w-full bg-secondary/50">
        <CustomFooter />
      </section>
    </div>
  );
}
