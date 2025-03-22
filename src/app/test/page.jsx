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
import QuotesService from "../../service/SoftbyteCommerce/Sales/Quotes/quotesService";
import { v4 as uuidv4 } from 'uuid';

export default function TestPage() {
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [warehouseModalOpen, setWarehouseModalOpen] = useState(false);
  const [articleModalOpen, setArticleModalOpen] = useState(false);

  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [notes, setNotes] = useState("");
  const [paymentType, setPaymentType] = useState("Efectivo");
  const [currency, setCurrency] = useState("GTQ");
  const [applyDiscount, setApplyDiscount] = useState(false);

  const quotesService = new QuotesService();

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    console.log("Cliente seleccionado:", client);
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

  
  // Cálculo del subtotal
  const subtotal = useMemo(() => {
    return selectedArticles.reduce((sum, article) => sum + (article.total || 0), 0);
  }, [selectedArticles]);

  // Cálculo del descuento del cliente si está activado
  const clientDiscount = useMemo(() => {
    return applyDiscount && selectedClient?.descuento ? (subtotal * selectedClient.descuento) / 100 : 0;
  }, [applyDiscount, selectedClient, subtotal]);

  // Cálculo de impuestos (Ejemplo: 12%)
  const taxes = useMemo(() => {
    return subtotal * 0.12;
  }, [subtotal]);

   // Cálculo del total final
  const totalCotizacion = useMemo(() => {
    return subtotal - clientDiscount + taxes;
  }, [subtotal, clientDiscount, taxes]);

  // Función para enviar la cotización al servicio
// Función para enviar la cotización al servicio
const handleGenerateQuote = async () => {
  if (!selectedClient || !selectedWarehouse || selectedArticles.length === 0) {
    alert("Faltan datos para generar la cotización.");
    return;
  }

  // clienteId ahora es string, se respeta como está o se genera un nuevo UUID si viene vacío
  const clienteId = selectedClient.cliente1?.length > 0 ? selectedClient.cliente1 : uuidv4();

  const requestData = {
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString(),
    clienteId: clienteId, // ahora string
    nombreCliente: selectedClient.primerNombre,
    apellidoCliente: selectedClient.primerApellido,
    correo: selectedClient.email || "",
    telefono: selectedClient.celular || "",
    tipoPago: paymentType,
    descuentoCliente: selectedClient.descuento || 0,
    subtotal,
    descuentoTotal: clientDiscount,
    impuestos: taxes,
    total: totalCotizacion,
    estado: "Pendiente",
    moneda: currency,
    origen: "Tienda",
    usuarioCreador: "admin",
    notas: notes,
    detalles: selectedArticles.map((article) => ({
      idArticulo: String(article.articulo1), // conversión explícita a string
      nombreArticulo: article.descripcion,
      precioUnitario: article.precio,
      cantidad: article.cantidad,
      descuentoAplicado: article.descuento || 0,
      subtotal: article.subtotal,
      impuestos: article.impuesto || 0,
      total: article.total,
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
      usuarioCreador: "admin",
    })),
  };

  console.log("📦 Datos antes de enviar:", JSON.stringify(requestData, null, 2));

  try {
    await quotesService.CreateQuotes(requestData);
    alert("Cotización generada exitosamente.");
  } catch (error) {
    console.error("❌ Error al generar la cotización:", error);
    alert("Hubo un error al generar la cotización.");
  }
};



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

        <div className="mb-4">
        <label>Notas del vendedor:</label>
        <textarea className="w-full border p-2 rounded" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      <div className="mb-4">
        <label>Tipo de pago:</label>
        <select className="w-full border p-2 rounded" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
          <option>Efectivo</option>
          <option>Tarjeta de crédito</option>
          <option>Transferencia bancaria</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Moneda:</label>
        <select className="w-full border p-2 rounded" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option>GTQ</option>
        </select>
      </div>

      <div className="mb-4">
        <input type="checkbox" checked={applyDiscount} onChange={() => setApplyDiscount(!applyDiscount)} />
        <label className="ml-2">Aplicar descuento del cliente</label>
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
            <h3 className="text-xl font-bold mt-4">Total: <span className="text-green-600">Q{totalCotizacion.toFixed(2)}</span></h3>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No hay artículos seleccionados.</p>
        )}
      </div>

      {/* Botón de Generar Cotización */}
      {selectedClient && selectedWarehouse && selectedArticles.length > 0 && (
        <div className="mt-6 flex justify-end">
   <div className="mt-6 flex justify-end">
        <Button onClick={handleGenerateQuote}>Generar Cotización</Button>
      </div>
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

