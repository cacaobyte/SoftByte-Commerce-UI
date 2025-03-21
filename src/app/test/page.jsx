"use client";
import { useState } from "react";
import QuotesClients from "@/components/shared/Quotes/clients/QuotesClients";
import WarehouseSelected from "@/components/shared/Quotes/warehouse/warehouseSelected";
import QuotesArticles from "@/components/shared/Quotes/articles/ArticlesSelected";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DataTable from "../../components/shared/DataTable/DataTable"; // Importamos DataTable
import { articlesColumns } from "../../models/Quotes/Articles/articlesColumns"; // Modelo para la tabla de artículos

export default function TestPage() {
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [warehouseModalOpen, setWarehouseModalOpen] = useState(false);
  const [articleModalOpen, setArticleModalOpen] = useState(false);

  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedArticles, setSelectedArticles] = useState([]);

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setClientModalOpen(false);
  };

  const handleSelectWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setWarehouseModalOpen(false);
  };

  const handleSelectArticles = (articles) => {
    setSelectedArticles(articles);
    setArticleModalOpen(false);
  };

  const removeArticle = (index) => {
    const updatedArticles = selectedArticles.filter((_, i) => i !== index);
    setSelectedArticles(updatedArticles);
  };

  return (
    <div className="py-8 px-6">
      <h1 className="text-2xl font-bold mb-4">Cotización de Productos</h1>

      {/* Botones para abrir modales */}
      <div className="flex gap-4">
        <Button onClick={() => setClientModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          Seleccionar Cliente
        </Button>
        <Button onClick={() => setWarehouseModalOpen(true)} className="bg-green-600 hover:bg-green-700">
          Seleccionar Bodega
        </Button>
        <Button onClick={() => setArticleModalOpen(true)} className="bg-yellow-600 hover:bg-yellow-700">
          Seleccionar Artículos
        </Button>
      </div>

      {/* Resumen de Cotización */}
      <div className="mt-6 p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-2">Resumen de Cotización</h2>

        {/* Datos del Cliente */}
        {selectedClient ? (
          <div className="border-b pb-2 mb-2">
            <h3 className="text-lg font-semibold">Cliente</h3>
            <p><strong>Nombre:</strong> {selectedClient.primerNombre} {selectedClient.primerApellido || ""}</p>
            <p><strong>Email:</strong> {selectedClient.email || "No disponible"}</p>
            <p><strong>Teléfono:</strong> {selectedClient.celular2 || "No disponible"}</p>
          </div>
        ) : (
          <p className="text-gray-500">No se ha seleccionado un cliente.</p>
        )}

        {/* Datos de la Bodega */}
        {selectedWarehouse ? (
          <div className="border-b pb-2 mb-2">
            <h3 className="text-lg font-semibold">Bodega</h3>
            <p><strong>Código:</strong> {selectedWarehouse.bodega || "No disponible"}</p>
            <p><strong>Descripción:</strong> {selectedWarehouse.descripcion || "No disponible"}</p>
          </div>
        ) : (
          <p className="text-gray-500">No se ha seleccionado una bodega.</p>
        )}

        {/* Tabla de Artículos Seleccionados */}
        {selectedArticles.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">Artículos Seleccionados</h3>
            <DataTable
              columns={articlesColumns}
              data={selectedArticles}
              searchField="descripcion"
              showActions={true}
              actions={[
                {
                  label: "Eliminar",
                  onClick: removeArticle,
                },
              ]}
            />
          </div>
        ) : (
          <p className="text-gray-500">No hay artículos seleccionados.</p>
        )}
      </div>

      {/* Botón de Generar Cotización */}
      {selectedClient && selectedWarehouse && selectedArticles.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">
            Generar Cotización
          </Button>
        </div>
      )}

      {/* Modal para Seleccionar Cliente */}
      <Dialog open={clientModalOpen} onOpenChange={setClientModalOpen}>
        <DialogContent className="w-[90vw] max-w-4xl max-h-[85vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Seleccionar Cliente</DialogTitle>
          </DialogHeader>
          <QuotesClients onSelectClient={handleSelectClient} />
        </DialogContent>
      </Dialog>

      {/* Modal para Seleccionar Bodega */}
      <Dialog open={warehouseModalOpen} onOpenChange={setWarehouseModalOpen}>
        <DialogContent className="w-[90vw] max-w-4xl max-h-[85vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Seleccionar Bodega</DialogTitle>
          </DialogHeader>
          <WarehouseSelected onSelectWarehouse={handleSelectWarehouse} />
        </DialogContent>
      </Dialog>

      {/* Modal para Seleccionar Artículos */}
      <Dialog open={articleModalOpen} onOpenChange={setArticleModalOpen}>
        <DialogContent className="w-[90vw] max-w-4xl max-h-[85vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Seleccionar Artículos</DialogTitle>
          </DialogHeader>
          <QuotesArticles onSelectArticles={handleSelectArticles} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
