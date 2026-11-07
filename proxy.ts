import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Preview hosts (*.vercel.app) must never be indexed, even after launch.
export function proxy(req: NextRequest) {
  // Old WordPress demo URL (site-plan 9): gone for good
  if (req.nextUrl.pathname === "/" && req.nextUrl.searchParams.get("page_id") === "5") {
    return new NextResponse("Gone", { status: 410 });
  }
  const res = NextResponse.next();
  if (req.nextUrl.hostname.endsWith(".vercel.app")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}

export const config = { matcher: "/:path*" };
