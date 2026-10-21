"use client";

import { Grafica } from "./Grafica";

const CAMBIOS = [
  { i: "%", k: "v", t: "Cobros −10 %", d: "Clientes · todo el periodo" },
  { i: "↑", k: "l", t: "Renta de oficina +15 %", d: "A partir de enero" },
  { i: "⇄", k: "a", t: "Pagar vencidos esta semana", d: "3 proveedores · $1.2 M que iban en noviembre" },
];

export function Escenario({ hoy }: { hoy: string }) {
  return (
    <div className="es">
      <div className="px-top">
        <img src="/como-funciona/mark-purple.svg" alt="" />
        <span className="px-crumb">Flujo de efectivo / <b>Escenario: trimestre apretado</b></span>
      </div>
      <div className="es-in">
        <div className="es-main">
          <Grafica hoy={hoy} modo="escenario" />
        </div>
        <div className="es-side">
          <div className="px-ov" style={{ margin: 0 }}>3 cambios en este escenario</div>
          {CAMBIOS.map((c) => (
            <div key={c.t} className="es-cam">
              <span className={"es-ico " + c.k}>{c.i}</span>
              <div><div className="px-strong">{c.t}</div><div className="px-small">{c.d}</div></div>
            </div>
          ))}
          <div className="es-add">+ Agregar cambio</div>
          <div className="es-btns">
            <span className="px-btn sec">Descartar</span>
            <span className="px-btn pri">Guardar escenario</span>
          </div>
        </div>
      </div>
    </div>
  );
}
