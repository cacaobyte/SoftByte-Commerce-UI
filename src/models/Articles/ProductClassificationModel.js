// models/ProductClassificationModel.js
import { ShoppingCart, Coffee, Megaphone } from "lucide-react";

const productClassifications = [
  {
    title: "Ventas",
    description:
      "Todos los artículos destinados a la venta al cliente, como productos exhibidos en el inventario.",
    icon: ShoppingCart,
    bgColor: "bg-blue-500",
  },
  {
    title: "Consumo",
    description:
      "Artículos de consumo interno para tiendas o empleados. Ejemplos: escobas, café, vasos, azúcar, leche, y otros suministros.",
    icon: Coffee,
    bgColor: "bg-green-500",
  },
  {
    title: "Marketing / Propaganda",
    description:
      "Artículos utilizados para la promoción del negocio, como volantes, afiches, banners publicitarios, entre otros.",
    icon: Megaphone,
    bgColor: "bg-cyan-500",
  },
];

export default productClassifications;
