/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Genera una salida estática para Android/iOS y Cloudflare Pages
  trailingSlash: true, // Asegura compatibilidad con rutas
  images: {
    unoptimized: true, // Desactiva la optimización de imágenes
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Home/welcome',
        permanent: true,
      },
      {
        source: '/auth/login',
        has: [{ type: 'cookie', key: 'token' }],
        destination: '/Home/welcome',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
