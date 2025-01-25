"use client"; // Esto convierte el componente en un Client Component

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-cyan-500 dark:text-cyan-300 mb-4">
        ¡Bienvenido a SoftByte Commerce!
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        La mejor solución para gestionar tu comercio de forma eficiente y moderna. prueba con dirección ip correcta
      </p>
      <button
        className="px-6 py-3 bg-cyan-500 dark:bg-cyan-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-cyan-600 dark:hover:bg-cyan-700 transition-all duration-200"
        onClick={() => alert('¡Botón de acción presionado!')}
      >
        Comenzar
      </button>
    </div>
  );
}
