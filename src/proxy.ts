import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  // Izinkan login dan register admin tanpa session
if (
  request.nextUrl.pathname.startsWith("/admin/login") ||
  request.nextUrl.pathname.startsWith("/admin/register")
) {
  return NextResponse.next();
}

  if (request.nextUrl.pathname.startsWith("/admin") && !session) {
    const loginUrl = new URL("/admin/login", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};