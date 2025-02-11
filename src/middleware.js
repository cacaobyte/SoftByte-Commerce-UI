import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Redirige desde la raíz a /Home/welcome
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/Home/welcome', request.url));
  }

  // Verifica el token para las rutas protegidas
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    console.log('Token no encontrado, redirigiendo al login...');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  console.log('Token encontrado, permitiendo acceso');
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/Inventory/:path*', '/product/:path*', '/support/:path*', '/Home/:path*'],
};
