import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;

  const needsStripAndRedirect =
    nextUrl.searchParams.has("showDisqus") ||
    nextUrl.searchParams.has("el_dbe_page");

  if (needsStripAndRedirect) {
    nextUrl.searchParams.delete("showDisqus");
    nextUrl.searchParams.delete("el_dbe_page");

    return NextResponse.redirect(nextUrl, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};
