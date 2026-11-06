import { NextResponse, type NextRequest } from "next/server";

// Old demo URL `/?page_id=5` returns 410 (site-plan section 9).
export function middleware(request: NextRequest) {
  if (request.nextUrl.searchParams.get("page_id") === "5") {
    return new NextResponse("Gone", { status: 410 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
