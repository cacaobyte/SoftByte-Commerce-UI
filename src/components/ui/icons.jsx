// Importación de íconos personalizados
import {
  FaBars,
  FaBell,
  FaSignOutAlt,
  FaTimes,
  FaBox,
  FaCashRegister,
  FaWarehouse,
  FaTags,
  FaUsers,
  FaChartLine,
  FaFileInvoice,
  FaQuestionCircle,
  FaEnvelope, // Ícono de correo electrónico
  FaPhone, // Ícono de teléfono
  FaGlobe, // Ícono de sitio web
} from "react-icons/fa";
import { MdDashboard, MdSettings, MdOutlineSell } from "react-icons/md";
import { RiDashboard3Fill } from "react-icons/ri";
import { FcSalesPerformance } from "react-icons/fc";
import { FaUsersViewfinder } from "react-icons/fa6";

export const Icons = {
  menu: FaBars,
  close: FaTimes,
  logo: MdDashboard, // Ícono para el logo
  dashboard: MdDashboard, 
  users: FaUsers, // Ícono para Usuarios
  notifications: FaBell, // Ícono para Notificaciones
  logout: FaSignOutAlt,
  settings: MdSettings, // Ícono para Configuración
  box: FaBox, // Ícono para Productos
  cashRegister: FaCashRegister, // Ícono para Cajas
  warehouse: FaWarehouse, // Ícono para Inventario
  tags: FaTags, // Ícono para Etiquetas
  chart: FaChartLine, // Ícono para Reportes
  bell: FaBell, // Ícono para Alerta o Notificaciones
  billing: FaFileInvoice, // Ícono para Facturación
  sales: MdOutlineSell, // Ícono para Ventas
  help: FaQuestionCircle, // Ícono para Soporte
  RiDashboard3Fill,
  FcSalesPerformance,
  FaUsersViewfinder,
  contactEmail: FaEnvelope, // Nuevo ícono de correo
  contactPhone: FaPhone, // Nuevo ícono de teléfono
  contactWebsite: FaGlobe, // Nuevo ícono de sitio web
};
