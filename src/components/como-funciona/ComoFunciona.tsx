"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { track } from "@vercel/analytics";
import "./como-funciona.css";
import { Grafica } from "./Grafica";
import { Fuentes } from "./Fuentes";
import { Cobranza } from "./Cobranza";
import { Pagos } from "./Pagos";
import { Flujo } from "./Flujo";
import { Escenario } from "./Escenario";
import { Formulario, type Tipo } from "./Formulario";
import { corta, fechaDe, larga, sinMovimiento } from "./util";
import { IdiomaCtx, TEXTOS } from "./textos";
import type { Lang } from "../inicio/textos";

const prev = (c: string) => ({ "--prev": `var(--${c})` }) as React.CSSProperties;

const CAPITULOS = ["problema", "entra", "sale", "viene", "decide"] as const;

export function ComoFunciona({ hoy, lang = "es" }: { hoy: string; lang?: Lang }) {
  const t = TEXTOS[lang];
  const otro: Lang = lang === "es" ? "en" : "es";
  const root = useRef<HTMLDivElement>(null);
  const [js, setJs] = useState(false);
  const [cap, setCap] = useState("");
  const [tabla, setTabla] = useState(false);
  const [form, setForm] = useState<Tipo | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    setJs(true);
    // Scroll suave pero ágil en compu; el touch se queda nativo.
    const lenis = sinMovimiento() ? null : new Lenis({ autoRaf: true, anchors: true, lerp: 0.2, wheelMultiplier: 1.1 });
    const rv = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            rv.unobserve(e.target);
          }
        }),
      { threshold: 0, rootMargin: "0px 0px 6% 0px" }
    );
    el.querySelectorAll(".fade,.rv,.grow").forEach((n) => rv.observe(n));
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
      lenis?.destroy();
      sec.disconnect();
    };
  }, []);

  // El layout raíz declara lang="es"; en inglés lo corregimos para lectores de pantalla y traductores.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const abrir = useCallback(
    (tipo: Tipo, desde: string) => {
      track("como_funciona_cta", { tipo, desde, lang });
      setForm(tipo);
    },
    [lang]
  );
  const cerrar = useCallback(() => setForm(null), []);
  const recordar = () => {
    document.cookie = `lang=${otro}; path=/; max-age=31536000; samesite=lax`;
  };

  const iCap = CAPITULOS.indexOf(cap as (typeof CAPITULOS)[number]);
  const ctas = (desde: string) => (
    <div className="v-ctas">
      <button className="v-btn" onClick={() => abrir("demo", desde)}>{t.nav.demo}</button>
      <button className="v-btn line" onClick={() => abrir("escribir", desde)}>{t.nav.escribir}</button>
    </div>
  );

  return (
    <IdiomaCtx.Provider value={lang}>
      <div className={"cf" + (js ? " js" : "")} ref={root}>
        <div className="v-top" data-ch="">
          <div className="v-in">
            <nav className="v-nav">
              <Link className="v-logo" href={t.inicio}><img src="/como-funciona/mark-white.svg" alt="" />TESORIA</Link>
              <div className="v-links">
                <Link className="home" href={t.inicio}>{t.nav.inicio}</Link>
                {CAPITULOS.slice(1).map((c) => <a key={c} href={"#" + c}>{t.capitulos[c]}</a>)}
              </div>
              <Link className="v-lang" href={TEXTOS[otro].ruta} onClick={recordar} hrefLang={otro} aria-label={otro === "en" ? "English" : "Español"}>
                {otro.toUpperCase()}
              </Link>
              <button className="v-btn sm" onClick={() => abrir("demo", "nav")}>{t.nav.demo}</button>
            </nav>
            <header className="v-hero">
              <div className="v-ov">{t.hero.ov}</div>
              <h1 className="v-h1">{t.hero.h1[0]}<em>{larga(fechaDe(hoy, 91), t.locale)}</em>{t.hero.h1[1]}</h1>
              <div className="v-row">
                <p className="v-lead">
                  {t.hero.lead[0]}<b>{t.hero.lead[1]}</b>{t.hero.lead[2]}
                </p>
                {ctas("hero")}
              </div>
              <div className="v-chart"><Grafica hoy={hoy} tono="oscuro" bajo /></div>
              <div className="v-note">{t.hero.nota}</div>
            </header>
          </div>
        </div>

        <section className="ch c-cream fu-sec" id="problema" data-ch="problema">
          <Fuentes />
        </section>

        <section className="ch pinta c-white" id="entra" style={prev("tesoria-purple")} data-ch="entra">
          <div className="v-in v-feat">
            <div className="v-txt rv">
              <div className="v-ov v-num"><i>01</i>{t.entra.ov}</div>
              <h2 className="v-h2">{t.entra.h2}</h2>
              <ul className="v-list">
                {t.entra.li.map(([b, r]) => <li key={b}><span><b>{b}</b>{r}</span></li>)}
              </ul>
            </div>
            <div className="grow d1"><Cobranza /></div>
          </div>
        </section>

        <section className="ch c-cream" id="sale" data-ch="sale">
          <div className="v-in v-feat rev">
            <div className="v-txt rv">
              <div className="v-ov v-num"><i>02</i>{t.sale.ov}</div>
              <h2 className="v-h2">{t.sale.h2}</h2>
              <ul className="v-list">
                {t.sale.li.map(([b, r]) => <li key={b}><span><b>{b}</b>{r}</span></li>)}
              </ul>
              <div className="v-try">{t.sale.prueba}</div>
            </div>
            <div className="grow d1"><Pagos /></div>
          </div>
        </section>

        <section className="ch c-white" id="viene" data-ch="viene">
          <div className="v-in">
            <div className="fade">
              <div className="v-ov v-num"><i>03</i>{t.viene.ov}</div>
              <h2 className="v-h2" style={{ maxWidth: 860 }}>{t.viene.h2}</h2>
              <p className="v-p">{t.viene.p}</p>
            </div>
            <div className="v-eq">
              <div className="v-cell grow"><div className="v-k">{t.viene.hoy[0]}</div><div className="v-big">$19.2 M</div><div className="v-cap">{t.viene.hoy[1]}</div></div>
              <div className="v-op fade d1">+</div>
              <div className="v-cell grow d1"><div className="v-k">{t.viene.cobrar[0]}</div><div className="v-big pos">$38.6 M</div><div className="v-cap">{t.viene.cobrar[1]}</div></div>
              <div className="v-op fade d1">−</div>
              <div className="v-cell grow d2"><div className="v-k">{t.viene.pagar[0]}</div><div className="v-big neg">$43.4 M</div><div className="v-cap">{t.viene.pagar[1]}</div></div>
              <div className="v-op fade d2">=</div>
              <div className="v-cell res grow d2"><div className="v-k">{t.viene.fin(corta(fechaDe(hoy, 91), t.locale))}</div><div className="v-big">$14.4 M</div><div className="v-cap">{t.viene.finCap}</div></div>
            </div>
            <div className="v-tgl">
              <button onClick={() => setTabla(!tabla)}>{tabla ? t.viene.ocultar : t.viene.ver}</button>
              <span>{t.viene.excel}</span>
            </div>
            {tabla && <div className="v-tbl"><Flujo hoy={hoy} /></div>}
          </div>
        </section>

        <section className="ch c-purple" id="decide" data-ch="decide">
          <div className="v-in">
            <div className="rv">
              <div className="v-ov v-num"><i>04</i>{t.decide.ov}</div>
              <h2 className="v-h2">{t.decide.h2}</h2>
              <p className="v-p" style={{ maxWidth: 760 }}>{t.decide.p}</p>
            </div>
            <div className="grow d1" style={{ marginTop: 40 }}><Escenario hoy={hoy} /></div>
          </div>
        </section>

        <section className="ch c-white" data-ch="">
          <div className="v-in">
            <div>
              <div className="v-ov">{t.arranca.ov}</div>
              <h2 className="v-h2">{t.arranca.h2}</h2>
            </div>
            <div className="v-steps grow d1">
              {t.arranca.pasos.map(([h, p], i) => (
                <div key={h} className="v-step"><i>0{i + 1}</i><h4>{h}</h4><p>{p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="ch v-end" id="agendar" data-ch="">
          <div className="v-in">
            <h2>{t.cierre.h2}</h2>
            <p>{t.cierre.p}</p>
            {ctas("cierre")}
            <div className="v-foot">
              <Link className="v-logo" href={t.inicio} style={{ fontSize: 13 }}>
                <img src="/como-funciona/mark-white.svg" alt="" style={{ width: 18 }} />TESORIA
              </Link>
              <Link href={t.inicio}>{t.cierre.volver}</Link>
            </div>
          </div>
        </section>

        <nav className={"v-pill" + (cap ? "" : " hide") + (cap === "problema" ? " en-problema" : "")} aria-label={t.secciones}>
          {CAPITULOS.map((c, i) => (
            <a key={c} className={c === cap ? "on" : ""} href={"#" + c}>
              <i>0{i + 1}</i>
              {t.capitulos[c]}
            </a>
          ))}
          <span className="bar" style={{ width: `${((iCap + 1) / CAPITULOS.length) * 100}%` }} />
        </nav>

        {form && <Formulario tipo={form} onClose={cerrar} />}
      </div>
    </IdiomaCtx.Provider>
  );
}
