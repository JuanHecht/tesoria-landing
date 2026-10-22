"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import "./inicio-a.css";
import { TEXTOS, type Lang } from "./textos";
import { FormularioInicio, type Tipo } from "./FormularioInicio";

const APP = "https://app.tesoria.ai";

// Flujo de ejemplo: 3 semanas pasadas + 13 futuras, en millones. Termina en 14.4.
const FLUJO = [24.8, 22.0, 19.2, 18.6, 16.4, 17.1, 16.8, 17.1, 16.2, 16.1, 16.4, 19.0, 19.4, 17.2, 14.0, 14.4];

function trazo() {
  const X = (i: number) => (i / (FLUJO.length - 1)) * 1440;
  const Y = (v: number) => 400 - ((v - 10) / 17) * 400;
  const p = FLUJO.map((v, i) => [X(i), Y(v)]);
  let d = `M${p[0][0]},${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] || p[i], b = p[i], c = p[i + 1], e = p[i + 2] || c;
    const n = (v: number) => v.toFixed(1);
    d += ` C${n(b[0] + (c[0] - a[0]) / 6)},${n(b[1] + (c[1] - a[1]) / 6)} ${n(c[0] - (e[0] - b[0]) / 6)},${n(c[1] - (e[1] - b[1]) / 6)} ${n(c[0])},${n(c[1])}`;
  }
  return d;
}
const D = trazo();

// "hoy" llega del servidor como YYYY-MM-DD (hora de CDMX) para que servidor y cliente pinten lo mismo.
function fecha(hoy: string, masDias: number, locale: string) {
  const d = new Date(hoy + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + masDias);
  return d.toLocaleDateString(locale, { day: "numeric", month: "short", timeZone: "UTC" }).replace(".", "");
}

export function InicioA({ hoy, lang }: { hoy: string; lang: Lang }) {
  const t = TEXTOS[lang];
  const [form, setForm] = useState<Tipo | null>(null);
  const hoyC = fecha(hoy, 0, t.locale);
  const fin = fecha(hoy, 91, t.locale);
  const otro: Lang = lang === "es" ? "en" : "es";
  const como = lang === "es" ? "/como-funciona" : "/en/how-it-works";

  // El layout raíz declara lang="es"; en /en lo corregimos para lectores de pantalla y traductores.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const abrir = useCallback(
    (tipo: Tipo, desde: string) => {
      track("inicio_cta", { tipo, desde, lang });
      setForm(tipo);
    },
    [lang]
  );
  const cerrar = useCallback(() => setForm(null), []);
  const recordar = () => {
    document.cookie = `lang=${otro}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div className="ia">
      <div className="ia-line" aria-hidden="true">
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path className="ia-path" d={D} vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="ia-in">
        <nav className="ia-nav">
          <Link className="ia-logo" href={lang === "es" ? "/" : "/en"}>
            <img src="/como-funciona/mark-purple.svg" alt="" />
            TESORIA<sup>®</sup>
          </Link>
          <Link className="ia-link" href={como}>{t.nav.como}</Link>
          <Link className="ia-lang" href={otro === "es" ? "/" : "/en"} onClick={recordar} hrefLang={otro} aria-label={otro === "en" ? "English" : "Español"}>
            {otro.toUpperCase()}
          </Link>
          <a className="ia-btn line" href={APP} onClick={() => track("inicio_ingresar", { lang })}>{t.nav.ingresar}</a>
          <button className="ia-btn demo" onClick={() => abrir("demo", "nav")}>{t.nav.demo}</button>
        </nav>
      </div>

      <main className="ia-in ia-hero">
        <div className="ia-ov"><span className="ia-dot" />{t.ov(hoyC, fin)}</div>
        <h1 className="ia-h1">
          <span>{t.h1[0]}</span>
          <span className="ia-out">{t.h1[1]}</span>
        </h1>
        <div className="ia-tag">
          <small>{t.tag(fin)}</small>
          <b>$14,400,000{t.moneda && <i>{t.moneda}</i>}</b>
        </div>
        <div className="ia-row">
          <p className="ia-lead">{t.lead[0]}<b>{t.lead[1]}</b>{t.lead[2]}</p>
          <div className="ia-ctas">
            <button className="ia-btn big" onClick={() => abrir("demo", "hero")}>{t.ctas.demo}</button>
            <Link className="ia-btn big line" href={como} onClick={() => track("inicio_como_funciona", { lang })}>
              {t.ctas.como} <span className="ia-arr">→</span>
            </Link>
          </div>
        </div>
      </main>

      <div className="ia-in">
        <footer className="ia-foot">
          <span>{t.foot.legal}</span>
          <nav>
            <Link href="/privacy">{t.foot.privacidad}</Link>
            <Link href="/terms">{t.foot.terminos}</Link>
            <a href="https://www.linkedin.com/company/tesoria" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/tesoria.ai/" target="_blank" rel="noreferrer">Instagram</a>
          </nav>
        </footer>
      </div>

      {form && <FormularioInicio tipo={form} lang={lang} onClose={cerrar} />}
    </div>
  );
}
