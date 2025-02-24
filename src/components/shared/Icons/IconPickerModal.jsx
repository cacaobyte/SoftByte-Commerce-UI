import React, { useState } from "react";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// 🔹 Usamos solo react-icons (FontAwesome y Remix Icons)
const allIcons = { ...RiIcons, ...FaIcons };

const IconPickerModal = ({ isOpen, onClose, onSelect }) => {
  const [search, setSearch] = useState("");

  // 🔹 Filtrar iconos asegurando que sean funciones válidas de React
  const filteredIcons = Object.entries(allIcons).filter(
    ([name, component]) => typeof component === "function" && name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-6">
        <DialogHeader>
          <DialogTitle>Seleccionar Ícono</DialogTitle>
        </DialogHeader>

        {/* 🔹 Barra de Búsqueda */}
        <input
          type="text"
          placeholder="Buscar ícono..."
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🔹 Lista de Íconos */}
        <div className="grid grid-cols-6 md:grid-cols-8 gap-4 max-h-80 overflow-y-auto p-2">
          {filteredIcons.map(([iconName, IconComponent]) => (
            <button
              key={iconName}
              onClick={() => {
                onSelect(iconName); // Guardamos el nombre del ícono
                onClose();
              }}
              className="flex flex-col items-center justify-center p-2 border rounded-md hover:bg-gray-200 transition"
            >
              <IconComponent size={28} className="text-gray-700" />
              <span className="text-xs mt-1">{iconName}</span>
            </button>
          ))}
        </div>

        {/* 🔹 Botón para cerrar */}
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IconPickerModal;
