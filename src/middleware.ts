import { NextResponse, type NextRequest } from "next/server";

// "/" y "/como-funciona" tienen versión en inglés. Manda el idioma que la persona eligió con el botón ES/EN
// (cookie "lang"); si nunca eligió, el de su navegador. Los bots no mandan Accept-Language, así que Google
// indexa las rutas en español y las de inglés por separado (hreflang).
const EN: Record<string, string> = { "/": "/en", "/como-funciona": "/en/how-it-works" };

export function middleware(req: NextRequest) {
  const elegido = req.cookies.get("lang")?.value;
  const navegador = (req.headers.get("accept-language") || "").split(",")[0].trim().toLowerCase();
  if ((elegido || navegador).startsWith("en")) {
    const url = req.nextUrl.clone();
    url.pathname = EN[req.nextUrl.pathname];
    return NextResponse.redirect(url, 307);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/", "/como-funciona"] };
