"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "../../../components/DataTable/DataTable";
import GenericModal from "../../../components/shared/Modal/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientsService from "../../../service/SoftbyteCommerce/Sales/clients/clientsService";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import { clientColumns, clientModalModel } from "../../../models/clients/clientModel";

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const hasMounted = useHasMounted();
  const clientsService = new ClientsService();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await clientsService.getClients();
      setClients(response.data);
    } catch (err) {
      toast.error("Error al cargar los clientes.");
    }
  };

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setDetailModalOpen(true);
  };

  const handleViewPhoto = (client) => {
    setSelectedClient(client);
    setPhotoModalOpen(true);
  };

  if (!hasMounted) {
    return <LoadingScreen message="Preparando tu experiencia..." />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
        <Button onClick={fetchClients}>Refrescar</Button>
      </div>

      <DataTable
        columns={clientColumns}
        data={clients}
        searchField="primerNombre"
        showActions={true}
        actions={[
          {
            label: "Ver Detalles",
            onClick: handleViewDetails,
          },
          {
            label: "Ver Foto",
            onClick: handleViewPhoto,
          },
        ]}
      />

      {/* MODAL DETALLE */}
      {selectedClient && (
        <GenericModal
  isOpen={detailModalOpen}
  onClose={() => setDetailModalOpen(false)}
  title={`Detalles del Cliente - ${selectedClient.primerNombre} ${selectedClient.primerApellido}`}
  data={selectedClient}
  model={clientModalModel}
/>

      )}

      {/* MODAL FOTO */}
      {selectedClient && (
  <GenericModal
    isOpen={photoModalOpen}
    onClose={() => setPhotoModalOpen(false)}
    title={`Información de ${selectedClient.primerNombre}`}
    data={{
      image: selectedClient.foto,
      cliente1: selectedClient.cliente1,
      activo: selectedClient.activo ? "Activo" : "Inactivo",
    }}
    model={[
      { key: "cliente1", label: "ID Cliente" },
      { key: "activo", label: "Estado" },
      { key: "image", label: "Foto", type: "image" },
    ]}
    hasImage={true}
  />
)}

    </div>
  );
};

export default ClientPage;
