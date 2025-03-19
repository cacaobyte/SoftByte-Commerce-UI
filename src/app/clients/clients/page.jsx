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
import { clientColumns, clientModalModel, photoModal } from "../../../models/clients/clientModel";
import StepFormModal from "../../../components/shared/Forms/StepFormModal";
import { clientModelInputs } from "../../../models/clients/clientModelInputs";
import { PlusCircle, Pencil } from "lucide-react"

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
   const [isCreateOpen, setIsCreateOpen] = useState(false);
   const [isEditOpen, setIsEditOpen] = useState(false);
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

    // 🔹 Manejar la apertura del modal de edición
    const handleEditClient = (client) => {
      // Normalizar los nombres de las claves
      const normalizedClient = Object.keys(client).reduce((acc, key) => {
        // Convertir la primera letra de cada clave a mayúscula para que coincida con el modelInput
        const newKey = key.charAt(0).toUpperCase() + key.slice(1);
        acc[newKey] = client[key];
        return acc;
      }, {});
    
      setSelectedClient(normalizedClient);
      setIsEditOpen(true);
    };
    

  const handleCreateClient = async (formData) => {
    try {
        const clientFormData = new FormData();

        // ✅ Asegurar que Cliente1 siempre se envía
        clientFormData.append("Cliente1", formData.Cliente1 ? formData.Cliente1 : ""); 

        // ✅ Agregar los demás datos del formulario a FormData
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== undefined && formData[key] !== null) {
                clientFormData.append(key, formData[key]);
            }
        });

        // ✅ Verificar si la imagen está presente antes de agregarla
        if (formData.foto && formData.foto instanceof File) {
            console.log("Imagen detectada en el formulario:", formData.foto);
            clientFormData.append("imageFile", formData.foto);
        } else {
            console.warn("⚠️ No se encontró ninguna imagen en el formulario.");
        }

        // 🔹 Llamar al servicio para crear el cliente
        await clientsService.createClients(clientFormData);

        toast.success("Cliente creado exitosamente");

        // 🔹 Cerrar el modal después de la creación
        setIsCreateOpen(false);
    } catch (error) {
        console.error("Error al crear el cliente:", error);
        toast.error("No se pudo crear el cliente. Inténtalo de nuevo.");
    }
};


  // 🔹 Actualizar cliente
  const handleUpdateClient = async (formData) => {
    try {
      const clientFormData = new FormData();
      clientFormData.append("Cliente1", selectedClient?.cliente1); 

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== undefined && formData[key] !== null) {
          clientFormData.append(key, formData[key]);
        }
      });

      if (formData.foto && formData.foto instanceof File) {
        clientFormData.append("imageFile", formData.foto);
      }

      await clientsService.updateClient(clientFormData);
      toast.success("Cliente actualizado correctamente");
      setIsEditOpen(false);
      fetchClients();
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      toast.error("No se pudo actualizar el cliente.");
    }
  };



  if (!hasMounted) {
    return <LoadingScreen message="Preparando tu experiencia..." />;
  }

  return (
    <div className="p-6">
<div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
  <div className="flex gap-4">
    {/* Botón para abrir el modal de creación de clientes */}
    <Button className="bg-black text-white flex items-center gap-2" onClick={() => setIsCreateOpen(true)}>
      <PlusCircle className="w-5 h-5" /> Nuevo Cliente
    </Button>

    {/* Botón para refrescar la tabla */}
    <Button onClick={fetchClients}>Refrescar</Button>
  </div>
</div>

      <StepFormModal 
  isOpen={isCreateOpen} 
  onClose={() => setIsCreateOpen(false)} 
  title="Crear Cliente" 
  modelInputs={clientModelInputs}
  onSubmit={handleCreateClient} 
/>


{/* MODAL EDITAR CLIENTE */}
{isEditOpen && selectedClient && (
  <StepFormModal 
    isOpen={isEditOpen} 
    onClose={() => setIsEditOpen(false)} 
    title="Actualizar Cliente" 
    modelInputs={clientModelInputs}
    defaultValues={selectedClient} // ✅ Ahora enviamos las claves normalizadas
    onSubmit={handleUpdateClient} 
  />
)}



      <DataTable
        columns={clientColumns}
        data={clients}
        searchField="primerNombre"
        showActions={true}
        actions={[
          {
            label: "Editar",
            icon: <Pencil className="w-4 h-4" />,
            onClick: handleEditClient,
          },
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
    model={photoModal}
    hasImage={true}
  />
)}

    </div>
  );
};

export default ClientPage;
