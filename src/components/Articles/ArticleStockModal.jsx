import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Warehouse, DollarSign, Layers, ZoomIn } from "lucide-react";

const ArticleStockModal = ({ article, isOpen, onClose }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Estado para la previsualización

  if (!article) return null;

  return (
    <>
      {/* Modal principal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md sm:max-w-lg max-h-screen overflow-y-auto p-6 rounded-lg bg-white/90 backdrop-blur-md shadow-lg">
          <DialogHeader className="text-center">
            {/* Imagen con opción de previsualización */}
            <div className="flex justify-center relative">
              <img
                src={article.foto || "/placeholder.png"}
                alt={article.descripcion}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-md object-cover cursor-pointer transition-transform transform hover:scale-110"
                onClick={() => setIsPreviewOpen(true)} // Abre el modal de preview
              />
              <span className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full cursor-pointer">
                <ZoomIn className="w-4 h-4" />
              </span>
            </div>

            <DialogTitle className="text-lg sm:text-xl font-bold mt-3">
              {article.descripcion}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Código: {article.articulo1 || "N/A"}
            </DialogDescription>
          </DialogHeader>

          {/* Detalles del stock */}
          <div className="space-y-4 mt-4 text-sm sm:text-base">
            <p className="flex items-center">
              <Layers className="inline-block mr-2 text-gray-600 w-5 h-5" />
              <strong>Disponible:</strong> {article?.disponible || 0} unidades
            </p>
            <p className="flex items-center">
              <DollarSign className="inline-block mr-2 text-gray-600 w-5 h-5" />
              
              <strong>Precio:</strong> Q{article?.precio?.toFixed(2) || "0.00"} C/U
            </p>
            <p className="flex items-center">
              <DollarSign className="inline-block mr-2 text-gray-600 w-5 h-5" />
              <strong>Valor total:</strong> Q{article?.totalValorProducto?.toFixed(2) || "0.00"}
            </p>
            <p className="flex items-center">
              <Warehouse className="inline-block mr-2 text-gray-600 w-5 h-5" />
              <strong>Bodega:</strong> {article?.bodega || "No asignada"}
            </p>
          </div>

          {/* Botón de cierre */}
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de previsualización de imagen con fondo transparente */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-lg p-4 flex flex-col justify-center items-center bg-transparent backdrop-blur-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="sr-only">Previsualización de imagen</DialogTitle>
          </DialogHeader>
          <img
            src={article.foto || "/placeholder.png"}
            alt={article.descripcion}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArticleStockModal;
