'use client';

import { useEffect, useState } from 'react';
import QuotesService from '@/service/SoftbyteCommerce/Sales/Quotes/quotesService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BarChart as Chart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

import {
  TrendingUp,
  DollarSign,
  CreditCard,
  Package,
  User,
  BarChart as BarIcon,
} from 'lucide-react';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const MetricsPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const quotesService = new QuotesService();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const result = await quotesService.getMetricsQuotes();
        setMetrics(result?.data || {});
      } catch (err) {
        console.error('Error al obtener métricas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const cards = [
    {
      title: 'Total Cotizaciones',
      icon: <BarIcon className="text-blue-500 w-6 h-6" />,
      value: metrics?.totalCotizaciones || 0,
    },
    {
      title: 'Total Ingresos',
      icon: <DollarSign className="text-green-500 w-6 h-6" />,
      value: `Q${metrics?.totalIngresos?.toFixed(2) || '0.00'}`,
    },
    {
      title: 'Total Descuentos',
      icon: <CreditCard className="text-red-500 w-6 h-6" />,
      value: `Q${metrics?.totalDescuentos?.toFixed(2) || '0.00'}`,
    },
    {
      title: 'Total Impuestos',
      icon: <CreditCard className="text-yellow-500 w-6 h-6" />,
      value: `Q${metrics?.totalImpuestos?.toFixed(2) || '0.00'}`,
    },
    {
      title: 'Clientes Únicos',
      icon: <User className="text-purple-500 w-6 h-6" />,
      value: metrics?.clientesUnicos || 0,
    },
    {
      title: 'Prom. Artículos/Cotización',
      icon: <Package className="text-sky-500 w-6 h-6" />,
      value: metrics?.promedioArticulosPorCotizacion || 0,
    },
    {
      title: 'Prom. Cotizaciones/Mes',
      icon: <TrendingUp className="text-indigo-500 w-6 h-6" />,
      value: metrics?.promedioMensualCotizaciones || 0,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
        <TrendingUp className="text-purple-500" /> Dashboard de Cotizaciones
      </h1>
      <p className="text-muted-foreground text-sm">Resumen estadístico general.</p>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)
          : cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="shadow-md hover:shadow-lg transition duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    {card.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>

      {/* Gráfica mensual */}
      {metrics?.totalesPorMes?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>📆 Ingresos por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <Chart data={metrics.totalesPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </Chart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Cotizaciones por usuario */}
      {metrics?.cotizacionesPorUsuario?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>🧑‍💻 Cotizaciones por Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <Chart layout="vertical" data={metrics.cotizacionesPorUsuario}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="usuario" />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#10b981" />
              </Chart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Artículos más cotizados */}
      {metrics?.articulosMasCotizados?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>📦 Artículos Más Cotizados</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <Chart data={metrics.articulosMasCotizados}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="articulo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidadTotal" fill="#f59e0b" />
              </Chart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Cotizaciones por origen */}
      {metrics?.cotizacionesPorOrigen?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>🌍 Cotizaciones por Origen</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={metrics.cotizacionesPorOrigen}
                  dataKey="cantidad"
                  nameKey="origen"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#6366f1"
                  label
                >
                  {metrics.cotizacionesPorOrigen.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}


    <div className='pb-6'>
            {/* Tipos de pago */}
            {metrics?.tiposPago?.length > 0 && (
            <Card>
                <CardHeader>
                <CardTitle>💳 Tipos de Pago</CardTitle>
                </CardHeader>
                <CardContent className="pb-6"> {/* Espacio inferior añadido aquí */}
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                    <Pie
                        data={metrics.tiposPago}
                        dataKey="cantidad"
                        nameKey="tipo"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8b5cf6"
                        label
                    >
                        {metrics.tiposPago.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    </PieChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        )}
        </div>
    </div>
  );
};

export default MetricsPage;
