"use client";

import { useState } from "react";
import { Pantalla } from "./Pantalla";
import { pesos } from "./util";

type Factura = { id: string; p: string; rfc: string; c: string; m: number; f: string; cat: string; cta: string };
type Pago = { id: string; p: string; c: string; cta: string; m: number };

const POR_REVISAR: Factura[] = [
  { id: "1", p: "AXA Seguros S.A. de C.V.", rfc: "ASE930924SS7", c: "Seguro flotilla — 2026-09", m: 12930.24, f: "18 sep", cat: "Seguros", cta: "BBVA ····4410" },
  { id: "2", p: "Inmobiliaria del Norte S.A.", rfc: "INO200101001", c: "Renta oficina — 2026-09", m: 45270.23, f: "15 sep", cat: "Renta de oficina", cta: "Santander ····0772" },
  { id: "3", p: "Telmex S.A.B.", rfc: "TME840315KT6", c: "Internet — 2026-10", m: 2855.49, f: "12 sep", cat: "Telecomunicaciones", cta: "Banorte ····9013" },
  { id: "4", p: "Despacho Contable López y Asociados", rfc: "DCL150801PP5", c: "Honorarios — 2026-09", m: 17336.77, f: "10 sep", cat: "Honorarios", cta: "HSBC ····1187" },
];
const LOTE_INICIAL: Pago[] = [
  { id: "a", p: "Distribuidora de Materiales Industriales", c: "Compra materia prima — 2026-09", cta: "Banorte ····1235", m: 99290.28 },
  { id: "b", p: "Distribuidora de Materiales Industriales", c: "Compra materia prima — 2026-08", cta: "Banorte ····1235", m: 92053.59 },
  { id: "c", p: "Telmex S.A.B.", c: "Internet — 2026-09", cta: "Banorte ····9013", m: 2855.49 },
];

export function Pagos() {
  const [hechas, setHechas] = useState<string[]>([]);
  const [lote, setLote] = useState<Pago[]>(LOTE_INICIAL);
  const [ultimo, setUltimo] = useState<string | null>(null);

  const pendientes = POR_REVISAR.filter((r) => !hechas.includes(r.id));
  const total = lote.reduce((a, l) => a + l.m, 0);

  const decidir = (r: Factura, aprobar: boolean) => {
    setHechas((h) => [...h, r.id]);
    if (aprobar) {
      setLote((l) => [{ id: r.id, p: r.p, c: r.c, cta: r.cta, m: r.m }, ...l]);
      setUltimo(r.id);
    }
  };
  const reiniciar = () => {
    setHechas([]);
    setLote(LOTE_INICIAL);
    setUltimo(null);
  };

  return (
    <Pantalla crumb={<>Facturas / <b>Por revisar</b></>}>
      <div className="px-body" style={{ paddingBottom: 276 }}>
        <h3 className="px-h">Facturas</h3>
        <p className="px-sub">Todo lo que te facturan llega aquí. Solo lo aprobado se paga.</p>
        <div className="px-tabs">
          <span className="px-tab on">Por revisar · {31 + pendientes.length}</span>
          <span className="px-tab">Todas las facturas</span>
        </div>
        <table className="px-table" style={{ marginTop: 0 }}>
          <thead>
            <tr><th>Proveedor</th><th>Concepto</th><th className="r">Monto</th><th>Categoría</th><th className="r">Acción</th></tr>
          </thead>
          <tbody>
            {pendientes.map((r) => (
              <tr key={r.id}>
                <td><div className="px-strong">{r.p}</div><div className="px-small px-mono">{r.rfc}</div></td>
                <td>
                  <div>{r.c}</div>
                  <span className="px-tag mint">Vigente</span> <span className="px-tag amar">Por revisar</span>
                </td>
                <td className="r"><div className="px-num" style={{ fontSize: 13 }}>{pesos(r.m)}</div><div className="px-small">{r.f}</div></td>
                <td><span className="px-tag azul">{r.cat}</span></td>
                <td className="r">
                  <div className="fx g6" style={{ justifyContent: "flex-end" }}>
                    <button className="px-btn no pg-b" onClick={() => decidir(r, false)}>✕ Rechazar</button>
                    <button className="px-btn ok pg-b" onClick={() => decidir(r, true)}>✓ Aprobar</button>
                  </div>
                </td>
              </tr>
            ))}
            {pendientes.length === 0 && (
              <tr className="pg-empty">
                <td colSpan={5}>
                  Nada por revisar. <button className="pg-reset" onClick={reiniciar}>Volver a empezar</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="px-float" style={{ left: 26, right: 26, bottom: 22, padding: 0, overflow: "hidden" }}>
        <div className="fx ac g24" style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-1)" }}>
          <div><div className="px-ov">Programados · viernes</div><div className="px-num">{pesos(total)}</div></div>
          <div><div className="px-ov">Listos</div><div className="px-num" style={{ fontSize: 15 }}>{lote.length} de {lote.length}</div></div>
          <div><div className="px-ov">Pagados · 60 días</div><div className="px-num pos" style={{ fontSize: 15 }}>$1,282,548</div></div>
          <span className="px-btn pri" style={{ marginLeft: "auto", padding: "9px 14px", fontSize: 12 }}>Pagar lote</span>
        </div>
        {lote.slice(0, 3).map((l) => (
          <div key={l.id} className={"fx ac g12" + (l.id === ultimo ? " pg-in" : "")} style={{ padding: "9px 16px", borderBottom: "1px solid var(--border-1)" }}>
            <span className="px-check" />
            <div style={{ flex: 1 }}><div className="px-strong">{l.p}</div><div className="px-small">{l.c}</div></div>
            <span className="px-small">{l.cta}</span>
            <span className="px-tag mint">Con comprobante</span>
            <span className="px-num" style={{ fontSize: 13, minWidth: 96, textAlign: "right" }}>{pesos(l.m)}</span>
          </div>
        ))}
        {lote.length > 3 && (
          <div className="px-small" style={{ padding: "8px 16px" }}>
            + {lote.length - 3} pago{lote.length - 3 === 1 ? "" : "s"} más en el lote
          </div>
        )}
      </div>
    </Pantalla>
  );
}
