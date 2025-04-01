'use client';
import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import DataTable from '../../../../components/shared/DataTable/DataTable';
import QuotesService from '.././../../../service/SoftbyteCommerce/Sales/Quotes/quotesService';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { Package } from 'lucide-react';
import ProtectedPage from '../../../../components/ProtectedPage';
import { columnsQuotes } from '../../../../models/Quotes/Quotes/QuotesModels';

export default function QuotesListPage() {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const quotesService = new QuotesService();

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const result = await quotesService.getAllQuotesStores();
  
      const formattedData = (result?.data || []).map((quote) => ({
        ...quote,
        fechaCreacion: format(new Date(quote.fechaCreacion), "d 'de' MMMM yyyy", {
          locale: es,
        }),
      }));
  
      setQuotes(formattedData);
    } catch (err) {
      toast.error('Error al cargar las cotizaciones');
    }
  };

  const handleView = (quote) => {
    setSelectedQuote(quote);
    setModalOpen(true);
  };



  return (
    <ProtectedPage>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Cotizaciones de mi tienda.</h1>
        <p className="text-muted-foreground text-sm mb-4">
          Visualiza el historial de cotizaciones realizadas por los vendedores.
        </p>

        <DataTable
          columns={columnsQuotes}
          data={quotes}
          searchField="nombreCliente"
          showActions={true}
          actions={[
            {
              label: 'Ver',
              icon: Eye ,
              onClick: handleView,
            },
          ]}
        />


        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] max-w-none max-h-[90vh] overflow-y-auto p-4 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg md:text-xl">Detalles de Cotización</DialogTitle>
            </DialogHeader>

            {selectedQuote && (
              <div className="space-y-6">
                {/* Información General */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg flex items-center gap-2">
                      🧾 Información General
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <p><strong>Cliente:</strong> {selectedQuote.nombreCliente} {selectedQuote.apellidoCliente}</p>
                    <p><strong>Correo:</strong> {selectedQuote.correo}</p>
                    <p><strong>Teléfono:</strong> {selectedQuote.telefono}</p>
                    <p><strong>Pago:</strong> {selectedQuote.tipoPago}</p>
                    <p><strong>Moneda:</strong> {selectedQuote.moneda}</p>
                    <p><strong>Estado:</strong> {selectedQuote.estado}</p>
                    <p><strong>Origen:</strong> {selectedQuote.origen}</p>
                    <p><strong>Notas:</strong> {selectedQuote.notas || 'N/A'}</p>
                    <p><strong>Fecha:</strong> {selectedQuote.fechaCreacion}</p>
                  </CardContent>
                </Card>

                {/* Detalle de Artículos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Detalle de Artículos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-4">
                    {selectedQuote.detalles?.length > 0 ? (
                      selectedQuote.detalles.map((item, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 shadow-sm bg-muted/50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
                        >
                          <p><strong>ID:</strong> {item.idArticulo}</p>
                          <p><strong>Artículo:</strong> {item.nombreArticulo}</p>
                          <p><strong>Cantidad:</strong> {item.cantidad}</p>
                          <p><strong>Precio:</strong> Q{item.precioUnitario.toFixed(2)}</p>
                          <p className="sm:col-span-2 md:col-span-1"><strong>Total:</strong> Q{item.total.toFixed(2)}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground">No hay artículos en esta cotización.</p>
                    )}

                    <Separator className="my-4" />

                    <div className="text-right space-y-1">
                      <p><strong>Subtotal:</strong> Q{selectedQuote.subtotal.toFixed(2)}</p>
                      <p><strong>Descuento:</strong> Q{selectedQuote.descuentoTotal.toFixed(2)}</p>
                      <p><strong>Impuestos:</strong> Q{selectedQuote.impuestos.toFixed(2)}</p>
                      <p className="text-lg font-semibold text-green-600">
                        <strong>Total:</strong> Q{selectedQuote.total.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedPage>
  );
}
