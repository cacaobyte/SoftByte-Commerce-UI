/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Indica que la salida será exportada como estática
    trailingSlash: true, // Asegura que todas las rutas terminen con una barra '/'
    images: {
      unoptimized: true, // Desactiva la optimización de imágenes, ya que no se usa en el modo exportado
    },
  };
  
  export default nextConfig;
  