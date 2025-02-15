import { isPlatform } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';

let cachedToken = null; // Token almacenado en memoria
export const getToken = async () => {
  if (!cachedToken) {
    if (isPlatform('hybrid')) {
      const result = await Preferences.get({ key: 'token' });
      cachedToken = result.value || '';
    } else {
      cachedToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1] || '';
    }
  }
  return cachedToken;
};


export const getHeaders = async () => {
  if (!cachedToken) {
    if (isPlatform('hybrid')) {
      // Recuperar el token desde Capacitor Preferences para móviles (iOS/Android)
      const result = await Preferences.get({ key: 'token' });
      cachedToken = result.value || '';
    } else {
      // Recuperar el token desde cookies para web
      cachedToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1] || '';
    }
  }

  // Retorna el encabezado con el token obtenido
  return {
    'Content-Type': 'application/json',
    Token: cachedToken, // Token como se espera en tu backend
  };
};
