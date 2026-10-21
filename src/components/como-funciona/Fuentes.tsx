"use client";

import { useState } from "react";

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
  const n = f.filter(Boolean).length;
  const todas = n === 4;
  const flip = (i: number) => setF((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div>
      <div className="fu-head">
        <div>
          <div className="v-ov">{todas ? "Cómo lo resuelve Tesoria" : "El problema"}</div>
          <h2 className="v-h2 fu-h2">
            {todas ? "Tesoria las junta y trabaja encima de ellas." : "Hoy la respuesta está repartida en cuatro lugares."}
          </h2>
        </div>
        <div className="fu-sw" role="group" aria-label="Comparar">
          <button className={todas ? "" : "on"} onClick={() => setF([false, false, false, false])}>Hoy</button>
          <button className={todas ? "on" : ""} onClick={() => setF([true, true, true, true])}>Con Tesoria</button>
        </div>
      </div>

      <div className={"fu-band " + (n > 0 ? "on" : "off")}>
        {n > 0 ? (
          <>
            <div className="v-logo"><img src="/como-funciona/mark-white.svg" alt="" />TESORIA</div>
            <p><b>Una sola fuente de verdad, al día.</b> Tesoria se conecta a tu ERP y al SAT, trabaja encima de ellos, y desde aquí cobras y pagas.</p>
          </>
        ) : (
          <>
            <div className="fu-q">¿Y quién lo junta?</div>
            <p>Tú, a mano, cada semana. Y aun así la respuesta llega tarde.</p>
          </>
        )}
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
            {d.k === "xl" && !f[i] && (
              <div className="fu-files">
                <div className="fu-file">Flujo_2026_FINAL_v3.xlsx</div>
                <div className="fu-file">Calendario pagos (copia).xlsx</div>
                <div className="fu-file">Conciliación sep NO MOVER.xlsx</div>
                <div className="fu-file x">+ 14 archivos más</div>
              </div>
            )}
            <p className={"fu-txt" + (f[i] ? " con" : "")}>{f[i] ? d.con : d.hoy}</p>
            <div className="fu-tag">{f[i] ? "✓ En Tesoria" : "Toca para ver con Tesoria →"}</div>
          </button>
        ))}
      </div>
      <div className="fu-hint">
        {todas
          ? "Tu ERP sigue siendo tu fuente de verdad. Tesoria la mantiene al día y la vuelve operable."
          : "Toca cada fuente, o cambia a «Con Tesoria»."}
      </div>
    </div>
  );
}
