import {  FaBars,   FaHome,   FaUser,   FaBell,   FaSignOutAlt } from "react-icons/fa";
import {   MdDashboard,   MdSettings,   MdClose } from "react-icons/md";
import { AiOutlineAppstore } from "react-icons/ai"; // Ejemplo para una opción genérica
import { BsFillGearFill } from "react-icons/bs"; // Otro ícono para configuraciones

export const Icons = {
  menu: FaBars, // Ícono del botón de menú
  close: MdClose, // Ícono para cerrar
  logo: MdDashboard, // Ícono representativo para el logo
  dashboard: FaHome, // Dashboard
  users: FaUser, // Usuarios
  notifications: FaBell, // Notificaciones
  logout: FaSignOutAlt, // Cerrar sesión
  settings: MdSettings, // Configuración
  apps: AiOutlineAppstore, // Opcional: Ícono para módulos o aplicaciones
  gear: BsFillGearFill, // Opcional: Otro ícono de configuración
};
