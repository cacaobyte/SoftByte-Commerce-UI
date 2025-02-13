import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isPlatform } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import LoadingScreen from "../components/UseHasMounted/LoadingScreen";

const ProtectedPage = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      let token = null;

      if (isPlatform('hybrid')) {
        const result = await Preferences.get({ key: 'token' });
        token = result.value;
      } else {
        token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
      }

      if (!token) {
        router.push('/auth/login');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <LoadingScreen message="Verificando sesión..." />;
  }

  return <>{children}</>;
};

export default ProtectedPage;
