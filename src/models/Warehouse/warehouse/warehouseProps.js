import { Eye, Pencil, ToggleLeft } from "lucide-react";

export const getWarehouseActions = ({ onView, onEdit, onToggle }) => [
    { label: "Ver", icon: Eye, variant: "ghost", onClick: onView },
    { label: "Editar", icon: Pencil, variant: "outline", onClick: onEdit },
    { label: "Desactivar", icon: ToggleLeft, variant: "destructive", onClick: onToggle },
];
