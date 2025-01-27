import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Calendar, User } from "lucide-react";

const ArticleDetailsModal = ({ article, onClose }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <DialogContent className="max-w-3xl max-h-screen overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">{article.descripcion}</DialogTitle>
        <DialogDescription className="text-sm text-gray-500">
          Información detallada del artículo.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Imagen del artículo */}
        <div className="flex justify-center items-center">
          <img
            src={article.foto || "/placeholder.png"}
            alt={article.descripcion}
            className="rounded-lg shadow-md w-full max-w-lg h-auto object-cover"
          />
        </div>
        {/* Información adicional */}
        <div className="space-y-6">
          {/* Información básica */}
          <div className="text-sm space-y-2">
            <p>
              <Info className="inline-block mr-2 text-gray-600" />
              <strong>Código:</strong> {article.articulo1}
            </p>
            <p>
              <Info className="inline-block mr-2 text-gray-600" />
              <strong>Precio:</strong>{" "}
              <span className="text-blue-600 font-semibold">
                Q{article.precio.toFixed(2)}
              </span>
            </p>
            <p>
              <Info className="inline-block mr-2 text-gray-600" />
              <strong>Categoría:</strong> {article.categoria || "N/A"}
            </p>
            <p>
              <Info className="inline-block mr-2 text-gray-600" />
              <strong>Subcategoría:</strong> {article.subCategoria || "N/A"}
            </p>
            <p>
              <Info className="inline-block mr-2 text-gray-600" />
              <strong>Estado:</strong>{" "}
              <span
                className={`font-semibold ${
                  article.activo ? "text-green-600" : "text-red-600"
                }`}
              >
                {article.activo ? "Activo" : "Inactivo"}
              </span>
            </p>
          </div>
          {/* Información técnica */}
          <div className="text-sm space-y-2 border-t pt-4">
            <p>
              <Info className="inline-block mr-2 text-gray-600" />
              <strong>Peso Neto:</strong> {article.pesoNeto || "N/A"} kg
            </p>
            <p>
              <Info className="inline-block mr-2 text-gray-600" />
              <strong>Peso Bruto:</strong> {article.pesoBruto || "N/A"} kg
            </p>
            <p>
              <Info className="inline-block mr-2 text-gray-600" />
              <strong>Volumen:</strong> {article.volumen || "N/A"} m³
            </p>
          </div>
          {/* Información de creación y actualización */}
          <div className="text-sm space-y-2 border-t pt-4">
            <p>
              <User className="inline-block mr-2 text-gray-600" />
              <strong>Creado por:</strong> {article.createdby}
            </p>
            <p>
              <Calendar className="inline-block mr-2 text-gray-600" />
              <strong>Fecha de creación:</strong> {formatDate(article.fechacreacion)}
            </p>
            <p>
              <Calendar className="inline-block mr-2 text-gray-600" />
              <strong>Última actualización:</strong> {formatDate(article.fechaactualizacion)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </DialogContent>
  );
};

export default ArticleDetailsModal;
