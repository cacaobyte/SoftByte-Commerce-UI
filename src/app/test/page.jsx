"use client";
import { useState, useMemo } from "react";
import QuotesClients from "@/components/shared/Quotes/clients/QuotesClients";
import WarehouseSelected from "@/components/shared/Quotes/warehouse/warehouseSelected";
import QuotesArticles from "@/components/shared/Quotes/articles/ArticlesSelected";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DataTable from "../../components/shared/DataTable/DataTable";
import { articlesColumns } from "../../models/Quotes/Articles/articlesColumns";
import { Home, Package, Mail, Phone, BadgeCheck, Warehouse, ShoppingCart, UserRound } from "lucide-react"; 
import QuotesService from "../../service/SoftbyteCommerce/Sales/Quotes/quotesService";
import { v4 as uuidv4 } from 'uuid';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "react-toastify";


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
    toast.error("Faltan datos para generar la cotización.");
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
    origen: selectedWarehouse.bodega1 || "",
    usuarioCreador: "seller",
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
      usuarioCreador: "seller",
    })),
  };


  try {
    await quotesService.CreateQuotes(requestData);
    toast.success("Cotización generada exitosamente.");

       
        setSelectedClient(null);
        setSelectedWarehouse(null);
        setSelectedArticles([]);
        setNotes("");
        setPaymentType("Efectivo");
        setCurrency("GTQ");
        setApplyDiscount(false);
  } catch (error) {
    toast.error("Hubo un error al generar la cotización.");
  }
};



  return (
<div className="mb-6">
  <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Cotización de Productos</h1>
  <p className="text-muted-foreground text-sm mb-4">
    Selecciona la información necesaria para generar una cotización completa.
  </p>

  <div className="flex flex-wrap gap-3 sm:gap-4">
    <Button
      onClick={() => setClientModalOpen(true)}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      <UserRound className="mr-2 h-4 w-4" />
      Seleccionar Cliente
    </Button>

    <Button
      onClick={() => setWarehouseModalOpen(true)}
      className="bg-green-600 hover:bg-green-700 text-white"
    >
      <Warehouse className="mr-2 h-4 w-4" />
      Seleccionar Bodega
    </Button>

    <Button
      onClick={() => setArticleModalOpen(true)}
      className="bg-yellow-600 hover:bg-yellow-700 text-white"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Seleccionar Artículos
    </Button>
  </div>

  <Separator className="mt-6" />

      {/* Resumen de Cotización */}
      <div className="p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4">Resumen de Cotización</h2>

        {/* Sección Cliente & Bodega */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="h-full"
>
  <Card className="h-full flex flex-col justify-center items-center text-center p-6">
    {selectedClient ? (
      <>
        <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
          <img
            src={selectedClient.foto || "https://via.placeholder.com/100"}
            alt="Foto del cliente"
            className="w-24 h-24 rounded-full border shadow object-cover"
          />
          <div className="text-center sm:text-left">
            <CardTitle className="text-base sm:text-lg">
              Cliente: {selectedClient.cliente1}
            </CardTitle>
            <p className="text-muted-foreground text-sm">Información general del cliente</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm sm:text-base w-full">
          <p><strong>Nombre:</strong> {selectedClient.primerNombre} {selectedClient.segundoNombre || ""} {selectedClient.primerApellido}</p>
          <p><strong>Email:</strong> {selectedClient.email || "No disponible"}</p>
          <p><strong>Teléfono:</strong> {selectedClient.celular || "No disponible"}</p>
          <p><strong>Dirección:</strong> {selectedClient.direccion || "No disponible"}</p>
          <p><strong>Empresa:</strong> {selectedClient.empresa || "No disponible"}</p>
        </CardContent>
      </>
    ) : (
      <div className="py-12">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
          alt="Seleccionar cliente"
          className="w-20 h-20 mx-auto mb-4 opacity-70"
        />
        <p className="text-muted-foreground text-sm">
          Selecciona un cliente para realizar una cotización
        </p>
      </div>
    )}
  </Card>
</motion.div>


<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="h-full"
>
  <Card className="h-full flex flex-col justify-center items-center text-center p-6">
    {selectedWarehouse ? (
      <>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">📦 Bodega</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm sm:text-base w-full">
          <div className="flex items-start gap-2 flex-wrap">
            <Home size={16} className="mt-1" />
            <span><strong>Código:</strong> {selectedWarehouse.bodega1 || "No disponible"}</span>
          </div>
          <div className="flex items-start gap-2 flex-wrap">
            <Package size={16} className="mt-1" />
            <span><strong>Descripción:</strong> {selectedWarehouse.descripcion || "No disponible"}</span>
          </div>
          <div className="flex items-start gap-2 flex-wrap">
            <Home size={16} className="mt-1" />
            <span><strong>Dirección:</strong> {selectedWarehouse.direccion || "No disponible"}</span>
          </div>
          <div className="flex items-start gap-2 flex-wrap">
            <Home size={16} className="mt-1" />
            <span><strong>Región:</strong> {selectedWarehouse.region || "No disponible"}</span>
          </div>
          <div className="flex items-start gap-2 flex-wrap">
            <Phone size={16} className="mt-1" />
            <span><strong>Teléfono:</strong> {selectedWarehouse.telefono || "No disponible"}</span>
          </div>
          <div className="flex items-start gap-2 flex-wrap break-all">
            <Mail size={16} className="mt-1" />
            <span><strong>Correo:</strong> {selectedWarehouse.correo || "No disponible"}</span>
          </div>
        </CardContent>
      </>
    ) : (
      <div className="py-12">
        <img
          src="https://cdn-icons-png.flaticon.com/512/679/679720.png"
          alt="Seleccionar bodega"
          className="w-20 h-20 mx-auto mb-4 opacity-70"
        />
        <p className="text-muted-foreground text-sm">
          Selecciona una bodega para continuar con la cotización
        </p>
      </div>
    )}
  </Card>
</motion.div>

</div>


        <div className="space-y-6">

        {/* Notas del vendedor */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notas del vendedor</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Escribe alguna nota adicional..."
          />
        </div>

        {/* Tipo de pago */}
        <div className="space-y-2">
          <Label>Tipo de pago</Label>
          <Select value={paymentType} onValueChange={setPaymentType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un tipo de pago" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Efectivo">Efectivo</SelectItem>
              <SelectItem value="Tarjeta de crédito">Tarjeta de crédito</SelectItem>
              <SelectItem value="Transferencia bancaria">Transferencia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Moneda */}
        <div className="space-y-2">
          <Label>Moneda</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una moneda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GTQ">GTQ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Aplicar descuento */}
        <div className="flex items-center space-x-2">
          <Checkbox id="discount" checked={applyDiscount} onCheckedChange={setApplyDiscount} />
          <Label htmlFor="discount">Aplicar descuento del cliente</Label>
        </div>

        </div>

        {/* Tabla de Artículos Seleccionados */}
        <Card className="w-full">
  <CardHeader>
    <CardTitle className="text-base sm:text-lg">🛒 Artículos Seleccionados</CardTitle>
  </CardHeader>

  <CardContent>
    {selectedArticles.length > 0 ? (
      <>
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

        <div className="mt-4 text-right">
          <h3 className="text-xl font-bold">
            Total: <span className="text-green-600">Q{totalCotizacion.toFixed(2)}</span>
          </h3>
        </div>
      </>
    ) : (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
        <ShoppingCart size={40} className="mb-4 text-gray-400" />
        <p>No hay artículos seleccionados.</p>
        <p className="text-sm">Agrega productos para generar tu cotización.</p>
      </div>
    )}
  </CardContent>
</Card>
        
      </div>

      {/* Botón de Generar Cotización */}
      {selectedClient && selectedWarehouse && selectedArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-end mt-8 mb-16"
          >
            <Button
              onClick={handleGenerateQuote}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            >
              Generar Cotización
            </Button>
          </motion.div>
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

