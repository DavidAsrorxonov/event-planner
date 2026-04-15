import { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const { auth } = await import("@/lib/auth/server");
  return auth.middleware({ loginUrl: "/auth/sign-in" })(request);
}

export const config = {
  matcher: [
    /*
      Protect app pages, but skip:
      - api routes
      - Next.js internals
      - images/files
      - favicon
    */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
