import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  allowedQueryParams,
  sanitizedQueryParams
} from "./constants/queryParams";

const oldImageUrlRegex = /uploads\/(\d+)\/(\d+)\/(.*)/g;

export default function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;

  const oldImageUrl = nextUrl.pathname.match(oldImageUrlRegex);
  if (oldImageUrl) {
    return NextResponse.rewrite(
      new URL(
        oldImageUrl.join("/"),
        `https://${process.env.NEXT_PUBLIC_WP_API_DOMAIN}/wp-content/`
      )
    );
  }

  if (
    ![...nextUrl.searchParams.keys()].every(
      (queryParam) =>
        allowedQueryParams.has(queryParam) ||
        (sanitizedQueryParams.has(queryParam) &&
          nextUrl.searchParams.get(queryParam) !== null &&
          nextUrl.pathname.includes(nextUrl.searchParams.get(queryParam) ?? ""))
    )
  ) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

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
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico).*)"
  ]
};
