"use client";
import { motion } from "framer-motion";
import { Construction, Clock } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gradient-to-br from-gray-800 to-gray-700 bg-opacity-90 rounded-3xl p-12 shadow-2xl max-w-2xl text-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex items-center justify-center mb-6"
        >
          <Construction size={100} className="text-yellow-500 drop-shadow-lg" />
        </motion.div>
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">
          Página en Construcción
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Estamos trabajando para traerte esta sección pronto. ¡Regresa para ver las novedades!
        </p>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Clock size={50} className="text-gray-400 mx-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
}
