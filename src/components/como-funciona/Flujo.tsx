"use client";

import { Pantalla } from "./Pantalla";
import { corta, fechaDe } from "./util";
import { useTextos } from "./textos";

// Cuadra con la suma de la sección: 19.2 + 38.6 − 43.4 = 14.4 (millones).
const COBROS = [2.6, 2.4, 3.4, 2.9, 3.1, 2.5, 2.8, 3.0, 4.6, 3.2, 2.7, 2.3, 3.1];
const PAGOS = [3.2, 4.6, 2.7, 3.2, 2.8, 3.4, 2.9, 2.7, 2.0, 2.8, 4.9, 5.5, 2.7];
const r1 = (v: number) => Math.round(v * 10) / 10;

export function Flujo({ hoy }: { hoy: string }) {
  const { flujo: t, locale } = useTextos();
  const d = fechaDe(hoy);
  const lunes = -((d.getUTCDay() + 6) % 7);
  const cobF = COBROS.map((v) => r1(v * 0.78));
  const cobP = COBROS.map((v, i) => r1(v - cobF[i]));
  const pagF = PAGOS.map((v) => r1(v * 0.5));
  const pagO = PAGOS.map((v) => r1(v * 0.2));
  const pagN = PAGOS.map((v, i) => r1(v - pagF[i] - pagO[i]));
  const ini: number[] = [];
  const fin: number[] = [];
  let s = 19.2;
  COBROS.forEach((c, i) => {
    ini.push(r1(s));
    s = s + c - PAGOS[i];
    fin.push(r1(s));
  });
  const low = fin.reduce((b, v, i, a) => (v < a[b] ? i : b), 0);

  const filas = [
    { n: t.filas[0], k: "", v: ini },
    { n: t.filas[1], k: "op", v: cobF },
    { n: t.filas[2], k: "op", v: cobP },
    { n: t.filas[3], k: "fin", v: pagF, neg: true },
    { n: t.filas[4], k: "fin", v: pagO, neg: true },
    { n: t.filas[5], k: "fin", v: pagN, neg: true },
    { n: t.filas[6], k: "tot", v: fin, low: true },
  ];

  return (
    <Pantalla ancho={1120} crumb={<>{t.crumb[0]} / <b>{t.crumb[1]}</b></>}>
      <div className="px-body">
        <div className="fx ac jb" style={{ marginBottom: 14 }}>
          <div>
            <h3 className="px-h">{t.h}</h3>
            <p className="px-sub" style={{ margin: 0 }}>{t.sub}</p>
          </div>
          <div className="px-chips" style={{ margin: 0 }}>
            <span className="px-chip on">{t.chips[0]}</span>
            <span className="px-chip">{t.chips[1]}</span>
          </div>
        </div>
        <table className="px-grid">
          <thead>
            <tr>
              <th>{t.concepto}</th>
              {COBROS.map((_, i) => (
                <th key={i} className={i === 0 ? "hoy" : ""}>{i === 0 ? t.estaSem : corta(fechaDe(hoy, lunes + 7 * i), locale)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => (
              <tr key={f.n} className={f.k}>
                <td>{f.n}</td>
                {f.v.map((v, i) => (
                  <td key={i} className={(i === 0 ? "hoy" : "") + (f.low && i === low ? " low" : "")}>
                    {(f.neg ? "−" : "") + v.toFixed(1)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Pantalla>
  );
}
