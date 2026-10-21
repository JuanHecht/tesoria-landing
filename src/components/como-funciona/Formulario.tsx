"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";

// Mismo Formspree que /contact; "origen" distingue de dónde llegó el contacto.
const FORMSPREE = "https://formspree.io/f/xanldrvn";

export type Tipo = "demo" | "escribir";

const TIPOS: { k: Tipo; t: string; d: string }[] = [
  { k: "demo", t: "Quiero una demo", d: "30 minutos, con tus números" },
  { k: "escribir", t: "Prefiero que me escriban", d: "Primero platicamos tu caso" },
];

export function Formulario({ tipo: tipoInicial, onClose }: { tipo: Tipo; onClose: () => void }) {
  const [tipo, setTipo] = useState<Tipo>(tipoInicial);
  const [datos, setDatos] = useState({ nombre: "", empresa: "", email: "", telefono: "", mensaje: "" });
  const [estado, setEstado] = useState<"listo" | "enviando" | "ok" | "error">("listo");

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
          _subject: `Cómo funciona · ${tipo === "demo" ? "demo" : "contacto"} · ${datos.empresa || datos.nombre}`,
        }),
      });
      if (!r.ok) throw new Error(String(r.status));
      track("como_funciona_enviado", { tipo });
      setEstado("ok");
    } catch {
      setEstado("error");
    }
  };

  return (
    <div className="fm-back" data-lenis-prevent onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="fm-t">
      <div className="fm" onClick={(e) => e.stopPropagation()}>
        <button className="fm-x" onClick={onClose} aria-label="Cerrar">×</button>
        {estado === "ok" ? (
          <div className="fm-ok">
            <b>Listo, ya nos llegó.</b>
            <p>Te escribimos pronto.</p>
            <button className="fm-send" onClick={onClose} style={{ marginTop: 16 }}>Cerrar</button>
          </div>
        ) : (
          <form onSubmit={enviar}>
            <h3 id="fm-t">Platiquemos</h3>
            <p>Déjanos tus datos y te contactamos.</p>
            <div className="fm-tipo">
              {TIPOS.map((t) => (
                <button type="button" key={t.k} className={tipo === t.k ? "on" : ""} onClick={() => setTipo(t.k)}>
                  {t.t}
                  <small>{t.d}</small>
                </button>
              ))}
            </div>
            <div className="fm-row">
              <label>Nombre<input name="nombre" value={datos.nombre} onChange={cambiar} required autoComplete="name" /></label>
              <label>Empresa<input name="empresa" value={datos.empresa} onChange={cambiar} required autoComplete="organization" /></label>
            </div>
            <div className="fm-row">
              <label>Correo<input type="email" name="email" value={datos.email} onChange={cambiar} required autoComplete="email" /></label>
              <label><div>Teléfono <span>(opcional)</span></div><input type="tel" name="telefono" value={datos.telefono} onChange={cambiar} autoComplete="tel" /></label>
            </div>
            <label>
              <div>¿Qué te gustaría resolver? <span>(opcional)</span></div>
              <textarea name="mensaje" rows={3} value={datos.mensaje} onChange={cambiar} />
            </label>
            <button className="fm-send" type="submit" disabled={estado === "enviando"}>
              {estado === "enviando" ? "Enviando…" : "Enviar"}
            </button>
            {estado === "error" && <p className="fm-err">No se pudo enviar. Intenta otra vez en un momento.</p>}
          </form>
        )}
      </div>
    </div>
  );
}
