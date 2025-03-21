"use client";
import { useState, useMemo } from "react";
import QuotesClients from "@/components/shared/Quotes/clients/QuotesClients";
import WarehouseSelected from "@/components/shared/Quotes/warehouse/warehouseSelected";
import QuotesArticles from "@/components/shared/Quotes/articles/ArticlesSelected";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DataTable from "../../components/shared/DataTable/DataTable";
import { articlesColumns } from "../../models/Quotes/Articles/articlesColumns";
import { Home, Package, Mail, Phone } from "lucide-react"; // Íconos para la bodega

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

  // 🔢 Cálculo del total de la cotización
  const totalCotizacion = useMemo(() => {
    return selectedArticles.reduce((sum, article) => sum + (article.total || 0), 0);
  }, [selectedArticles]);

  return (
    <div className="py-8 px-6">
      <h1 className="text-2xl font-bold mb-4">Cotización de Productos</h1>

      {/* Botones para abrir modales */}
      <div className="flex flex-wrap gap-4 mb-6">
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
      <div className="p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4">Resumen de Cotización</h2>

        {/* Sección Cliente & Bodega */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Cliente */}
          {selectedClient ? (
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
              <img
                src={selectedClient.foto || "https://via.placeholder.com/100"}
                alt="Foto del cliente"
                className="w-20 h-20 rounded-full border"
              />
              <div>
                <h3 className="text-lg font-semibold mb-1">Cliente: {selectedClient.cliente1}</h3>
                <p><strong>Nombre:</strong> {selectedClient.primerNombre} {selectedClient.segundoNombre || ""} {selectedClient.primerApellido}</p>
                <p><strong>Email:</strong> {selectedClient.email || "No disponible"}</p>
                <p><strong>Teléfono:</strong> {selectedClient.celular || "No disponible"}</p>
                <p><strong>Dirección:</strong> {selectedClient.direccion || "No disponible"}</p>
                <p><strong>Empresa:</strong> {selectedClient.empresa || "No disponible"}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No se ha seleccionado un cliente.</p>
          )}

          {/* Bodega */}
          {selectedWarehouse ? (
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
              <div>
                <h3 className="text-lg font-semibold mb-1">Bodega</h3>
                <p className="flex items-center gap-2"><Home size={16} /> <strong>Código:</strong> {selectedWarehouse.bodega1 || "No disponible"}</p>
                <p className="flex items-center gap-2"><Package size={16} /> <strong>Descripción:</strong> {selectedWarehouse.descripcion || "No disponible"}</p>
                <p className="flex items-center gap-2"><Home size={16} /> <strong>Dirección:</strong> {selectedWarehouse.direccion || "No disponible"}</p>
                <p className="flex items-center gap-2"><Home size={16} /> <strong>Región:</strong> {selectedWarehouse.region || "No disponible"}</p>
                <p className="flex items-center gap-2"><Phone size={16} /> <strong>Teléfono:</strong> {selectedWarehouse.telefono || "No disponible"}</p>
                <p className="flex items-center gap-2"><Mail size={16} /> <strong>Correo:</strong> {selectedWarehouse.correo || "No disponible"}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No se ha seleccionado una bodega.</p>
          )}
        </div>

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

            {/* Total de la Cotización */}
            <div className="mt-4 text-right">
              <h3 className="text-xl font-bold">
                Total de la Cotización: <span className="text-green-600">${totalCotizacion.toFixed(2)}</span>
              </h3>
            </div>
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
