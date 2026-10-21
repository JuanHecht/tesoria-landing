import { NextResponse, type NextRequest } from "next/server";

// Primera visita a "/" con el navegador en inglés → /en. Si la persona ya eligió idioma
// (cookie "lang", la pone el botón ES/EN) se respeta. Los bots no mandan Accept-Language,
// así que Google indexa "/" en español y "/en" en inglés por separado (hreflang).
export function middleware(req: NextRequest) {
  if (req.cookies.get("lang")) return NextResponse.next();
  const primero = (req.headers.get("accept-language") || "").split(",")[0].trim().toLowerCase();
  if (primero.startsWith("en")) {
    const url = req.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url, 307);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/"] };
