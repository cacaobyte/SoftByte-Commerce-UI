'use client'
import React, { useState } from "react";
import { FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Controla si el sidebar está abierto o cerrado
  const [openMenu, setOpenMenu] = useState(null); // Controla qué menú está desplegado

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu); // Alterna el submenú
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 h-screen text-white flex flex-col transition-all duration-300`}
    >
      {/* Botón para colapsar */}
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={toggleSidebar}
      >
        <span className={`${!isOpen && "hidden"} font-bold`}>Event Admin</span>
        <FaBars />
      </div>

      {/* Opciones del menú */}
      <nav className="flex flex-col space-y-2">
        {/* Opción con submenú */}
        <div>
          <div
            className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSubMenu("modulo1")}
          >
            <span className={`${!isOpen && "hidden"}`}>Módulo 1</span>
            {openMenu === "modulo1" ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {openMenu === "modulo1" && isOpen && (
            <div className="pl-8 flex flex-col space-y-1">
              <a href="#sub1" className="hover:text-gray-400">
                Submenú 1
              </a>
              <a href="#sub2" className="hover:text-gray-400">
                Submenú 2
              </a>
            </div>
          )}
        </div>

        {/* Opción sin submenú */}
        <a
          href="#modulo2"
          className="flex items-center px-4 py-2 hover:bg-gray-700"
        >
          <span className={`${!isOpen && "hidden"}`}>Módulo 2</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
