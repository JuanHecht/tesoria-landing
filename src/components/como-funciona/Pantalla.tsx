"use client";

import { useEffect, useRef, useState } from "react";

// En celular no se encoge más que esto: la pantalla se puede deslizar de lado para seguir siendo legible.
const ESCALA_MIN = 0.62;

// Pinta una pantalla del producto a un ancho fijo y la escala al contenedor, como un screenshot vivo.
export function Pantalla({
  ancho = 920,
  crumb,
  children,
}: {
  ancho?: number;
  crumb: React.ReactNode;
  children: React.ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [desliza, setDesliza] = useState(false);

  useEffect(() => {
    const w = wrap.current;
    const i = inner.current;
    if (!w || !i) return;
    const fit = () => {
      const s = Math.max(w.clientWidth / ancho, ESCALA_MIN);
      i.style.transform = `scale(${s})`;
      w.style.height = Math.ceil(i.offsetHeight * s) + "px";
      setDesliza(ancho * s > w.clientWidth + 1);
    };
    const ro = new ResizeObserver(fit);
    ro.observe(w);
    ro.observe(i);
    fit();
    return () => ro.disconnect();
  }, [ancho]);

  return (
    <>
      <div className={"px-wrap" + (desliza ? " desliza" : "")} ref={wrap}>
        <div className="px" ref={inner} style={{ width: ancho }}>
          <div className="px-top">
            <img src="/como-funciona/mark-purple.svg" alt="" />
            <span className="px-crumb">{crumb}</span>
          </div>
          {children}
        </div>
      </div>
      {desliza && <div className="px-hint">Desliza la pantalla para verla completa →</div>}
    </>
  );
}
