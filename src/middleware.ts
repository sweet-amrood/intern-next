import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "internee_session";

function getSecret() {
  const secret = process.env.AUTH_SECRET || "internee-dev-secret-change-me";
  return new TextEncoder().encode(secret);
}

type SessionInfo = {
  valid: boolean;
  roles: Array<"student" | "admin">;
};

async function readSession(request: NextRequest): Promise<SessionInfo> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return { valid: false, roles: [] };
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const fromArr = Array.isArray(payload.roles)
      ? payload.roles.filter((r): r is "student" | "admin" => r === "student" || r === "admin")
      : [];
    if (fromArr.length) return { valid: true, roles: Array.from(new Set(fromArr)) };
    if (payload.role === "admin") return { valid: true, roles: ["admin"] };
    return { valid: true, roles: ["student"] };
  } catch {
    return { valid: false, roles: [] };
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await readSession(request);
  const isAdmin = session.roles.includes("admin");
  const isStudent = session.roles.includes("student");
  const both = isAdmin && isStudent;

  if (pathname.startsWith("/admin")) {
    if (!session.valid) {
      const url = request.nextUrl.clone();
      url.pathname = "/sign-in";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (!isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (!session.valid) {
      const url = request.nextUrl.clone();
      url.pathname = "/sign-in";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (!isStudent && isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.includes("/apply") && !pathname.endsWith("/success") && !session.valid) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if ((pathname === "/sign-in" || pathname === "/sign-up") && session.valid) {
    if (both) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.search = "";
      return NextResponse.redirect(url);
    }
    const next = request.nextUrl.searchParams.get("next");
    const url = request.nextUrl.clone();
    if (next && next.startsWith("/admin") && isAdmin) {
      url.pathname = next;
    } else if (next && next.startsWith("/") && !next.startsWith("/admin") && isStudent) {
      url.pathname = next;
    } else {
      url.pathname = isAdmin ? "/admin" : "/dashboard";
    }
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
    "/internship/:slug/apply",
    "/internship/:slug/apply/success",
  ],
};
