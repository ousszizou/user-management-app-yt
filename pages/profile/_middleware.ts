import { NextRequest, NextResponse } from "next/server";

import jwt from "@tsndr/cloudflare-worker-jwt";

const JWT_SECRET_KEY = "cc716f1a-c6fd-45f9-a7f1-f23ef1241bca";
const ROUTE_AUTH = "/login";
const SUPA_TOKEN = "sb-access-token";

/**
 * Verifies the user's JWT token and continues with the chain of middlewares, if user is not authenticated, redirects to login page
 */
export async function middleware(req: NextRequest) {
  const token = req.cookies[SUPA_TOKEN];

  if (!token || !(await jwt.verify(token, JWT_SECRET_KEY))) {
    const url = req.nextUrl.clone();
    url.pathname = ROUTE_AUTH;
    return NextResponse.redirect(url, 302);
  }
  // continue the middleware chain
  return NextResponse.next();
}
