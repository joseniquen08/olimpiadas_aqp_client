import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const user = request.cookies.get('user');

  if (request.nextUrl.pathname == '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (token && user) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/login')) {
    if (token && user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next();
  }
}