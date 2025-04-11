"use client";
import { useEffect, useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaStore,
  FaBoxOpen,
  FaCogs,
  FaBriefcase,
  FaChartPie,
  FaWarehouse,
  FaUserTie,
} from "react-icons/fa";
import { motion } from "framer-motion";
import HomeService from "../../../service/SoftbyteCommerce/home/homeService";
import { Skeleton } from "@/components/ui/skeleton";
import ProtectedPage from "@/components/ProtectedPage";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const homeService = new HomeService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await homeService.getHomeGeneral();
        setData(res?.data);
      } catch (err) {
        console.error("Error cargando datos generales:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const metrics = [
    {
      title: "Empresas",
      value: data?.totalEmpresas,
      icon: FaStore,
      color: "text-cyan-500",
      subtitle: "negocios que confían en nuestra plataforma",
    },
    {
      title: "Usuarios",
      value: data?.totalUsuarios,
      icon: FaUsers,
      color: "text-purple-500",
      subtitle: "personas registradas en todo el SaaS",
    },
    {
      title: "Clientes",
      value: data?.totalClientes,
      icon: FaUserTie,
      color: "text-rose-500",
      subtitle: "clientes atendidos por todos nuestros usuarios",
    },
    {
      title: "Cotizaciones",
      value: data?.totalCotizaciones,
      icon: FaChartLine,
      color: "text-blue-500",
      subtitle: "documentos generados en todas las empresas",
    },
    {
      title: "Categorías",
      value: data?.totalCategorias,
      icon: FaChartPie,
      color: "text-orange-500",
      subtitle: "tipos de productos organizados",
    },
    {
      title: "Artículos",
      value: data?.totalArticulos,
      icon: FaBoxOpen,
      color: "text-green-500",
      subtitle: "productos registrados en total",
    },
    {
      title: "Bodegas",
      value: data?.totalBodegas,
      icon: FaWarehouse,
      color: "text-yellow-500",
      subtitle: "almacenes gestionados por el sistema",
    },
    {
      title: "Stock Total",
      value: data?.totalExistenciaBodegas,
      icon: FaBoxOpen,
      color: "text-indigo-500",
      subtitle: "existencias registradas en tiempo real",
    },
    {
      title: "Roles",
      value: data?.totalRoles,
      icon: FaBriefcase,
      color: "text-red-500",
      subtitle: "perfiles de acceso configurados",
    },
  ];

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-6 py-12 space-y-12">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-4">
            Bienvenido al Universo SoftByte 🚀
          </h1>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Aquí puedes visualizar el impacto global de nuestra plataforma SaaS.
            Esta información no es específica de tu empresa, sino de **todo el ecosistema SoftByte Commerce**.
          </p>
        </motion.div>

        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))
            : metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 p-6 rounded-xl shadow-lg flex flex-col items-center text-center h-full">
                    <metric.icon
                      className={`text-5xl ${metric.color} mb-3`}
                    />
                    <h2 className="text-xl font-semibold">{metric.title}</h2>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                      {metric.value ?? "..."}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {metric.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
        </div>

        {/* Texto final */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-10"
        >
          <p className="text-md text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Gracias a cada una de las empresas que confían en nosotros. Seguimos
            construyendo un ecosistema digital sólido, escalable y confiable 💙
          </p>
        </motion.div>
      </div>
    </ProtectedPage>
  );
}
