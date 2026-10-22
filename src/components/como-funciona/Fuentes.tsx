"use client";

import { useEffect, useRef, useState } from "react";
import { useTextos } from "./textos";

const BANCOS = [
  { n: "BBVA", c: "#004481" },
  { n: "Banorte", c: "#EB0029" },
  { n: "Santander", c: "#EC0000" },
  { n: "Banamex", c: "#002D72" },
  { n: "HSBC", c: "#DB0011" },
];

const FUENTES = ["sat", "erp", "bank", "xl"] as const;

// Avance del scroll (0–1 dentro de la sección fija) en el que voltea cada tarjeta.
const UMBRALES = [0.1, 0.3, 0.5, 0.7];

function Marca({ k }: { k: string }) {
  const t = useTextos().fuentes;
  if (k === "sat") return <img src="/como-funciona/sat.png" alt="SAT" />;
  if (k === "erp") return <span className="fu-wm">{t.erpWm}</span>;
  if (k === "bank") return <span className="fu-wm">{t.bankWm}</span>;
  return (
    <>
      <span className="lg-xl">X</span>
      <span className="fu-wm">Excel</span>
    </>
  );
}

export function Fuentes() {
  const t = useTextos().fuentes;
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
      s.style.setProperty("--avance", avance.toFixed(3));
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
                <div className="v-ov">{t.problemaOv}</div>
                <h2 className="v-h2 fu-h2">{t.problemaH2}</h2>
              </div>
              <div className={vis(todas)} aria-hidden={!todas}>
                <div className="v-ov">{t.resuelveOv}</div>
                <h2 className="v-h2 fu-h2">{t.resuelveH2}</h2>
              </div>
            </div>
            <div className="fu-sw" role="group" aria-label={t.comparar}>
              <button className={todas ? "" : "on"} onClick={() => setF([false, false, false, false])}>{t.hoy}</button>
              <button className={todas ? "on" : ""} onClick={() => setF([true, true, true, true])}>{t.con}</button>
            </div>
          </div>

          <div className={"fu-band " + (n > 0 ? "on" : "off")}>
            <div className="fu-stack">
              <div className={"fu-bi " + vis(n === 0)}>
                <div className="fu-q">{t.quien}</div>
                <p>{t.aMano}</p>
              </div>
              <div className={"fu-bi " + vis(n > 0)}>
                <div className="v-logo"><img src="/como-funciona/mark-white.svg" alt="" />TESORIA</div>
                <p><b>{t.una[0]}</b>{t.una[1]}</p>
              </div>
            </div>
            <span className="fu-n">{t.enUno(n)}</span>
            <span className="fu-bar" aria-hidden="true" />
          </div>

          <div className="fu-grid">
            {FUENTES.map((k, i) => (
              <button key={k} className={"fu-c " + (f[i] ? "done" : "t" + i)} onClick={() => flip(i)} aria-pressed={f[i]}>
                <div className="fu-mark"><Marca k={k} /></div>
                {k === "erp" && (
                  <div className="lg-row">
                    <span className="lg-sap"><i>SAP</i>Business One</span>
                    <span className="lg-ns"><small>ORACLE</small>NetSuite</span>
                    <span className="lg-plus">+</span>
                  </div>
                )}
                {k === "bank" && (
                  <div className="lg-bk">
                    {BANCOS.map((b) => (
                      <span key={b.n} style={{ color: b.c }}>{b.n}</span>
                    ))}
                  </div>
                )}
                <div className="fu-stack fu-faces">
                  <div className={vis(!f[i])}>
                    {k === "xl" && (
                      <div className="fu-files">
                        {t.archivos.map((a, j) => (
                          <div key={a} className={"fu-file" + (j === t.archivos.length - 1 ? " x" : "")}>{a}</div>
                        ))}
                      </div>
                    )}
                    <p className="fu-txt">{t[k][0]}</p>
                  </div>
                  <div className={vis(f[i])}>
                    <p className="fu-txt con">{t[k][1]}</p>
                  </div>
                </div>
                <div className="fu-tag">{f[i] ? t.enTesoria : t.toca}</div>
              </button>
            ))}
          </div>
          <div className="fu-hint">
            {todas ? t.todas : t.sigue}
          </div>
        </div>
      </div>
    </div>
  );
}
