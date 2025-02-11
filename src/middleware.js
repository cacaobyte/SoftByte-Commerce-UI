import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    console.log('Token no encontrado, redirigiendo al login...');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  console.log('Token encontrado, permitiendo acceso');
  return NextResponse.next();
}

export const config = {
  matcher: ['/Inventory/:path*', '/product/:path*', '/support/:path*'],  // Ajusta según las rutas que deseas proteger
};
