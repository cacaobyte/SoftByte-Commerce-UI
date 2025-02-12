import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/Home/welcome', request.url));
  }

  if (token && pathname.startsWith('/auth/login')) {
    return NextResponse.redirect(new URL('/Home/welcome', request.url));
  }

  if (!token && pathname.startsWith('/auth/login')) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/Inventory/:path*', '/product/:path*', '/support/:path*', '/Home/:path*', '/setting/:path*', '/auth/login'],
};
