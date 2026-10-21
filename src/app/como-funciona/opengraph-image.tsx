import { ImageResponse } from "next/og";

export const alt = "¿Cuánto dinero vas a tener en 13 semanas? · Tesoria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#322659",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, fontWeight: 700, color: "#EFF6EE" }}>TESORIA</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
            ¿Cuánto dinero vas a tener en 13 semanas?
          </div>
          <div style={{ fontSize: 32, color: "#C9BAD3", marginTop: 28 }}>
            La respuesta ya está en tu empresa. Así funciona Tesoria.
          </div>
        </div>
        <div style={{ display: "flex", height: 10, width: 260, background: "#FFE7FF", borderRadius: 999 }} />
      </div>
    ),
    size
  );
}
