"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pantalla } from "./Pantalla";
import { sinMovimiento, useVisto } from "./util";
import { useTextos } from "./textos";

type Nota = "norte" | "gcm" | "lote";
type Cat = "retail" | "mayoreo" | "export" | "proyectos";

const DEPOSITOS: { dia: number; cta: string; ref: string; nota?: Nota; c: string; rfc: string; cat: Cat; t: string; m: string }[] = [
  { dia: 4, cta: "0017", ref: "0004521", nota: "norte", c: "Cadena de Tiendas del Pacífico", rfc: "CTP170301LL2", cat: "retail", t: "azul", m: "+$142,929.39" },
  { dia: 4, cta: "0009", ref: "0004520", nota: "gcm", c: "Grupo Comercial Monterrey S.A.", rfc: "GCM190201RR8", cat: "mayoreo", t: "lila", m: "+$326,363.83" },
  { dia: 3, cta: "0021", ref: "0004518", nota: "lote", c: "Exportadora del Bajío", rfc: "EXB110812QW3", cat: "export", t: "mint", m: "+$88,410.00" },
  { dia: 3, cta: "0004", ref: "0004517", c: "Constructora Reforma S.A. de C.V.", rfc: "CRE140901001", cat: "proyectos", t: "lila", m: "+$57,200.00" },
  { dia: 2, cta: "0017", ref: "0004512", nota: "norte", c: "Cadena de Tiendas del Pacífico", rfc: "CTP170301LL2", cat: "retail", t: "azul", m: "+$150,047.64" },
];
const N = DEPOSITOS.length;
const FIN = N + 3;

export function Cobranza() {
  const tx = useTextos();
  const t = tx.cobranza;
  const [ref, visto] = useVisto<HTMLDivElement>(0.5);
  const [paso, setPaso] = useState(FIN);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const play = useCallback(() => {
    clearInterval(timer.current);
    if (sinMovimiento()) return setPaso(FIN);
    setPaso(0);
    timer.current = setInterval(() => {
      setPaso((s) => {
        if (s + 1 >= FIN) clearInterval(timer.current);
        return s + 1;
      });
    }, 520);
  }, []);

  useEffect(() => {
    if (visto) play();
    return () => clearInterval(timer.current);
  }, [visto, play]);

  const identificados = Math.max(0, Math.min(N, paso - 2));

  return (
    <div ref={ref}>
      <Pantalla crumb={<>{t.crumb[0]} / <b>{t.crumb[1]}</b></>}>
        <div className="px-body" style={{ paddingBottom: 84 }}>
          <div className="fx ac jb">
            <h3 className="px-h">{t.h}</h3>
            <button className="cb-again" onClick={play}>{t.otraVez}</button>
          </div>
          <p className="px-sub">{t.sub}</p>
          <div className="px-chips">
            <span className="px-chip">{t.chips[0]}</span>
            <span className="px-chip on">{t.chips[1]}</span>
            <span className="px-chip">{t.chips[2]}</span>
            <span className="px-meta">{t.meta(58 + Math.min(N, paso), 58 + identificados)}</span>
          </div>
          <div className="px-card px-kpis">
            <div className="fx ac g12">
              <span className="px-badge">SPEI</span>
              <div>
                <div className="px-strong">{t.cuenta}</div>
                <div className="px-small">{t.cuentaSub}</div>
              </div>
            </div>
            <div><div className="px-ov">{t.entradas}</div><div className="px-num pos">+$1,284,552.08</div></div>
            <div><div className="px-ov">{t.barrida}</div><div className="px-num">−$1,284,552.08</div></div>
            <div><div className="px-ov">{t.saldo}</div><div className="px-num">$0.00</div></div>
            <span className="px-ok">{t.alDia}</span>
          </div>
          <table className="px-table">
            <thead>
              <tr><th>{t.cols[0]}</th><th>{t.cols[1]}</th><th>{t.cols[2]}</th><th>{t.cols[3]}</th><th className="r">{t.cols[4]}</th></tr>
            </thead>
            <tbody>
              {DEPOSITOS.map((r, i) => {
                const k = N - 1 - i;
                const visible = paso > k;
                const ok = paso > k + 2;
                return (
                  <tr key={i} className={"cb-r" + (visible ? "" : " wait") + (visible && !ok ? " cb-new" : "")}>
                    <td className="px-mono">{tx.sep(r.dia)}</td>
                    <td><div>{t.abono(r.cta)}</div><div className="px-small">Ref. {r.ref}{r.nota && " · " + t.notas[r.nota]}</div></td>
                    <td><div className="px-strong">{ok ? r.c : "—"}</div><div className="px-small">{ok ? r.rfc : ""}</div></td>
                    <td><span className={"px-tag " + (ok ? r.t : "gris")}>{ok ? t.cats[r.cat] : t.identificando}</span></td>
                    <td className="r px-num pos" style={{ fontSize: 13 }}>{r.m}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-float" style={{ right: 22, bottom: 18, width: 380 }}>
          <div className="px-ov">{t.clabe("Cadena de Tiendas del Pacífico")}</div>
          <div className="px-clabe">646 180 7432 0000 0017</div>
          <div className="fx g16" style={{ marginTop: 10 }}>
            <div><div className="px-ov">{t.abonos}</div><div className="px-num" style={{ fontSize: 14 }}>4 · $560,948.67</div></div>
            <div><div className="px-ov">{t.aplicados}</div><div className="px-num" style={{ fontSize: 14 }}>{t.de(4, 4)}</div></div>
            <div><div className="px-ov">{t.porCobrar}</div><div className="px-num" style={{ fontSize: 14 }}>$142,929.39</div></div>
          </div>
        </div>
      </Pantalla>
    </div>
  );
}
