"use client";
import React, { useState } from "react";
import { sidebarItems } from "../../models/Sidebar/SidebarModel";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons"; // Importa tus iconos personalizados

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null); // Controla qué submenú está desplegado
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controla el estado del Sidebar

  const toggleSubMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu); // Alterna submenú
  };

  return (
    <>
      {/* Botón para abrir el sidebar */}
      <Button
        variant="outline"
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Icons.menu className="w-5 h-5" />
      </Button>

      {/* Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent className="w-72 max-h-screen overflow-y-auto" side="left">
          {/* Título accesible */}
          <SheetTitle className="sr-only">Menú lateral</SheetTitle>

          {/* Logo */}
          <div className="p-4 flex items-center space-x-3 border-b cursor-pointer">
            <Icons.logo className="w-6 h-6 text-cyan-500" />
            <span className="text-lg font-semibold">SoftByte</span>
            {/* Botón para cerrar el sidebar */}
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
                    onClick={() => toggleSubMenu(item.title)}
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
                        <a
                          key={subIndex}
                          href={submenu.route}
                          className="text-sm text-gray-600 hover:text-cyan-500"
                        >
                          {submenu.title}
                        </a>
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
              onClick={() => alert("Sesión cerrada")}
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
