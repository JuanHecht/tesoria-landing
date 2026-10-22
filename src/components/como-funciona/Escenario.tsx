"use client";

import { Grafica } from "./Grafica";
import { useTextos } from "./textos";

const ICONOS = [
  { i: "%", k: "v" },
  { i: "↑", k: "l" },
  { i: "⇄", k: "a" },
];

export function Escenario({ hoy }: { hoy: string }) {
  const t = useTextos().escenario;
  return (
    <div className="es">
      <div className="px-top">
        <img src="/como-funciona/mark-purple.svg" alt="" />
        <span className="px-crumb">{t.crumb[0]} / <b>{t.crumb[1]}</b></span>
      </div>
      <div className="es-in">
        <div className="es-main">
          <Grafica hoy={hoy} modo="escenario" />
        </div>
        <div className="es-side">
          <div className="px-ov" style={{ margin: 0 }}>{t.n}</div>
          {t.cambios.map(([titulo, d], j) => (
            <div key={titulo} className="es-cam">
              <span className={"es-ico " + ICONOS[j].k}>{ICONOS[j].i}</span>
              <div><div className="px-strong">{titulo}</div><div className="px-small">{d}</div></div>
            </div>
          ))}
          <div className="es-add">{t.agregar}</div>
          <div className="es-btns">
            <span className="px-btn sec">{t.descartar}</span>
            <span className="px-btn pri">{t.guardar}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
