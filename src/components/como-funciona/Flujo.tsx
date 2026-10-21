"use client";

import { Pantalla } from "./Pantalla";
import { corta, fechaDe } from "./util";

// Cuadra con la suma de la sección: 19.2 + 38.6 − 43.4 = 14.4 (millones).
const COBROS = [2.6, 2.4, 3.4, 2.9, 3.1, 2.5, 2.8, 3.0, 4.6, 3.2, 2.7, 2.3, 3.1];
const PAGOS = [3.2, 4.6, 2.7, 3.2, 2.8, 3.4, 2.9, 2.7, 2.0, 2.8, 4.9, 5.5, 2.7];
const r1 = (v: number) => Math.round(v * 10) / 10;

export function Flujo({ hoy }: { hoy: string }) {
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
    { n: "Saldo inicial", k: "", v: ini },
    { n: "Cobros · facturas emitidas", k: "op", v: cobF },
    { n: "Cobros · pedidos y presupuesto", k: "op", v: cobP },
    { n: "Pagos · facturas de proveedores", k: "fin", v: pagF, neg: true },
    { n: "Pagos · órdenes de compra", k: "fin", v: pagO, neg: true },
    { n: "Pagos · nómina e impuestos", k: "fin", v: pagN, neg: true },
    { n: "Saldo final", k: "tot", v: fin, low: true },
  ];

  return (
    <Pantalla ancho={1120} crumb={<>Reportes / <b>Flujo de efectivo</b></>}>
      <div className="px-body">
        <div className="fx ac jb" style={{ marginBottom: 14 }}>
          <div>
            <h3 className="px-h">Flujo de efectivo</h3>
            <p className="px-sub" style={{ margin: 0 }}>Millones de pesos · todas tus cuentas</p>
          </div>
          <div className="px-chips" style={{ margin: 0 }}>
            <span className="px-chip on">Próximas 13 semanas · se recorre sola</span>
            <span className="px-chip">Escenario: base</span>
          </div>
        </div>
        <table className="px-grid">
          <thead>
            <tr>
              <th>Concepto</th>
              {COBROS.map((_, i) => (
                <th key={i} className={i === 0 ? "hoy" : ""}>{i === 0 ? "Esta sem." : corta(fechaDe(hoy, lunes + 7 * i))}</th>
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
