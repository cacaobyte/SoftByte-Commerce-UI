import React from "react";

const LoadingScreen = ({ message = "Cargando...", logoSrc = "/Logo_CacaoByte_S.A.png" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Logo */}
      <img
        src={logoSrc}
        alt="Cargando..."
        className="h-24 w-24 mb-6 shadow-lg rounded-full animate-pulse"
      />
      {/* Mensaje */}
      <p className="text-xl font-semibold text-gray-700">{message}</p>
      {/* Barra de progreso */}
      <div className="w-48 h-2 bg-gray-300 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-blue-500 animate-progress"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
