"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaUserTie,
  FaUser,
  FaBirthdayCake,
} from "react-icons/fa";
import ClientsService from "../../../../service/SoftbyteCommerce/Sales/clients/clientsService";

const QuotesClients = ({ onSelectClient }) => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [search, setSearch] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // Estado para la vista previa

  useEffect(() => {
    const fetchClients = async () => {
      const service = new ClientsService();
      try {
        const response = await service.getClients();
        const formattedClients = response.data.map((client) => ({
          ...client,
          foto: client.foto || "/avatar.png",
        }));

        formattedClients.unshift({
          cliente1: "",
          primerNombre: "Tienda",
          primerApellido: "PDV",
          email: "",
          foto: "/avatar.png",
          notificar: true,
          celular: "",
          direccion: "",
          empresa: "",
          estadoCivil: "",
          edad: "",
          profesion: "",
        });

        setClients(formattedClients);
        setFilteredClients(formattedClients);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const filtered = clients.filter((client) =>
      `${client.primerNombre} ${client.primerApellido} ${client.cliente1}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [search, clients]);

  return (
    <motion.div className="flex flex-col md:flex-row w-full h-auto md:h-[600px] border rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Lista de clientes */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 overflow-y-auto border-r">
        <Input
          placeholder="Buscar clientes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 border border-gray-300 rounded-lg"
        />
        <ul>
        {filteredClients.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              No se encontraron clientes registrados.
            </p>
            <p className="text-sm text-gray-500">
              Registra nuevos clientes o verifica los filtros de búsqueda.
            </p>
          </div>
        ) : (
          filteredClients.map((client, index) => (
            <motion.li
              key={index}
              onClick={() => setSelectedClient(client)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`cursor-pointer p-3 rounded-lg flex items-center gap-3 hover:bg-blue-100 transition ${
                selectedClient?.cliente1 === client.cliente1 ? "bg-blue-200" : ""
              }`}
            >
              <img
                src={client.foto}
                alt="Foto cliente"
                className="w-12 h-12 rounded-full object-cover border border-gray-300"
              />
              <div>
                <p className="font-semibold">
                  {client.primerNombre} {client.primerApellido}
                </p>
                <p className="text-xs text-gray-500">{client.email}</p>
              </div>
            </motion.li>
          ))
        )}
        </ul>
      </div>

      {/* Detalle del cliente */}
      <div className="w-full md:w-2/3 p-6 flex flex-col items-center justify-center relative">
        {selectedClient ? (
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
              className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-300 shadow-md flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onMouseEnter={() => setImagePreview(selectedClient.foto)}
              onMouseLeave={() => setImagePreview(null)}
            >
              <img
                src={selectedClient.foto}
                alt="Cliente"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <h2 className="text-2xl font-bold mt-4">
              {selectedClient.primerNombre} {selectedClient.primerApellido}
            </h2>
            <p className="text-gray-500">{selectedClient.email || "Sin email"}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full px-8">
              <div className="border-b pb-2 flex items-center gap-2">
                <FaPhone className="text-gray-600" />
                <p className="text-sm font-semibold">Teléfono:</p>
                <p>{selectedClient.celular || "No disponible"}</p>
              </div>
              <div className="border-b pb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <p className="text-sm font-semibold">Dirección:</p>
                <p>{selectedClient.direccion || "No disponible"}</p>
              </div>
              <div className="border-b pb-2 flex items-center gap-2">
                <FaBuilding className="text-blue-600" />
                <p className="text-sm font-semibold">Empresa:</p>
                <p>{selectedClient.empresa || "No disponible"}</p>
              </div>
              <div className="border-b pb-2 flex items-center gap-2">
                <FaUserTie className="text-yellow-500" />
                <p className="text-sm font-semibold">Profesión:</p>
                <p>{selectedClient.profesion || "No disponible"}</p>
              </div>
              <div className="border-b pb-2 flex items-center gap-2">
                <FaUser className="text-purple-600" />
                <p className="text-sm font-semibold">Estado Civil:</p>
                <p>{selectedClient.estadoCivil || "No disponible"}</p>
              </div>
              <div className="border-b pb-2 flex items-center gap-2">
                <FaBirthdayCake className="text-pink-500" />
                <p className="text-sm font-semibold">Edad:</p>
                <p>
                  {selectedClient.edad ? `${selectedClient.edad} años` : "No disponible"}
                </p>
              </div>
            </div>

            <Button
              className="mt-6 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
              onClick={() => onSelectClient(selectedClient)}
            >
              Seleccionar Cliente
            </Button>
          </>
        ) : (
          <p className="text-gray-500">Selecciona un cliente para ver detalles</p>
        )}
      </div>
    </motion.div>
  );
};

export default QuotesClients;
