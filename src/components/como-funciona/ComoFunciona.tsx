"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import "./como-funciona.css";
import { Grafica } from "./Grafica";
import { Fuentes } from "./Fuentes";
import { Cobranza } from "./Cobranza";
import { Pagos } from "./Pagos";
import { Flujo } from "./Flujo";
import { Escenario } from "./Escenario";
import { Formulario, type Tipo } from "./Formulario";
import { corta, fechaDe, larga } from "./util";

const prev = (c: string) => ({ "--prev": `var(--${c})` }) as React.CSSProperties;

const CAPITULOS = [
  { id: "problema", t: "El problema" },
  { id: "entra", t: "Cobranza" },
  { id: "sale", t: "Pagos" },
  { id: "viene", t: "Flujo" },
  { id: "decide", t: "Escenarios" },
];

export function ComoFunciona({ hoy }: { hoy: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [js, setJs] = useState(false);
  const [cap, setCap] = useState("");
  const [tabla, setTabla] = useState(false);
  const [form, setForm] = useState<Tipo | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    setJs(true);
    const rv = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            rv.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    el.querySelectorAll(".fade,.grow").forEach((n) => rv.observe(n));
    // Al pasar de las fuentes a cobranza la pantalla "se pinta": una cortina morada se retira.
    const pinta = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            pinta.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -30% 0px" }
    );
    el.querySelectorAll(".pinta").forEach((n) => pinta.observe(n));
    const sec = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          setCap(e.target.getAttribute("data-ch") || "");
        }),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    el.querySelectorAll("[data-ch]").forEach((n) => sec.observe(n));
    return () => {
      rv.disconnect();
      pinta.disconnect();
      sec.disconnect();
    };
  }, []);

  const abrir = useCallback((tipo: Tipo, desde: string) => {
    track("como_funciona_cta", { tipo, desde });
    setForm(tipo);
  }, []);
  const cerrar = useCallback(() => setForm(null), []);

  const iCap = CAPITULOS.findIndex((c) => c.id === cap);
  const ctas = (desde: string) => (
    <div className="v-ctas">
      <button className="v-btn" onClick={() => abrir("demo", desde)}>Agendar demo</button>
      <button className="v-btn line" onClick={() => abrir("escribir", desde)}>Platícanos tu caso</button>
    </div>
  );

  return (
    <div className={"cf" + (js ? " js" : "")} ref={root}>
      <div className="v-top" data-ch="">
        <div className="v-in">
          <nav className="v-nav">
            <Link className="v-logo" href="/"><img src="/como-funciona/mark-white.svg" alt="" />TESORIA</Link>
            <div className="v-links">
              <Link className="home" href="/">Inicio</Link>
              {CAPITULOS.slice(1).map((c) => <a key={c.id} href={"#" + c.id}>{c.t}</a>)}
            </div>
            <button className="v-btn sm" onClick={() => abrir("demo", "nav")}>Agendar demo</button>
          </nav>
          <header className="v-hero">
            <div className="v-ov">Tesorería para empresas</div>
            <h1 className="v-h1">¿Cuánto dinero vas a tener el <em>{larga(fechaDe(hoy, 91))}</em>?</h1>
            <div className="v-row">
              <p className="v-lead">
                No es una proyección inventada. La respuesta <b>ya está en tu empresa</b>: en lo que facturaste, en lo que te
                facturaron y en lo que tienes por cobrar y por pagar. Solo falta ponerlo en orden. Tesoria lo hace todos los días.
              </p>
              {ctas("hero")}
            </div>
            <div className="v-chart"><Grafica hoy={hoy} tono="oscuro" bajo /></div>
            <div className="v-note">Ejemplo con datos ficticios. La gráfica siempre arranca hoy y mira 13 semanas adelante.</div>
          </header>
        </div>
      </div>

      <section className="ch c-cream fu-sec" id="problema" data-ch="problema">
        <Fuentes />
      </section>

      <section className="ch pinta c-white" id="entra" style={prev("tesoria-purple")} data-ch="entra">
        <div className="v-in v-feat">
          <div className="v-txt fade">
            <div className="v-ov v-num"><i>01</i>Lo que entra · cobranza</div>
            <h2 className="v-h2">Sabes quién te pagó, sin buscarlo.</h2>
            <ul className="v-list">
              <li><span><b>Cada cliente te paga a su propia cuenta</b> dentro de Tesoria. El depósito llega con nombre.</span></li>
              <li><span><b>Se aplica solo a su factura.</b> Ves qué ya está cobrado y qué sigue pendiente.</span></li>
              <li><span><b>Ves quién se atrasó</b> antes de que te falte el dinero.</span></li>
            </ul>
          </div>
          <div className="grow d1"><Cobranza /></div>
        </div>
      </section>

      <section className="ch c-cream" id="sale" data-ch="sale">
        <div className="v-in v-feat rev">
          <div className="v-txt fade">
            <div className="v-ov v-num"><i>02</i>Lo que sale · pagos</div>
            <h2 className="v-h2">Pagas desde Tesoria lo que aprobaste.</h2>
            <ul className="v-list">
              <li><span><b>Las facturas de tus proveedores llegan solas</b> y alguien las aprueba antes de pagarse.</span></li>
              <li><span><b>Eliges el día y pagas el lote</b> desde Tesoria, sin entrar al portal del banco.</span></li>
              <li><span><b>Cada pago sale con su comprobante</b> y nace conciliado con su factura.</span></li>
            </ul>
            <div className="v-try">Pruébalo: aprueba una factura y mira cómo entra al lote.</div>
          </div>
          <div className="grow d1"><Pagos /></div>
        </div>
      </section>

      <section className="ch c-white" id="viene" data-ch="viene">
        <div className="v-in">
          <div className="fade">
            <div className="v-ov v-num"><i>03</i>Lo que viene · flujo</div>
            <h2 className="v-h2" style={{ maxWidth: 860 }}>Tus próximas 13 semanas salen de una suma, no de un supuesto.</h2>
            <p className="v-p">
              Lo que ya tienes, más lo que te van a pagar, menos lo que vas a pagar. Lo facturado y también lo que todavía no es
              factura: pedidos, órdenes de compra y presupuesto. Cada lunes se recorre solo.
            </p>
          </div>
          <div className="v-eq">
            <div className="v-cell grow"><div className="v-k">Hoy en bancos</div><div className="v-big">$19.2 M</div><div className="v-cap">todas tus cuentas</div></div>
            <div className="v-op fade d1">+</div>
            <div className="v-cell grow d1"><div className="v-k">Por cobrar</div><div className="v-big pos">$38.6 M</div><div className="v-cap">facturas emitidas, pedidos y presupuesto de ventas</div></div>
            <div className="v-op fade d1">−</div>
            <div className="v-cell grow d2"><div className="v-k">Por pagar</div><div className="v-big neg">$43.4 M</div><div className="v-cap">facturas, órdenes de compra, nómina e impuestos</div></div>
            <div className="v-op fade d2">=</div>
            <div className="v-cell res grow d2"><div className="v-k">El {corta(fechaDe(hoy, 91))}</div><div className="v-big">$14.4 M</div><div className="v-cap">y tu punto más bajo, semana por semana</div></div>
          </div>
          <div className="v-tgl">
            <button onClick={() => setTabla(!tabla)}>{tabla ? "Ocultar tabla" : "Ver semana por semana"}</button>
            <span>La misma suma, como la ves en Excel.</span>
          </div>
          {tabla && <div className="v-tbl"><Flujo hoy={hoy} /></div>}
        </div>
      </section>

      <section className="ch c-purple" id="decide" data-ch="decide">
        <div className="v-in">
          <div className="fade">
            <div className="v-ov v-num"><i>04</i>Para decidir · escenarios</div>
            <h2 className="v-h2">Prueba la decisión antes de tomarla.</h2>
            <p className="v-p" style={{ maxWidth: 760 }}>
              Junta los cambios que quieras: que cobres 10 % menos, que suba la renta, pagar hoy lo vencido. Tesoria te dice
              cuánto se mueve tu punto más bajo.
            </p>
          </div>
          <div className="grow d1" style={{ marginTop: 40 }}><Escenario hoy={hoy} /></div>
        </div>
      </section>

      <section className="ch c-white" data-ch="">
        <div className="v-in">
          <div>
            <div className="v-ov">Cómo arranca</div>
            <h2 className="v-h2">No cambias de sistema. Sumas una cuenta operativa.</h2>
          </div>
          <div className="v-steps grow d1">
            <div className="v-step"><i>01</i><h4>Conectamos tu ERP y el SAT</h4><p>Tus facturas y tus cuentas por pagar y por cobrar entran solas.</p></div>
            <div className="v-step"><i>02</i><h4>Abrimos tu cuenta operativa</h4><p>Desde ahí cobras y pagas, y todo nace conciliado.</p></div>
            <div className="v-step"><i>03</i><h4>Ves tu flujo</h4><p>Subes tus otros bancos y tienes tus próximas 13 semanas, al día.</p></div>
          </div>
        </div>
      </section>

      <section className="ch v-end" id="agendar" data-ch="">
        <div className="v-in">
          <h2>La respuesta ya está en tu empresa.</h2>
          <p>En 30 minutos te enseñamos cómo se vería tu flujo con Tesoria.</p>
          {ctas("cierre")}
          <div className="v-foot">
            <Link className="v-logo" href="/" style={{ fontSize: 13 }}>
              <img src="/como-funciona/mark-white.svg" alt="" style={{ width: 18 }} />TESORIA
            </Link>
            <Link href="/">← Volver a tesoria.ai</Link>
          </div>
        </div>
      </section>

      <nav className={"v-pill" + (cap ? "" : " hide")} aria-label="Secciones">
        {CAPITULOS.map((c, i) => (
          <a key={c.id} className={c.id === cap ? "on" : ""} href={"#" + c.id}>
            <i>0{i + 1}</i>
            {c.t}
          </a>
        ))}
        <span className="bar" style={{ width: `${((iCap + 1) / CAPITULOS.length) * 100}%` }} />
      </nav>

      {form && <Formulario tipo={form} onClose={cerrar} />}
    </div>
  );
}
