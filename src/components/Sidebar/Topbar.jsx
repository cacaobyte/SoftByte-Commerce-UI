import React from "react";
import { IoNotificationsOutline, IoPersonCircleOutline } from "react-icons/io5";

const Topbar = () => {
  return (
    <div className="bg-gray-100 border-b border-gray-300 h-16 flex justify-between items-center px-4">
      {/* Título o espacio vacío */}
      <div className="text-lg font-bold">SoftByte Commerce</div>

      {/* Opciones */}
      <div className="flex items-center space-x-4">
        <IoNotificationsOutline size={24} />
        <IoPersonCircleOutline size={24} />
      </div>
    </div>
  );
};

export default Topbar;
