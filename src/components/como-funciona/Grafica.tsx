"use client";

import { corta, fechaDe, useVisto } from "./util";
import { useTextos } from "./textos";

const PASADO = [24.8, 22.0, 19.2];
const BASE = [18.6, 16.4, 17.1, 16.8, 17.1, 16.2, 16.1, 16.4, 19.0, 19.4, 17.2, 14.0, 14.4];
// Escenario «trimestre apretado»: cobros −10 %, renta +15 % desde enero, vencidos pagados esta semana.
const delta = (i: number) => Math.min(3, 0.25 * (i + 1)) + (i >= 10 ? 0.2 * (i - 9) : 0) + (i < 4 ? 1.2 : 0);

const H = 250;
const LO = 6;
const HI = 27;

type P = [number, number];

function curva(pts: P[]) {
  const out: string[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    out.push(` C${c1.map((n) => n.toFixed(1))} ${c2.map((n) => n.toFixed(1))} ${p2.map((n) => n.toFixed(1))}`);
  }
  return out;
}

const M = (p: P) => `M${p[0].toFixed(1)},${p[1].toFixed(1)}`;
const argmin = (a: number[]) => a.reduce((b, v, i) => (v < a[b] ? i : b), 0);
const mill = (v: number) => "$" + v.toFixed(1) + " M";
const menos = (v: number) => (v < 0 ? "−$" + Math.abs(v).toFixed(1) : "+$" + v.toFixed(1)) + " M";

export function Grafica({
  hoy,
  tono = "claro",
  modo = "hero",
  bajo = false,
}: {
  hoy: string;
  tono?: "claro" | "oscuro";
  modo?: "hero" | "escenario";
  bajo?: boolean;
}) {
  const [ref, on] = useVisto<HTMLDivElement>(0.25);
  const { grafica: tx, locale } = useTextos();
  const esc = modo === "escenario";
  const fut = esc ? BASE.map((v, i) => +(v - delta(i)).toFixed(1)) : BASE;
  const N = PASADO.length + fut.length;
  const X = (i: number) => (i / (N - 1)) * 800;
  const Y = (v: number) => H - ((v - LO) / (HI - LO)) * H;
  const puntos = (arr: number[]) => arr.map((v, i) => [X(i), Y(v)] as P);

  const t = PASADO.length - 1;
  const all = puntos(PASADO.concat(fut));
  const sg = curva(all);
  const pPast = M(all[0]) + sg.slice(0, t).join("");
  const pFut = M(all[t]) + sg.slice(t).join("");
  const pArea = M(all[0]) + sg.join("") + ` L800,${H} L0,${H} Z`;
  const allB = puntos(PASADO.concat(BASE));
  const pBase = M(allB[t]) + curva(allB).slice(t).join("");

  const li = argmin(fut);
  const lp = all[t + 1 + li];
  const pos = (p: P) => ({ left: (p[0] / 8).toFixed(2) + "%", top: ((p[1] / H) * 100).toFixed(2) + "%" });
  const lowD = corta(fechaDe(hoy, 7 * (li + 1)), locale);
  const fin = corta(fechaDe(hoy, 91), locale);

  const stats = esc
    ? [
        { ov: tx.bajo, n: mill(fut[li]), low: true, cap: `${tx.semana(lowD)} · ${tx.vs(menos(fut[li] - BASE[argmin(BASE)]))}` },
        { ov: tx.en13, n: mill(fut[12]), cap: tx.vs(menos(fut[12] - BASE[12])) },
        { ov: tx.minimo, n: "$8.0 M", cap: fut[li] > 8 ? tx.noCruzas : tx.cruzas },
      ]
    : [
        { ov: tx.hoyBancos, n: mill(PASADO[t]), cap: tx.cuentas },
        { ov: tx.bajo, n: mill(fut[li]), low: true, cap: tx.semana(lowD) },
        { ov: tx.en13, n: mill(fut[12]), cap: fin },
      ];

  return (
    <div ref={ref} className={`gr ${tono}${on ? " on" : ""}`}>
      <div className="gr-stats">
        {stats.map((s) => (
          <div key={s.ov}>
            <div className="gr-ov">{s.ov}</div>
            <div className={"gr-num" + (s.low ? " low" : "")}>{s.n}</div>
            <div className="gr-cap">{s.cap}</div>
          </div>
        ))}
      </div>
      <div className={"gr-box" + (bajo ? " bajo" : "")}>
        <svg viewBox={`0 0 800 ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <line className="gr-today" x1={X(t)} y1={0} x2={X(t)} y2={H} vectorEffect="non-scaling-stroke" />
          {esc && <line className="gr-min" x1={0} y1={Y(8)} x2={800} y2={Y(8)} vectorEffect="non-scaling-stroke" />}
          <g className="gr-draw">
            <path className="gr-area" d={pArea} />
            {esc && <path className="gr-base" d={pBase} vectorEffect="non-scaling-stroke" />}
            <path className="gr-past" d={pPast} vectorEffect="non-scaling-stroke" />
            <path className="gr-fut" d={pFut} vectorEffect="non-scaling-stroke" />
          </g>
        </svg>
        <div className="gr-dot" style={pos(all[t])} />
        <div className="gr-pop">
          <div className="gr-dot low" style={pos(lp)} />
          <div className="gr-tag" style={pos(lp)}>
            {mill(fut[li])} · {lowD}
          </div>
        </div>
      </div>
      <div className="gr-x">
        <span>{tx.atras}</span>
        <span>
          <b>{tx.hoy}</b> · {corta(fechaDe(hoy), locale)}
        </span>
        <span>{fin}</span>
      </div>
      <div className="gr-leg">
        <span><i className="gr-sw" />{tx.paso}</span>
        <span><i className="gr-sw fut" />{esc ? tx.conCambios : tx.facturado}</span>
        {esc && <span><i className="gr-sw base" />{tx.sinCambios}</span>}
        {esc && <span><i className="gr-sw min" />{tx.minimoLeg}</span>}
      </div>
    </div>
  );
}
