// headers.js
export const getToken = () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    return token || '';
  };
  
  export const getHeaders = () => {
    const token = getToken();
    return {
      'Content-Type': 'application/json',
      Token: token, 
    };
  };
  