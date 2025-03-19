"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ClientsService from "../../../service/SoftbyteCommerce/Sales/clients/clientsService";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import GenericModal from "../../../components/shared/Modal/Modal";
import { contactClientModel } from "../../../models/clients/contactModel";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 4;

const ClientContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const hasMounted = useHasMounted();
  const clientsService = new ClientsService();

  useEffect(() => {
    fetchClientContacts();
  }, []);

  const fetchClientContacts = async () => {
    try {
      const response = await clientsService.getContectClients();
      setContacts(response.data);
      setFilteredContacts(response.data);
    } catch (err) {
      console.error("Error al cargar los contactos de los clientes:", err);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = contacts.filter(
      (client) =>
        client.nombreCompleto?.toLowerCase().includes(query) ||
        client.celular?.includes(query) ||
        client.email?.toLowerCase().includes(query)
    );
    setFilteredContacts(filtered);
    setCurrentPage(1); // Resetear a la primera página tras búsqueda
  };

  // Calcular los datos de la página actual
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setDetailModalOpen(true);
  };

  if (!hasMounted) {
    return <LoadingScreen message="Cargando contactos de clientes..." />;
  }

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
        📞 Contactos de Clientes
      </h1>

      {/* Barra de Búsqueda */}
      <div className="flex justify-center mb-8">
        <Input
          type="text"
          placeholder="🔍 Buscar cliente por nombre, teléfono o correo..."
          value={search}
          onChange={handleSearch}
          className="w-1/2 shadow-md border border-gray-300 dark:border-gray-600 rounded-lg p-3"
        />
      </div>

      {/* Tarjetas de Contactos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentContacts.length > 0 ? (
          currentContacts.map((client) => (
            <motion.div
              key={client.cliente1}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center transition-all duration-300"
            >
              {/* Imagen */}
              <img
                src={client.foto || "/avatar.png"}
                alt={`Foto de ${client.nombreCompleto}`}
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600 shadow-md"
              />

              {/* Nombre */}
              <h3 className="text-xl font-semibold mt-4 text-center text-gray-900 dark:text-white">
                {client.nombreCompleto || "Sin nombre"}
              </h3>

              {/* Contacto */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-center">
                📧 {client.email || "Sin correo"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                📞 {client.celular || "Sin teléfono"}
              </p>

              {/* Botón Detalles */}
              <Button
                className="mt-5 w-full bg-gray-800 text-white hover:bg-gray-900 transition-all"
                onClick={() => handleViewDetails(client)}
              >
                Ver Detalles
              </Button>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No se encontraron contactos.</p>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-4">
          <Button
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-900"}`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <span className="text-lg font-semibold text-gray-700 dark:text-white">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-900"}`}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente 
          </Button>
        </div>
      )}

      {/* Modal de Detalles */}
      {selectedClient && (
        <GenericModal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title={`Detalles del Cliente - ${selectedClient.nombreCompleto}`}
          data={selectedClient}
          model={contactClientModel}
        />
      )}
    </div>
  );
};

export default ClientContactsPage;
