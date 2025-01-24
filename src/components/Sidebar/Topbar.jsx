import React from "react";
import { IoNotificationsOutline, IoPersonCircleOutline } from "react-icons/io5";

const Topbar = () => {
  return (
    <div className="bg-white h-16 shadow-md flex justify-between items-center px-6">
      <h1 className="text-xl font-bold text-blue-700">SoftByte Commerce</h1>
      <div className="flex items-center space-x-4">
        <IoNotificationsOutline size={24} className="text-blue-700" />
        <IoPersonCircleOutline size={28} className="text-blue-700" />
      </div>
    </div>
  );
};

export default Topbar;
