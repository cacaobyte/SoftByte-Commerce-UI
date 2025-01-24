"use client";
import React, { useState } from "react";
import { sidebarItems } from "../../models/Sidebar/SidebarModel";
import * as Icons from "react-icons/fa"; // Importa todos los íconos de FontAwesome

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white shadow-lg h-screen flex flex-col transition-all duration-300 border-r border-gray-200`}
    >
      {/* Botón para ocultar el Sidebar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Icons.FaBars
            size={24}
            className="cursor-pointer text-gray-600"
            onClick={toggleSidebar}
          />
          {isOpen && (
            <span className="text-xl font-semibold text-cyan-500">
              SoftByte
            </span>
          )}
        </div>
      </div>

      {/* Perfil del Usuario */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <img
          src="/profile-pic.png"
          alt="Usuario"
          className="w-10 h-10 rounded-full"
        />
        {isOpen && (
          <div className="ml-3">
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        )}
      </div>

      {/* Menú dinámico */}
      <div className="flex-1 overflow-y-auto">
        <nav className="flex flex-col mt-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const Icon = Icons[item.icon]; // Extraemos el ícono del modelo
            return (
              <div key={index}>
                <button
                  className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-all w-full"
                  onClick={() => toggleSubMenu(item.title)}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="text-cyan-500" />
                    {isOpen && <span className="font-medium">{item.title}</span>}
                  </div>
                  {isOpen &&
                    (item.submenus.length > 0 ? (
                      openMenu === item.title ? (
                        <Icons.FaChevronUp />
                      ) : (
                        <Icons.FaChevronDown />
                      )
                    ) : null)}
                </button>
                {openMenu === item.title && isOpen && item.submenus.length > 0 && (
                  <div className="ml-8 flex flex-col space-y-2">
                    {item.submenus.map((submenu, subIndex) => (
                      <a
                        key={subIndex}
                        href={submenu.route}
                        className="text-sm text-gray-600 hover:text-cyan-500 transition-colors"
                      >
                        {submenu.title}
                      </a>
                    ))}
                  </div>
                )}
                {item.badge && (
                  <span className="absolute right-4 top-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-gray-200 p-4">
        <button
          className="flex items-center px-4 py-3 w-full text-red-600 hover:bg-gray-100 rounded-md transition-all"
          onClick={() => alert("Sesión cerrada")}
        >
          <Icons.FaSignOutAlt />
          {isOpen && <span className="ml-3 font-medium">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
