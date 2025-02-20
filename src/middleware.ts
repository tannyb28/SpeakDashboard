// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Check if token exists in the cookies
  const token = req.cookies.get('peakspeak-token');

  // If there's no token and the user is accessing a protected route (like /dashboard), redirect to login
  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Specify the routes you want to protect (in this case, only /dashboard)
export const config = {
  matcher: ['/dashboard'],
};
