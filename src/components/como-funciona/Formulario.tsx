"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { TEXTOS } from "../inicio/textos";
import { useTextos } from "./textos";

// Mismo Formspree que /contact; "origen" distingue de dónde llegó el contacto.
const FORMSPREE = "https://formspree.io/f/xanldrvn";

export type Tipo = "demo" | "escribir";

export function Formulario({ tipo: tipoInicial, onClose }: { tipo: Tipo; onClose: () => void }) {
  const [tipo, setTipo] = useState<Tipo>(tipoInicial);
  const [datos, setDatos] = useState({ nombre: "", empresa: "", email: "", telefono: "", mensaje: "" });
  const [estado, setEstado] = useState<"listo" | "enviando" | "ok" | "error">("listo");
  const { lang } = useTextos();
  const t = TEXTOS[lang].form;

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const cambiar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDatos({ ...datos, [e.target.name]: e.target.value });

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("enviando");
    try {
      const r = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...datos,
          tipo: tipo === "demo" ? "Quiere demo" : "Quiere que le escriban",
          origen: "como-funciona",
          idioma: lang,
          _subject: `Cómo funciona${lang === "en" ? " (EN)" : ""} · ${tipo === "demo" ? "demo" : "contacto"} · ${datos.empresa || datos.nombre}`,
        }),
      });
      if (!r.ok) throw new Error(String(r.status));
      track("como_funciona_enviado", { tipo, lang });
      setEstado("ok");
    } catch {
      setEstado("error");
    }
  };

  return (
    <div className="fm-back" data-lenis-prevent onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="fm-t">
      <div className="fm" onClick={(e) => e.stopPropagation()}>
        <button className="fm-x" onClick={onClose} aria-label={t.cerrar}>×</button>
        {estado === "ok" ? (
          <div className="fm-ok">
            <b>{t.ok[0]}</b>
            <p>{t.ok[1]}</p>
            <button className="fm-send" onClick={onClose} style={{ marginTop: 16 }}>{t.cerrar}</button>
          </div>
        ) : (
          <form onSubmit={enviar}>
            <h3 id="fm-t">{t.titulo}</h3>
            <p>{t.sub}</p>
            <div className="fm-tipo">
              {(["demo", "escribir"] as const).map((k) => (
                <button type="button" key={k} className={tipo === k ? "on" : ""} onClick={() => setTipo(k)}>
                  {t.tipos[k][0]}
                  <small>{t.tipos[k][1]}</small>
                </button>
              ))}
            </div>
            <div className="fm-row">
              <label>{t.nombre}<input name="nombre" value={datos.nombre} onChange={cambiar} required autoComplete="name" /></label>
              <label>{t.empresa}<input name="empresa" value={datos.empresa} onChange={cambiar} required autoComplete="organization" /></label>
            </div>
            <div className="fm-row">
              <label>{t.correo}<input type="email" name="email" value={datos.email} onChange={cambiar} required autoComplete="email" /></label>
              <label><div>{t.telefono} <span>{t.opcional}</span></div><input type="tel" name="telefono" value={datos.telefono} onChange={cambiar} autoComplete="tel" /></label>
            </div>
            <label>
              <div>{t.mensaje} <span>{t.opcional}</span></div>
              <textarea name="mensaje" rows={3} value={datos.mensaje} onChange={cambiar} />
            </label>
            <button className="fm-send" type="submit" disabled={estado === "enviando"}>
              {estado === "enviando" ? t.enviando : t.enviar}
            </button>
            {estado === "error" && <p className="fm-err">{t.error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
