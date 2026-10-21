import { ComoFunciona } from "@/components/como-funciona/ComoFunciona";

// La fecha del título siempre es hoy + 13 semanas: se regenera cada hora.
export const revalidate = 3600;

export default function Page() {
  const hoy = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City" }).format(new Date());
  return <ComoFunciona hoy={hoy} />;
}
