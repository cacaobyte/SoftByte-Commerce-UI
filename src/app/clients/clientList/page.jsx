"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DataTable from "../../../components/DataTable/DataTable";
import GenericModal from "../../../components/shared/Modal/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientsService from "../../../service/SoftbyteCommerce/Sales/clients/clientsService";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import { getClientActions } from "../.././../models/clients/clientsProps";

const ClientPage = () => {
    const [clients, setClients] = useState([]);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
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
  
    const handleView = (client) => {
      setSelectedClient(client);
      setDetailModalOpen(true);
    };
  
    const handleEdit = (client) => {
      // Lógica para editar cliente
      console.log("Editar cliente:", client);
    };
  
    const handleToggle = (client) => {
      // Lógica para activar/desactivar cliente
      console.log("Activar/Desactivar cliente:", client);
    };
  
    const actions = getClientActions({
      onView: handleView,
      onEdit: handleEdit,
      onToggle: handleToggle,
    });
  
    const clientColumns = [
      { key: "cliente1", label: "ID Cliente", type: "string" },
      { key: "primerNombre", label: "Nombre Completo", type: "string", render: (row) => `${row.primerNombre} ${row.primerApellido}` },
      { key: "celular", label: "Celular", type: "string" },
      { key: "email", label: "Email", type: "string" },
      { key: "direccion", label: "Dirección", type: "string" },
      { key: "activo", label: "Estado", type: "boolean", render: (row) => (row.activo ? "Activo" : "Inactivo") },
    ];
  
    if (!hasMounted) {
      return (
        <div>
          <LoadingScreen message="Preparando tu experiencia..." />
        </div>
      );
    }
  
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Clientes</h1>
          <Button className="bg-black text-white" onClick={fetchClients}>
            Refrescar
          </Button>
        </div>
  
        {/* 📦 TABLA DE CLIENTES */}
        <DataTable
          columns={clientColumns}
          data={clients}
          searchField="primerNombre"
          showActions={true}
          actions={actions}
        />
  
        {/* 📌 MODAL DETALLE */}
        {selectedClient && (
          <GenericModal
            isOpen={detailModalOpen}
            onClose={() => setDetailModalOpen(false)}
            title="Detalles del Cliente"
            data={selectedClient}
            model={clientColumns}
            hasImage={true} // Mostrar imagen del cliente
          />
        )}
      </div>
    );
  };
  
  export default ClientPage;
