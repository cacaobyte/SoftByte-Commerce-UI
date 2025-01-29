import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Calendar, User } from "lucide-react";

const ArticleDetailsModal = ({ article, isOpen, onClose }) => {
  if (!article) return null; // Evita errores si no hay artículo seleccionado

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "No disponible";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {article?.descripcion || "Artículo sin nombre"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Información detallada del artículo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          {/* Imagen del artículo */}
          <div className="flex justify-center items-center">
            <img
              src={article?.foto || "/placeholder.png"}
              alt={article?.descripcion || "Imagen no disponible"}
              className="rounded-lg shadow-md w-full max-w-lg h-auto object-cover"
            />
          </div>
          {/* Información adicional */}
          <div className="space-y-6">
            <div className="text-sm space-y-2">
              <p>
                <Info className="inline-block mr-2 text-gray-600" />
                <strong>Código:</strong> {article?.articulo1 || "No disponible"}
              </p>
              <p>
                <Info className="inline-block mr-2 text-gray-600" />
                <strong>Precio:</strong>{" "}
                <span className="text-blue-600 font-semibold">
                  Q{article?.precio?.toFixed(2) || "0.00"}
                </span>
              </p>
              <p>
                <Info className="inline-block mr-2 text-gray-600" />
                <strong>Categoría:</strong> {article?.categoria || "N/A"}
              </p>
              <p>
                <Info className="inline-block mr-2 text-gray-600" />
                <strong>Estado:</strong>{" "}
                <span
                  className={`font-semibold ${
                    article?.activo ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {article?.activo ? "Activo" : "Inactivo"}
                </span>
              </p>
            </div>
            <div className="text-sm space-y-2 border-t pt-4">
              <p>
                <User className="inline-block mr-2 text-gray-600" />
                <strong>Creado por:</strong> {article?.createdby || "Desconocido"}
              </p>
              <p>
                <Calendar className="inline-block mr-2 text-gray-600" />
                <strong>Fecha de creación:</strong> {formatDate(article?.fechacreacion)}
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
    </Dialog>
  );
};

export default ArticleDetailsModal;
