'use client';
import React, { useState } from "react";
import {
  IoNotificationsOutline,
  IoPersonCircleOutline,
  IoMoon,
  IoSunny,
} from "react-icons/io5";
import { isPlatform } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Topbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  // Alternar entre claro y oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = async () => {
    if (isPlatform("hybrid")) {
      await Preferences.remove({ key: "token" });
    } else {
      document.cookie = "token=; path=/; max-age=0;";
    }
    router.push("/auth/login");
  };

  return (
    <div className={`h-16 shadow-md flex items-center px-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      {/* Título alineado a la izquierda con más espacio */}
      <div className="flex-1">
        <h1 className={`text-xl font-bold ml-10 ${darkMode ? "text-white" : "text-blue-700"}`}>
          Byte Commerce
        </h1>
      </div>

      {/* Íconos alineados a la derecha */}
      <div className="flex items-center space-x-6">
        {/* Notificaciones */}
        <div className="relative">
          <IoNotificationsOutline
            size={24}
            className={`${darkMode ? "text-white" : "text-blue-700"} hover:text-blue-500 cursor-pointer`}
          />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>

        {/* Alternar tema */}
        <button
          onClick={toggleDarkMode}
          className={`${darkMode ? "text-yellow-400" : "text-blue-700"} hover:text-blue-500`}
        >
          {darkMode ? <IoSunny size={24} /> : <IoMoon size={24} />}
        </button>

        {/* Menú del usuario */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={`${darkMode ? "text-white" : "text-blue-700"} hover:text-blue-500 cursor-pointer`}
          >
            <IoPersonCircleOutline size={28} />
          </button>

          {/* Menú desplegable */}
          {userMenuOpen && (
            <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}>
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => router.push("/setting/profile/")} 
                >
                  Mi Cuenta
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => alert("Configuración")}
                >
                  Configuración
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => alert("Dashboard")}
                >
                  Dashboard
                </li>
              </ul>

              <div className="p-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500"
                  onClick={handleLogout}
                >
                  <Icons.logout className="mr-3 w-5 h-5" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
