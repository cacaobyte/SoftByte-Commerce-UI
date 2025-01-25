"use client";
import React, { useState } from "react";
import { sidebarItems } from "../../models/Sidebar/SidebarModel";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons"; // Importa tus iconos personalizados

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null); // Controla qué submenú está desplegado
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controla el estado del Sidebar en móvil
  const [isMinimized, setIsMinimized] = useState(false); // Controla el estado minimizado del sidebar en escritorio

  const toggleSubMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu); // Alterna submenú
  };

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="flex">
      {/* Sidebar en escritorio */}
      <div
        className={`${
          isMinimized ? "w-16" : "w-64"
        } hidden md:flex flex-col h-screen bg-white shadow-lg transition-all duration-300`}
      >
        {/* Botón para minimizar */}
        <div className="p-4 flex justify-between items-center border-b">
          <div className="flex items-center space-x-3">
            <Icons.logo className="w-6 h-6 text-cyan-500" />
            {!isMinimized && <span className="text-lg font-semibold">SoftByte</span>}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            {isMinimized ? <Icons.menu className="w-5 h-5" /> : <Icons.close className="w-5 h-5" />}
          </button>
        </div>

        {/* Menú dinámico */}
        <nav className="flex-1 overflow-y-auto mt-4">
          {sidebarItems.map((item, index) => {
            const IconComponent = Icons[item.icon];
            return (
              <div key={index} className="mb-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => toggleSubMenu(item.title)}
                >
                  {IconComponent && (
                    <IconComponent className="mr-3 w-5 h-5 text-cyan-500" />
                  )}
                  {!isMinimized && item.title}
                  {item.badge && !isMinimized && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
                {!isMinimized &&
                  openMenu === item.title &&
                  item.submenus.length > 0 && (
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
        {!isMinimized && (
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
        )}
      </div>

      {/* Sidebar en móvil */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="fixed top-4 left-4 z-50 md:hidden"
          >
            <Icons.menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-72">
          <SheetTitle className="sr-only">Menú lateral</SheetTitle>
          {/* Contenido del sidebar móvil */}
          <div className="p-4 flex items-center space-x-3 border-b">
            <Icons.logo className="w-6 h-6 text-cyan-500" />
            <span className="text-lg font-semibold">SoftByte</span>
          </div>
          <nav className="flex-1 overflow-y-auto mt-4">
            {sidebarItems.map((item, index) => {
              const IconComponent = Icons[item.icon];
              return (
                <div key={index} className="mb-2">
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
    </div>
  );
};

export default Sidebar;
