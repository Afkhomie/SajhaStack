import { auth } from "@/lib/auth";

export default auth((req) => {
  // Add protected routes here
  // Example: if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard")) {
  //   return Response.redirect(new URL("/signin", req.nextUrl));
  // }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
