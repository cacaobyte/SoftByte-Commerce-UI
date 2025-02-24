"use client";

import React, { useState } from "react";
import IconPickerModal from "@/components/shared/Icons/IconPickerModal";
import { Button } from "@/components/ui/button";
import * as FaIcons from "react-icons/fa"; // Solo usamos FontAwesome

const allIcons = { ...FaIcons }; // Solo usamos FaIcons

export default function TestIconPicker() {
  const [iconName, setIconName] = useState(""); // Estado para almacenar el icono seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-4">Prueba de IconPickerModal</h1>

      {/* 🔹 Vista previa del ícono seleccionado */}
      <div className="mb-4 flex flex-col items-center">
        <p className="text-gray-700">Ícono seleccionado:</p>
        <div className="mt-2 p-4 border rounded-md bg-white flex items-center justify-center">
          {iconName && allIcons[iconName] && typeof allIcons[iconName] === "function" ? (
            React.createElement(allIcons[iconName], { size: 48, className: "text-blue-500" })
          ) : (
            <FaIcons.FaQuestionCircle size={48} className="text-gray-400" />
          )}
        </div>
      </div>

      {/* 🔹 Botón para abrir el selector de íconos */}
      <Button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-6 py-2 rounded-md">
        Seleccionar Ícono
      </Button>

      {/* 🔹 Componente IconPickerModal */}
      <IconPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(selectedIcon) => {
          console.log("Ícono seleccionado:", selectedIcon);
          setIconName(selectedIcon); // Guarda el nombre del icono
        }}
      />
    </div>
  );
}
