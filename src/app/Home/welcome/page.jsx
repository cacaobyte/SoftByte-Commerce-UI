"use client";
import { useHasMounted } from '../../../hooks/useHasMounted';
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import ProtectedPage from '../../../components/ProtectedPage';
import { motion } from "framer-motion";
import { FaStore, FaChartLine, FaUsers, FaBoxOpen, FaCogs, FaBriefcase, FaChartPie } from "react-icons/fa";

export default function Home() {
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <LoadingScreen message="Preparando tu experiencia..." />
      </div>
    );
  }

  return (
    <ProtectedPage>
      <div className="flex flex-col items-center justify-center min-h-screen 
        bg-gradient-to-br from-white via-gray-100 to-blue-200 
        dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 
        text-gray-900 dark:text-white px-6 transition-all duration-300">
        
        {/* LOGO & TÍTULO */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <img src="/Logo_CacaoByte_S.A.png" alt="Softbyte Commerce" className="w-32 h-32 mx-auto mb-4"/>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600 dark:from-purple-400 dark:to-cyan-500">
            Softbyte Commerce
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
            El sistema PDV innovador de <span className="text-cyan-500 font-semibold dark:text-cyan-400">CacaoByte S.A.</span>
          </p>
        </motion.div>

        {/* SECCIÓN DE FUNCIONALIDADES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[
            { icon: FaStore, title: "Punto de Venta", desc: "Administra tus ventas en tiempo real.", color: "text-cyan-500 dark:text-cyan-400" },
            { icon: FaChartLine, title: "Reportes", desc: "Análisis detallado de rendimiento.", color: "text-blue-500 dark:text-blue-400" },
            { icon: FaUsers, title: "Gestión de Usuarios", desc: "Roles y permisos avanzados.", color: "text-purple-500 dark:text-purple-400" },
            { icon: FaBoxOpen, title: "Inventario", desc: "Optimiza el control de tus productos.", color: "text-green-500 dark:text-green-400" },
            { icon: FaCogs, title: "Configuraciones", desc: "Personaliza tu sistema.", color: "text-yellow-500 dark:text-yellow-400" },
            { icon: FaBriefcase, title: "Recursos Humanos", desc: "Gestión de empleados y nóminas.", color: "text-red-500 dark:text-red-400" }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.07, rotateX: 5, rotateY: 5 }} 
              transition={{ duration: 0.4 }}
              className="p-6 bg-white shadow-md dark:bg-white/10 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/20 flex flex-col items-center text-center"
            >
              <item.icon className={`text-5xl ${item.color} mb-4`} />
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* SECCIÓN DE MÉTRICAS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[
            { title: "Total de Ventas", value: "$125,890", icon: FaChartPie, color: "text-cyan-500 dark:text-cyan-400" },
            { title: "Usuarios Activos", value: "1,240", icon: FaUsers, color: "text-purple-500 dark:text-purple-400" },
            { title: "Inventario Disponible", value: "8,750 productos", icon: FaBoxOpen, color: "text-green-500 dark:text-green-400" },
          ].map((metric, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05 }} 
              transition={{ duration: 0.3 }}
              className="p-6 bg-white shadow-md dark:bg-white/10 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/20 flex flex-col items-center text-center"
            >
              <metric.icon className={`text-5xl ${metric.color} mb-4`} />
              <h2 className="text-lg font-semibold">{metric.title}</h2>
              <p className="text-2xl font-bold text-gray-700 dark:text-gray-200 mt-2">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        {/* BOTÓN DE ACCIÓN */}
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          transition={{ duration: 0.3 }}
          className="mt-10 px-8 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-cyan-500 dark:hover:bg-cyan-600 transition-all duration-300 text-white text-lg font-semibold rounded-lg shadow-lg"
          onClick={() => alert('¡Acción realizada!')}
        >
          Explorar Dashboard
        </motion.button>

        {/* PIE DE PÁGINA */}
        <div className="mt-12 text-gray-500 dark:text-gray-400 text-sm">
          <p>Softbyte Commerce - Un producto de <span className="text-blue-500 dark:text-cyan-400">CacaoByte S.A.</span></p>
        </div>
      </div>
    </ProtectedPage>
  );
}
