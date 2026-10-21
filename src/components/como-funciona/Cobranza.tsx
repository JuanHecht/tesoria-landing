"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pantalla } from "./Pantalla";
import { sinMovimiento, useVisto } from "./util";

const DEPOSITOS = [
  { f: "04 sep", d: "Abono SPEI · cuenta clave ····0017", ref: "Ref. 0004521 · Sucursal Norte", c: "Cadena de Tiendas del Pacífico", rfc: "CTP170301LL2", cat: "Ventas · Retail", t: "azul", m: "+$142,929.39" },
  { f: "04 sep", d: "Abono SPEI · cuenta clave ····0009", ref: "Ref. 0004520 · Pago factura GCM-2026-09", c: "Grupo Comercial Monterrey S.A.", rfc: "GCM190201RR8", cat: "Ventas · Mayoreo", t: "lila", m: "+$326,363.83" },
  { f: "03 sep", d: "Abono SPEI · cuenta clave ····0021", ref: "Ref. 0004518 · Exportación lote 44", c: "Exportadora del Bajío", rfc: "EXB110812QW3", cat: "Ventas · Exportación", t: "mint", m: "+$88,410.00" },
  { f: "03 sep", d: "Abono SPEI · cuenta clave ····0004", ref: "Ref. 0004517", c: "Constructora Reforma S.A. de C.V.", rfc: "CRE140901001", cat: "Ventas · Proyectos", t: "lila", m: "+$57,200.00" },
  { f: "02 sep", d: "Abono SPEI · cuenta clave ····0017", ref: "Ref. 0004512 · Sucursal Norte", c: "Cadena de Tiendas del Pacífico", rfc: "CTP170301LL2", cat: "Ventas · Retail", t: "azul", m: "+$150,047.64" },
];
const N = DEPOSITOS.length;
const FIN = N + 3;

export function Cobranza() {
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
      <Pantalla crumb={<>Bancos / <b>Transacciones</b></>}>
        <div className="px-body" style={{ paddingBottom: 84 }}>
          <div className="fx ac jb">
            <h3 className="px-h">Bancos</h3>
            <button className="cb-again" onClick={play}>↻ Ver otra vez</button>
          </div>
          <p className="px-sub">Cada depósito llega con el nombre de quien pagó.</p>
          <div className="px-chips">
            <span className="px-chip">1 – 30 sep</span>
            <span className="px-chip on">Cuenta: Cobranza SPEI</span>
            <span className="px-chip">Todas las categorías</span>
            <span className="px-meta">
              {58 + Math.min(N, paso)} movimientos · {58 + identificados} identificados · 0 por clasificar
            </span>
          </div>
          <div className="px-card px-kpis">
            <div className="fx ac g12">
              <span className="px-badge">SPEI</span>
              <div>
                <div className="px-strong">Cobranza SPEI</div>
                <div className="px-small">Cuentas clave por cliente · 118 activas</div>
              </div>
            </div>
            <div><div className="px-ov">Entradas · sep</div><div className="px-num pos">+$1,284,552.08</div></div>
            <div><div className="px-ov">Barrida diaria</div><div className="px-num">−$1,284,552.08</div></div>
            <div><div className="px-ov">Saldo final</div><div className="px-num">$0.00</div></div>
            <span className="px-ok">● Al día</span>
          </div>
          <table className="px-table">
            <thead>
              <tr><th>Fecha</th><th>Descripción</th><th>Cliente</th><th>Categoría</th><th className="r">Monto</th></tr>
            </thead>
            <tbody>
              {DEPOSITOS.map((r, i) => {
                const k = N - 1 - i;
                const visible = paso > k;
                const ok = paso > k + 2;
                return (
                  <tr key={i} className={"cb-r" + (visible ? "" : " wait") + (visible && !ok ? " cb-new" : "")}>
                    <td className="px-mono">{r.f}</td>
                    <td><div>{r.d}</div><div className="px-small">{r.ref}</div></td>
                    <td><div className="px-strong">{ok ? r.c : "—"}</div><div className="px-small">{ok ? r.rfc : ""}</div></td>
                    <td><span className={"px-tag " + (ok ? r.t : "gris")}>{ok ? r.cat : "Identificando…"}</span></td>
                    <td className="r px-num pos" style={{ fontSize: 13 }}>{r.m}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-float" style={{ right: 22, bottom: 18, width: 380 }}>
          <div className="px-ov">Cuenta clave · Cadena de Tiendas del Pacífico</div>
          <div className="px-clabe">646 180 7432 0000 0017</div>
          <div className="fx g16" style={{ marginTop: 10 }}>
            <div><div className="px-ov">Abonos · sep</div><div className="px-num" style={{ fontSize: 14 }}>4 · $560,948.67</div></div>
            <div><div className="px-ov">Aplicados</div><div className="px-num" style={{ fontSize: 14 }}>4 de 4</div></div>
            <div><div className="px-ov">Por cobrar</div><div className="px-num" style={{ fontSize: 14 }}>$142,929.39</div></div>
          </div>
        </div>
      </Pantalla>
    </div>
  );
}
