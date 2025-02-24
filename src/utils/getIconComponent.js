import * as lucideIcons from "lucide-react";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";

const DEFAULT_ICON = FaIcons.FaQuestionCircle; // 🔹 Icono por defecto si no se encuentra

// 🎨 Mapeo de colores según el nombre del icono o una categoría
const iconColors = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
  default: "text-gray-700"
};

// 🔹 Función para obtener la categoría de color basada en el nombre del icono
const getColorForIcon = (iconName) => {
  if (!iconName) return iconColors.default;

  const lowerName = iconName.toLowerCase();

  if (lowerName.includes("check") || lowerName.includes("success")) return iconColors.success;
  if (lowerName.includes("error") || lowerName.includes("times") || lowerName.includes("x")) return iconColors.error;
  if (lowerName.includes("warning") || lowerName.includes("alert") || lowerName.includes("exclamation")) return iconColors.warning;
  if (lowerName.includes("info") || lowerName.includes("question") || lowerName.includes("help")) return iconColors.info;

  return iconColors.default;
};

// 🔹 Función principal para obtener el icono
export function getIconComponent(iconName, size = 24, customClass = "") {
    if (!iconName) return null; // No mostrar nada si no hay icono

    let IconComponent = null;

    if (lucideIcons[iconName]) {
        IconComponent = lucideIcons[iconName];
    } else if (RiIcons[iconName]) {
        IconComponent = RiIcons[iconName];
    } else if (FaIcons[iconName]) {
        IconComponent = FaIcons[iconName];
    } else {
        IconComponent = DEFAULT_ICON; // 🔹 Si no se encuentra, usa el icono por defecto
    }

    const colorClass = getColorForIcon(iconName); // 🎨 Obtener el color dinámicamente

    return <IconComponent size={size} className={`${colorClass} ${customClass}`} />;
}
