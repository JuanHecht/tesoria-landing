"use client";

import { useState } from "react";
import { Pantalla } from "./Pantalla";
import { pesos } from "./util";
import { useTextos, type Textos } from "./textos";

type Concepto = keyof Textos["pagos"]["conceptos"];
type Factura = { id: string; p: string; rfc: string; c: Concepto; mes: string; m: number; dia: number; cta: string };
type Pago = { id: string; p: string; c: Concepto; mes: string; cta: string; m: number };

const POR_REVISAR: Factura[] = [
  { id: "1", p: "AXA Seguros S.A. de C.V.", rfc: "ASE930924SS7", c: "seguro", mes: "2026-09", m: 12930.24, dia: 18, cta: "BBVA ····4410" },
  { id: "2", p: "Inmobiliaria del Norte S.A.", rfc: "INO200101001", c: "renta", mes: "2026-09", m: 45270.23, dia: 15, cta: "Santander ····0772" },
  { id: "3", p: "Telmex S.A.B.", rfc: "TME840315KT6", c: "internet", mes: "2026-10", m: 2855.49, dia: 12, cta: "Banorte ····9013" },
  { id: "4", p: "Despacho Contable López y Asociados", rfc: "DCL150801PP5", c: "honorarios", mes: "2026-09", m: 17336.77, dia: 10, cta: "HSBC ····1187" },
];
const LOTE_INICIAL: Pago[] = [
  { id: "a", p: "Distribuidora de Materiales Industriales", c: "materia", mes: "2026-09", cta: "Banorte ····1235", m: 99290.28 },
  { id: "b", p: "Distribuidora de Materiales Industriales", c: "materia", mes: "2026-08", cta: "Banorte ····1235", m: 92053.59 },
  { id: "c", p: "Telmex S.A.B.", c: "internet", mes: "2026-09", cta: "Banorte ····9013", m: 2855.49 },
];

export function Pagos() {
  const tx = useTextos();
  const t = tx.pagos;
  const [hechas, setHechas] = useState<string[]>([]);
  const [lote, setLote] = useState<Pago[]>(LOTE_INICIAL);
  const [ultimo, setUltimo] = useState<string | null>(null);

  const pendientes = POR_REVISAR.filter((r) => !hechas.includes(r.id));
  const total = lote.reduce((a, l) => a + l.m, 0);

  const decidir = (r: Factura, aprobar: boolean) => {
    setHechas((h) => [...h, r.id]);
    if (aprobar) {
      setLote((l) => [{ id: r.id, p: r.p, c: r.c, mes: r.mes, cta: r.cta, m: r.m }, ...l]);
      setUltimo(r.id);
    }
  };
  const reiniciar = () => {
    setHechas([]);
    setLote(LOTE_INICIAL);
    setUltimo(null);
  };

  return (
    <Pantalla crumb={<>{t.crumb[0]} / <b>{t.crumb[1]}</b></>}>
      <div className="px-body" style={{ paddingBottom: 276 }}>
        <h3 className="px-h">{t.h}</h3>
        <p className="px-sub">{t.sub}</p>
        <div className="px-tabs">
          <span className="px-tab on">{t.porRevisar(31 + pendientes.length)}</span>
          <span className="px-tab">{t.todas}</span>
        </div>
        <table className="px-table" style={{ marginTop: 0 }}>
          <thead>
            <tr><th>{t.cols[0]}</th><th>{t.cols[1]}</th><th className="r">{t.cols[2]}</th><th>{t.cols[3]}</th><th className="r">{t.cols[4]}</th></tr>
          </thead>
          <tbody>
            {pendientes.map((r) => (
              <tr key={r.id}>
                <td><div className="px-strong">{r.p}</div><div className="px-small px-mono">{r.rfc}</div></td>
                <td>
                  <div>{t.conceptos[r.c]} — {r.mes}</div>
                  <span className="px-tag mint">{t.vigente}</span> <span className="px-tag amar">{t.revisar}</span>
                </td>
                <td className="r"><div className="px-num" style={{ fontSize: 13 }}>{pesos(r.m)}</div><div className="px-small">{tx.sep(r.dia)}</div></td>
                <td><span className="px-tag azul">{t.cats[r.c]}</span></td>
                <td className="r">
                  <div className="fx g6" style={{ justifyContent: "flex-end" }}>
                    <button className="px-btn no pg-b" onClick={() => decidir(r, false)}>{t.rechazar}</button>
                    <button className="px-btn ok pg-b" onClick={() => decidir(r, true)}>{t.aprobar}</button>
                  </div>
                </td>
              </tr>
            ))}
            {pendientes.length === 0 && (
              <tr className="pg-empty">
                <td colSpan={5}>
                  {t.nada} <button className="pg-reset" onClick={reiniciar}>{t.empezar}</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="px-float" style={{ left: 26, right: 26, bottom: 22, padding: 0, overflow: "hidden" }}>
        <div className="fx ac g24" style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-1)" }}>
          <div><div className="px-ov">{t.programados}</div><div className="px-num">{pesos(total)}</div></div>
          <div><div className="px-ov">{t.listos}</div><div className="px-num" style={{ fontSize: 15 }}>{t.de(lote.length, lote.length)}</div></div>
          <div><div className="px-ov">{t.pagados}</div><div className="px-num pos" style={{ fontSize: 15 }}>$1,282,548</div></div>
          <span className="px-btn pri" style={{ marginLeft: "auto", padding: "9px 14px", fontSize: 12 }}>{t.pagar}</span>
        </div>
        {lote.slice(0, 3).map((l) => (
          <div key={l.id} className={"fx ac g12" + (l.id === ultimo ? " pg-in" : "")} style={{ padding: "9px 16px", borderBottom: "1px solid var(--border-1)" }}>
            <span className="px-check" />
            <div style={{ flex: 1 }}><div className="px-strong">{l.p}</div><div className="px-small">{t.conceptos[l.c]} — {l.mes}</div></div>
            <span className="px-small">{l.cta}</span>
            <span className="px-tag mint">{t.comprobante}</span>
            <span className="px-num" style={{ fontSize: 13, minWidth: 96, textAlign: "right" }}>{pesos(l.m)}</span>
          </div>
        ))}
        {lote.length > 3 && (
          <div className="px-small" style={{ padding: "8px 16px" }}>
            {t.mas(lote.length - 3)}
          </div>
        )}
      </div>
    </Pantalla>
  );
}
