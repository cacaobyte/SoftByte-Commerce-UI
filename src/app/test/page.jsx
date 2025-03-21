"use client";
import { useState } from "react";
import QuotesClients from "@/components/shared/Quotes/clients/QuotesClients";
import WarehouseSelected from "@/components/shared/Quotes/warehouse/warehouseSelected";
import QuotesArticles from "@/components/shared/Quotes/articles/ArticlesSelected";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function TestPage() {
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [warehouseModalOpen, setWarehouseModalOpen] = useState(false);
  const [articleModalOpen, setArticleModalOpen] = useState(false);

  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleSelectClient = (client) => {
    console.log("Cliente seleccionado:", client);
    setSelectedClient(client);
    setClientModalOpen(false);
  };

  const handleSelectWarehouse = (warehouse) => {
    console.log("Bodega seleccionada:", warehouse);
    setSelectedWarehouse(warehouse);
    setWarehouseModalOpen(false);
  };

  const handleSelectArticle = (article) => {
    console.log("Artículo seleccionado:", article);
    setSelectedArticle(article);
    setArticleModalOpen(false);
  };

  return (
    <div className="py-8 px-6">
      <h1 className="text-2xl font-bold mb-4">Prueba de Cotizaciones</h1>

      {/* Botones para abrir modales */}
      <div className="flex gap-4">
        <Button onClick={() => setClientModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          Seleccionar Cliente
        </Button>
        <Button onClick={() => setWarehouseModalOpen(true)} className="bg-green-600 hover:bg-green-700">
          Seleccionar Bodega
        </Button>
        <Button onClick={() => setArticleModalOpen(true)} className="bg-yellow-600 hover:bg-yellow-700">
          Seleccionar Artículo
        </Button>
      </div>

      {/* Muestra las selecciones actuales */}
      <div className="mt-6 p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold">Resumen de Selecciones</h2>
        <p className="mt-2">
          <strong>Cliente:</strong> {selectedClient ? `${selectedClient.primerNombre} ${selectedClient.primerApellido}` : "No seleccionado"}
        </p>
        <p>
          <strong>Bodega:</strong> {selectedWarehouse ? selectedWarehouse.descripcion : "No seleccionada"}
        </p>
        <p>
          <strong>Artículo:</strong> {selectedArticle ? selectedArticle.descripcion : "No seleccionado"}
        </p>
      </div>

      {/* Modal para Seleccionar Cliente */}
      <Dialog open={clientModalOpen} onOpenChange={setClientModalOpen}>
        <DialogContent className="w-[90vw] max-w-4xl max-h-[85vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Seleccionar Cliente</DialogTitle>
          </DialogHeader>
          <div className="w-full h-full">
            <QuotesClients onSelectClient={handleSelectClient} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para Seleccionar Bodega */}
      <Dialog open={warehouseModalOpen} onOpenChange={setWarehouseModalOpen}>
        <DialogContent className="w-[90vw] max-w-4xl max-h-[85vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Seleccionar Bodega</DialogTitle>
          </DialogHeader>
          <div className="w-full h-full">
            <WarehouseSelected onSelectWarehouse={handleSelectWarehouse} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para Seleccionar Artículo */}
      <Dialog open={articleModalOpen} onOpenChange={setArticleModalOpen}>
        <DialogContent className="w-[90vw] max-w-4xl max-h-[85vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Seleccionar Artículo</DialogTitle>
          </DialogHeader>
          <div className="w-full h-full">
            <QuotesArticles onSelectArticle={handleSelectArticle} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
