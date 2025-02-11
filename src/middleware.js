import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Redirige desde la raíz a /Home/welcome
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/Home/welcome', request.url));
  }

  // Si ya tienes un token y tratas de ir a /auth/login, te redirige a Home
  if (token && pathname.startsWith('/auth/login')) {
    console.log('Usuario autenticado, redirigiendo a Home...');
    return NextResponse.redirect(new URL('/Home/welcome', request.url));
  }

  // Permite acceso a /auth/login si no tienes token
  if (!token && pathname.startsWith('/auth/login')) {
    console.log('No autenticado, mostrando pantalla de login.');
    return NextResponse.next();
  }

  // Verifica el token para las rutas protegidas
  if (!token) {
    console.log('Token no encontrado, redirigiendo al login...');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  console.log('Token encontrado, permitiendo acceso');
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/Inventory/:path*', '/product/:path*', '/support/:path*', '/Home/:path*', '/auth/login'],
};
