'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ClientsService from "../../../../service/SoftbyteCommerce/Sales/clients/clientsService";

const QuotesClients = ({ onSelectClient }) => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      const service = new ClientsService();
      try {
        const response = await service.getClients();
        const formattedClients = response.data.map(client => ({
          ...client, // Retornar todos los datos del cliente
          foto: client.foto || "/public/avatar.png", // Foto por defecto si no tiene
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
    const filtered = clients.filter(client =>
      `${client.primerNombre} ${client.primerApellido} ${client.cliente1}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [search, clients]);

  return (
    <motion.div className="flex w-full h-[600px] border rounded-lg overflow-hidden shadow-lg">
      {/* Lista de clientes */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto border-r">
        <Input
          placeholder="Buscar clientes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 border border-gray-300 rounded-lg"
        />
        <ul>
          {filteredClients.map((client, index) => (
            <li
              key={index}
              onClick={() => setSelectedClient(client)}
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
                <p className="font-semibold">{client.primerNombre} {client.primerApellido}</p>
                <p className="text-xs text-gray-500">{client.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Detalle del cliente */}
      <div className="w-2/3 p-6 flex flex-col items-center justify-center">
        {selectedClient ? (
          <>
            <motion.img
              src={selectedClient.foto}
              alt="Cliente"
              className="w-32 h-32 rounded-full object-cover mb-4 shadow-md border border-gray-300"
            />
            <h2 className="text-2xl font-bold">{selectedClient.primerNombre} {selectedClient.primerApellido}</h2>
            <p className="text-gray-500">{selectedClient.email || "Sin email"}</p>

            <div className="grid grid-cols-2 gap-4 mt-4 w-full px-8">
              <div className="border-b pb-2">
                <p className="text-sm font-semibold">📞 Teléfono:</p>
                <p>{selectedClient.celular || "No disponible"}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-semibold">📍 Dirección:</p>
                <p>{selectedClient.direccion || "No disponible"}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-semibold">🏢 Empresa:</p>
                <p>{selectedClient.empresa || "No disponible"}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-semibold">💼 Profesión:</p>
                <p>{selectedClient.profesion || "No disponible"}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-semibold">👤 Estado Civil:</p>
                <p>{selectedClient.estadoCivil || "No disponible"}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-semibold">🎂 Edad:</p>
                <p>{selectedClient.edad ? `${selectedClient.edad} años` : "No disponible"}</p>
              </div>
            </div>

            <Button
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
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
