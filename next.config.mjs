/** @type {import('next').NextConfig} */
import { withExpo } from '@expo/next-adapter';

const nextConfig = withExpo({
  reactStrictMode: true, // Habilitar el modo estricto de React
  transpilePackages: ['react-native', 'react-native-web', 'expo'], // Transpila dependencias nativas
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web', // Redirigir react-native a react-native-web
    };
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|mp4|mp3|m4a|aac|oga|ttf|woff2?|eot)$/, // Reglas para archivos multimedia y fuentes
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
      },
    });
    return config;
  },
});

export default nextConfig;
