"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShoppingCart, Coffee, Megaphone } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const classifications = [
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
    bgColor: "bg-yellow-500",
  },
];

export default function ClassificationPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-bold">Clasificación de Artículos</h1>
        <p className="mt-2 text-lg text-gray-300">
          Aprende sobre las diferentes clasificaciones disponibles para dividir tus artículos de manera adecuada.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classifications.map((classification, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <div className={`w-full h-32 flex items-center justify-center ${classification.bgColor} text-white`}>
              <classification.icon size={48} />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{classification.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{classification.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
