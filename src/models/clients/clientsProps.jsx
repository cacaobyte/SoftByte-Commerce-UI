import { Eye, Pencil, ToggleLeft } from "lucide-react";

export const getClientActions = ({ onView, onEdit, onToggle }) => [
  { label: "Ver Detalle", icon: Eye, variant: "ghost", onClick: onView },
  { label: "Editar", icon: Pencil, variant: "outline", onClick: onEdit },
  {
    label: "Activar/Desactivar",
    icon: ToggleLeft,
    variant: "destructive",
    onClick: onToggle,
  },
];
