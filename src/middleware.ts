import { NextRequest, NextResponse } from "next/server";
import { routes } from "./config/routes";

const authRoutes = ["/auth/login"];

// This function checks if the user is authenticated
function isAuthenticated(req: NextRequest) {
  const token = req.cookies.get("isLoggedIn")?.value;
  return Boolean(token);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const userIsAuthenticated = isAuthenticated(req);

  // Check if the current route is in authRoutes
  const isAuthRoute = authRoutes.includes(pathname);

  // Redirect user to login if trying to access a protected route and not authenticated
  if (!isAuthRoute && !userIsAuthenticated) {
    return NextResponse.redirect(new URL(routes.auth.login, req.url));
  }

  // Redirect user to dashboard if trying to access auth route and authenticated
  if (isAuthRoute && userIsAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request to proceed if it doesn't match any special conditions
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except for the public files and API routes
    "/((?!_next|static|api|favicon.ico).*)",
  ],
};
