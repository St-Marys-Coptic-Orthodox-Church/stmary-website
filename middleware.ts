import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const auth = req.cookies.get("admin-auth")?.value;
  if (auth === process.env.ADMIN_SECRET) return NextResponse.next();

  const basic = req.headers.get("authorization");
  if (basic) {
    const [, encoded] = basic.split(" ");
    const decoded = Buffer.from(encoded, "base64").toString();
    const [, password] = decoded.split(":");
    if (password === process.env.ADMIN_SECRET) {
      const res = NextResponse.next();
      res.cookies.set("admin-auth", password, { httpOnly: true, sameSite: "strict" });
      return res;
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export const config = { matcher: ["/admin/:path*"] };
