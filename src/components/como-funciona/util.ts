"use client";

import { useEffect, useRef, useState } from "react";

// "hoy" llega del servidor como YYYY-MM-DD (hora de CDMX) para que servidor y cliente pinten lo mismo.
export function fechaDe(hoy: string, masDias = 0) {
  const d = new Date(hoy + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + masDias);
  return d;
}

export function corta(d: Date, locale = "es-MX") {
  return d
    .toLocaleDateString(locale, { day: "numeric", month: "short", timeZone: "UTC" })
    .replace(".", "");
}

export function larga(d: Date, locale = "es-MX") {
  return d.toLocaleDateString(locale, { day: "numeric", month: "long", timeZone: "UTC" });
}

export function pesos(v: number) {
  return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function sinMovimiento() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// true la primera vez que el elemento entra a la vista; no regresa a false.
export function useVisto<T extends Element>(threshold = 0.45) {
  const ref = useRef<T>(null);
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setVisto(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setVisto(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visto] as const;
}
