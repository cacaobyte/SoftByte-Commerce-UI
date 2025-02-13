'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/react';

export default function AppWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      let token = null;

      try {
        if (isPlatform('hybrid')) {
          // Verifica token en Capacitor Storage para móviles
          const { value } = await Preferences.get({ key: 'token' });
          token = value;
        } else {
          // Verifica token en cookies para web
          token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1];
        }

        if (!token) {
          console.log('Token no encontrado, redirigiendo a /auth/login');
          router.replace('/auth/login'); // Reemplaza la ruta actual para evitar bucles de redirección
        } else {
          console.log('Token encontrado, acceso permitido');
        }
      } catch (error) {
        console.error('Error verificando el token:', error);
      } finally {
        setLoading(false); // Siempre aseguramos que loading pase a false
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div className="text-center mt-20">Cargando...</div>;
  }

  return <>{children}</>;
}
