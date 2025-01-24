import React, { useState } from "react";
import { FaBars } from "react-icons/fa"; // Ícono de menú hamburguesa
import { IoMoon, IoSunny } from "react-icons/io5"; // Íconos de tema oscuro/claro

export default function Navbar({ toggleTheme, isDarkTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">Event Admin</div>

        {/* Botones de navegación */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-foreground hover:text-blue-500">
            Dashboard
          </a>
          <a href="/posts" className="text-foreground hover:text-blue-500">
            Posts
          </a>
          <a href="/categories" className="text-foreground hover:text-blue-500">
            Categories
          </a>
        </div>

        {/* Opciones: Tema y Menú Usuario */}
        <div className="flex items-center space-x-4">
          {/* Botón Tema Oscuro/Claro */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-foreground hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {isDarkTheme ? <IoSunny size={20} /> : <IoMoon size={20} />}
          </button>

          {/* Menú de Usuario */}
          <div className="relative group">
            <button className="p-2 rounded-full text-foreground hover:bg-gray-200 dark:hover:bg-gray-800">
              <FaBars size={20} />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-lg hidden group-hover:block">
              <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Dashboard
              </a>
              <a href="/account" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Mi Cuenta
              </a>
              <a href="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Configuración
              </a>
              <a href="/logout" className="block px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                Cerrar Sesión
              </a>
            </div>
          </div>
        </div>

        {/* Menú Hamburguesa (Mobile) */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={20} />
        </button>
      </nav>

      {/* Menú Responsive */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-gray-200 dark:border-gray-800">
          <a href="/" className="block px-4 py-2 text-foreground hover:bg-gray-200">
            Dashboard
          </a>
          <a href="/posts" className="block px-4 py-2 text-foreground hover:bg-gray-200">
            Posts
          </a>
          <a href="/categories" className="block px-4 py-2 text-foreground hover:bg-gray-200">
            Categories
          </a>
        </div>
      )}
    </header>
  );
}
