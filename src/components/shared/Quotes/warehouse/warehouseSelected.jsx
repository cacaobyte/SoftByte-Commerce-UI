"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FaWarehouse,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaUser,
  FaRegCalendarAlt,
} from "react-icons/fa";
import WarehouseService from "../../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";

const WarehouseSelected = ({ onSelectWarehouse }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [search, setSearch] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // Estado para la vista previa

  useEffect(() => {
    const fetchWarehouses = async () => {
      const service = new WarehouseService();
      try {
        const response = await service.getWarehouseActive();
        const formattedWarehouses = response.data.map((warehouse) => ({
          ...warehouse,
          foto: "/warehouse-placeholder.png", // Imagen por defecto para bodegas
        }));

        setWarehouses(formattedWarehouses);
        setFilteredWarehouses(formattedWarehouses);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  useEffect(() => {
    const filtered = warehouses.filter((warehouse) =>
      `${warehouse.bodega1} ${warehouse.descripcion} ${warehouse.departamento}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredWarehouses(filtered);
  }, [search, warehouses]);

  return (
    <motion.div className="flex flex-col md:flex-row w-full h-auto md:h-[600px] border rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Lista de bodegas */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 overflow-y-auto border-r">
        <Input
          placeholder="Buscar bodegas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 border border-gray-300 rounded-lg"
        />
        <ul>
          {filteredWarehouses.map((warehouse, index) => (
            <motion.li
              key={index}
              onClick={() => setSelectedWarehouse(warehouse)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`cursor-pointer p-3 rounded-lg flex items-center gap-3 hover:bg-blue-100 transition ${
                selectedWarehouse?.bodega1 === warehouse.bodega1
                  ? "bg-blue-200"
                  : ""
              }`}
            >
              <FaWarehouse className="text-gray-600 w-12 h-12" />
              <div>
                <p className="font-semibold">{warehouse.descripcion}</p>
                <p className="text-xs text-gray-500">{warehouse.departamento}, {warehouse.municipio}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Detalle de la bodega */}
      <div className="w-full md:w-2/3 p-6 flex flex-col items-center justify-center relative">
        {selectedWarehouse ? (
          <>
            {/* Vista Previa de Imagen */}
            {imagePreview && (
              <motion.div
                className="absolute bottom-4 right-4 w-32 h-32 rounded-lg shadow-lg border border-gray-300 overflow-hidden bg-white z-50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            {/* Contenedor de imagen con preview */}
            <motion.div
              className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-300 shadow-md flex items-center justify-center cursor-pointer bg-gray-200"
              whileHover={{ scale: 1.1 }}
              onMouseEnter={() => setImagePreview(selectedWarehouse.foto)}
              onMouseLeave={() => setImagePreview(null)}
            >
              <FaWarehouse className="text-gray-600 w-20 h-20" />
            </motion.div>

            <h2 className="text-2xl font-bold mt-4">
              {selectedWarehouse.descripcion}
            </h2>
            <p className="text-gray-500">{selectedWarehouse.region}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full px-8">
              <div className="border-b pb-2 flex items-center gap-2">
                <FaBuilding className="text-blue-600" />
                <p className="text-sm font-semibold">Departamento:</p>
                <p>{selectedWarehouse.departamento}</p>
              </div>
              <div className="border-b pb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <p className="text-sm font-semibold">Municipio:</p>
                <p>{selectedWarehouse.municipio}</p>
              </div>
              <div className="border-b pb-2 flex items-center gap-2">
                <FaPhone className="text-gray-600" />
                <p className="text-sm font-semibold">Teléfono:</p>
                <p>{selectedWarehouse.telefono || "No disponible"}</p>
              </div>
              <div className="border-b pb-2 flex items-center gap-2">
                <FaEnvelope className="text-yellow-500" />
                <p className="text-sm font-semibold">Correo:</p>
                <p>{selectedWarehouse.correo || "No disponible"}</p>
              </div>
              <div className="border-b pb-2 flex items-center gap-2">
                <FaUser className="text-purple-600" />
                <p className="text-sm font-semibold">Creado por:</p>
                <p>{selectedWarehouse.createdby}</p>
              </div>
              <div className="border-b pb-2 flex items-center gap-2">
                <FaRegCalendarAlt className="text-green-500" />
                <p className="text-sm font-semibold">Fecha Creación:</p>
                <p>
                  {new Date(selectedWarehouse.fechacreacion).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
              </div>
            </div>

            <Button
              className="mt-6 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
              onClick={() => onSelectWarehouse(selectedWarehouse)}
            >
              Seleccionar Bodega
            </Button>
          </>
        ) : (
          <p className="text-gray-500">Selecciona una bodega para ver detalles</p>
        )}
      </div>
    </motion.div>
  );
};

export default WarehouseSelected;
