"use client";
import React, { useState } from "react";
import Link from "next/link"; // Importa Link de Next.js
import { sidebarItems } from "../../models/Sidebar/SidebarModel";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons"; // Importa tus iconos personalizados
import { useRouter } from "next/navigation";
import { isPlatform } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null); // Controla qué submenú está desplegado
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controla el estado del Sidebar
  const router = useRouter();

  const toggleSubMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu); // Alterna submenú
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false); // Cierra el sidebar al hacer clic en una opción
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
    <>
      {/* Botón para abrir el sidebar */}
      <Button
        variant="outline"
        className="absolute top-4 left-4 z-40" // Cambiado de z-50 a z-40 para evitar conflictos
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Icons.menu className="w-5 h-5" />
      </Button>

      {/* Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent className="w-72 max-h-screen overflow-y-auto pointer-events-auto" side="left">
          {/* Título accesible */}
          <SheetTitle className="sr-only">Menú lateral</SheetTitle>

          {/* Logo */}
          <div className="p-4 flex items-center space-x-3 border-b cursor-pointer">
            <Icons.logo className="w-6 h-6 text-cyan-500" />
            <span className="text-lg font-semibold">SoftByte</span>
          </div>

          {/* Menú dinámico */}
          <nav className="flex-1 overflow-y-auto mt-4">
            {sidebarItems.map((item, index) => {
              const IconComponent = Icons[item.icon];
              return (
                <div key={index} className="mb-2">
                  {/* Botón principal */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => {
                      if (item.submenus.length === 0) {
                        handleSidebarClose(); // Cierra el sidebar si no hay submenús
                      } else {
                        toggleSubMenu(item.title); // Alterna el submenú
                      }
                    }}
                  >
                    {IconComponent && (
                      <IconComponent className="mr-3 w-5 h-5 text-cyan-500" />
                    )}
                    {item.title}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>

                  {/* Submenús */}
                  {openMenu === item.title && item.submenus.length > 0 && (
                    <div className="ml-8 flex flex-col space-y-2 mt-2">
                      {item.submenus.map((submenu, subIndex) => (
                        <Link
                          key={subIndex}
                          href={submenu.route}
                          className="text-sm text-gray-600 hover:text-cyan-500"
                          onClick={handleSidebarClose} // Cierra el sidebar al hacer clic
                        >
                          {submenu.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
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
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
