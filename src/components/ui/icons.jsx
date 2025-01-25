import { FaBars, FaHome, FaUser, FaBell, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { MdDashboard, MdSettings } from "react-icons/md";

export const Icons = {
  menu: FaBars,
  close: FaTimes, // Nuevo ícono para cerrar el sidebar
  logo: MdDashboard, // Puedes cambiar esto a un ícono representativo para tu logo
  dashboard: FaHome,
  users: FaUser,
  notifications: FaBell,
  logout: FaSignOutAlt,
  settings: MdSettings,
};
