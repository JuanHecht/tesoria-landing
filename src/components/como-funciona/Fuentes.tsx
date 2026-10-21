"use client";

import { useEffect, useRef, useState } from "react";

const BANCOS = [
  { n: "BBVA", c: "#004481" },
  { n: "Banorte", c: "#EB0029" },
  { n: "Santander", c: "#EC0000" },
  { n: "Banamex", c: "#002D72" },
  { n: "HSBC", c: "#DB0011" },
];

const FUENTES = [
  { k: "sat", hoy: "Lo que facturaste y lo que te facturaron.", con: "Tus facturas entran solas, todos los días." },
  { k: "erp", hoy: "Tu contabilidad y tus cuentas por pagar y por cobrar.", con: "Tesoria se conecta y lo usa como tu fuente de verdad. No lo reemplaza." },
  { k: "bank", hoy: "Lo que ya entró y salió. Cada cuenta, en su propio portal.", con: "Cobras y pagas desde tu cuenta operativa. Los demás bancos los subes y los ves juntos." },
  { k: "xl", hoy: "¿Cuál es la versión buena? ¿Quién la actualiza?", con: "Lo que vivía en veinte archivos ahora vive en un solo lugar." },
] as const;

// Avance del scroll (0–1 dentro de la sección fija) en el que voltea cada tarjeta.
const UMBRALES = [0.12, 0.32, 0.52, 0.72];

function Marca({ k }: { k: string }) {
  if (k === "sat") return <img src="/como-funciona/sat.png" alt="SAT" />;
  if (k === "erp") return <span className="fu-wm">Tu ERP</span>;
  if (k === "bank") return <span className="fu-wm">Tus bancos</span>;
  return (
    <>
      <span className="lg-xl">X</span>
      <span className="fu-wm">Excel</span>
    </>
  );
}

export function Fuentes() {
  const [f, setF] = useState([false, false, false, false]);
  const pin = useRef<HTMLDivElement>(null);
  const stick = useRef<HTMLDivElement>(null);
  const pasados = useRef(-1);

  // La sección se queda fija mientras el scroll voltea las tarjetas de una en una.
  useEffect(() => {
    const p = pin.current;
    const s = stick.current;
    if (!p || !s) return;
    let raf = 0;
    let alto = 0;
    let vh = window.innerHeight;
    const ajustar = () => {
      vh = window.innerHeight;
      alto = s.offsetHeight;
      s.style.top = Math.min(0, vh - alto) + "px";
    };
    const medir = () => {
      raf = 0;
      const r = p.getBoundingClientRect();
      const recorrido = r.height - Math.max(vh, alto);
      const avance = recorrido > 0 ? Math.min(1, Math.max(0, -r.top / recorrido)) : 1;
      const n = UMBRALES.filter((u) => avance >= u).length;
      if (n !== pasados.current) {
        pasados.current = n;
        setF([0, 1, 2, 3].map((i) => i < n));
      }
    };
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    const ro = new ResizeObserver(() => {
      ajustar();
      pedir();
    });
    ro.observe(s);
    ajustar();
    medir();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", ajustar);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", ajustar);
      cancelAnimationFrame(raf);
    };
  }, []);

  const n = f.filter(Boolean).length;
  const todas = n === 4;
  const flip = (i: number) => setF((prev) => prev.map((v, j) => (j === i ? !v : v)));

  const vis = (on: boolean) => (on ? "" : "off");

  return (
    <div className="fu-pin" ref={pin}>
      <div className="fu-stick" ref={stick}>
        <div className="v-in fu-in">
          <div className="fu-head">
            <div className="fu-stack">
              <div className={vis(!todas)}>
                <div className="v-ov">El problema</div>
                <h2 className="v-h2 fu-h2">Hoy la respuesta está repartida en cuatro lugares.</h2>
              </div>
              <div className={vis(todas)} aria-hidden={!todas}>
                <div className="v-ov">Cómo lo resuelve Tesoria</div>
                <h2 className="v-h2 fu-h2">Tesoria las junta y trabaja encima de ellas.</h2>
              </div>
            </div>
            <div className="fu-sw" role="group" aria-label="Comparar">
              <button className={todas ? "" : "on"} onClick={() => setF([false, false, false, false])}>Hoy</button>
              <button className={todas ? "on" : ""} onClick={() => setF([true, true, true, true])}>Con Tesoria</button>
            </div>
          </div>

          <div className={"fu-band " + (n > 0 ? "on" : "off")}>
            <div className="fu-stack">
              <div className={"fu-bi " + vis(n === 0)}>
                <div className="fu-q">¿Y quién lo junta?</div>
                <p>Tú, a mano, cada semana. Y aun así la respuesta llega tarde.</p>
              </div>
              <div className={"fu-bi " + vis(n > 0)}>
                <div className="v-logo"><img src="/como-funciona/mark-white.svg" alt="" />TESORIA</div>
                <p><b>Una sola fuente de verdad, al día.</b> Tesoria se conecta a tu ERP y al SAT, trabaja encima de ellos, y desde aquí cobras y pagas.</p>
              </div>
            </div>
            <span className="fu-n">{n} de 4 en un lugar</span>
          </div>

          <div className="fu-grid">
            {FUENTES.map((d, i) => (
              <button key={d.k} className={"fu-c " + (f[i] ? "done" : "t" + i)} onClick={() => flip(i)} aria-pressed={f[i]}>
                <div className="fu-mark"><Marca k={d.k} /></div>
                {d.k === "erp" && (
                  <div className="lg-row">
                    <span className="lg-sap"><i>SAP</i>Business One</span>
                    <span className="lg-ns"><small>ORACLE</small>NetSuite</span>
                    <span className="lg-plus">+</span>
                  </div>
                )}
                {d.k === "bank" && (
                  <div className="lg-bk">
                    {BANCOS.map((b) => (
                      <span key={b.n} style={{ color: b.c }}>{b.n}</span>
                    ))}
                  </div>
                )}
                <div className="fu-stack fu-faces">
                  <div className={vis(!f[i])}>
                    {d.k === "xl" && (
                      <div className="fu-files">
                        <div className="fu-file">Flujo_2026_FINAL_v3.xlsx</div>
                        <div className="fu-file">Calendario pagos (copia).xlsx</div>
                        <div className="fu-file">Conciliación sep NO MOVER.xlsx</div>
                        <div className="fu-file x">+ 14 archivos más</div>
                      </div>
                    )}
                    <p className="fu-txt">{d.hoy}</p>
                  </div>
                  <div className={vis(f[i])}>
                    <p className="fu-txt con">{d.con}</p>
                  </div>
                </div>
                <div className="fu-tag">{f[i] ? "✓ En Tesoria" : "Toca o sigue bajando →"}</div>
              </button>
            ))}
          </div>
          <div className="fu-hint">
            {todas
              ? "Tu ERP sigue siendo tu fuente de verdad. Tesoria la mantiene al día y la vuelve operable."
              : "Sigue bajando para ver cada fuente con Tesoria."}
          </div>
        </div>
      </div>
    </div>
  );
}
