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

  const clientColumns = [
    { key: "cliente1", label: "ID Cliente" },
    {
      key: "primerNombre",
      label: "Nombre Completo",
      render: (row) =>
        `${row.primerNombre} ${row.segundoNombre || ""} ${row.tercerNombre || ""} ${row.primerApellido} ${row.segundoApellido}`.replace(/\s+/g, " ").trim(),
    },
    {
        key: "foto",
        label: "Foto",
        render: (row) => (
          <div className="w-16 h-16">
            <img
              src={row.foto || "https://via.placeholder.com/150"}
              alt={`Foto de ${row.primerNombre}`}
              className="w-full h-full rounded-full object-cover border border-gray-300"
            />
          </div>
        ),
      },
      
    { key: "dpi", label: "DPI" },
    { key: "cf", label: "CF" },
    { key: "fechaNacimiento", label: "Fecha de Nacimiento", render: (row) => new Date(row.fechaNacimiento).toLocaleDateString("es-ES") },
    { key: "edad", label: "Edad" },
    { key: "celular", label: "Celular" },
    { key: "celular2", label: "Celular Secundario" },
    { key: "email", label: "Email" },
    { key: "direccion", label: "Dirección" },
    { key: "colonia", label: "Colonia" },
    { key: "zona", label: "Zona" },
    { key: "municipio", label: "Municipio" },
    { key: "departamento", label: "Departamento" },
    { key: "estadoCivil", label: "Estado Civil" },
    { key: "nacionalidad", label: "Nacionalidad" },
    { key: "profesion", label: "Profesión" },
    { key: "empresa", label: "Empresa" },
    { key: "nombreFactura", label: "Nombre Factura" },
    { key: "moneda", label: "Moneda" },
    { key: "descuento", label: "Descuento", render: (row) => `${row.descuento.toFixed(2)} %` },
    { key: "activo", label: "Estado", render: (row) => (row.activo ? "Activo" : "Inactivo") },
    { key: "notificar", label: "Notificar", render: (row) => (row.notificar ? "Sí" : "No") },
    { key: "recorddate", label: "Fecha de Registro", render: (row) => new Date(row.recorddate).toLocaleString("es-ES") },
    { key: "createby", label: "Creado por" },
    { key: "createdate", label: "Fecha de Creación", render: (row) => new Date(row.createdate).toLocaleString("es-ES") },
    { key: "updateby", label: "Actualizado por" },
    { key: "updatedate", label: "Fecha de Actualización", render: (row) => (row.updatedate ? new Date(row.updatedate).toLocaleString("es-ES") : "No actualizado") },
  ];
  

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
  model={[
    { key: "cliente1", label: "ID Cliente" },
    {
      key: "primerNombre",
      label: "Nombre Completo",
      render: (row) =>
        `${row.primerNombre} ${row.segundoNombre || ""} ${row.tercerNombre || ""} ${row.primerApellido} ${row.segundoApellido}`.replace(/\s+/g, " ").trim(),
    },
    {
      key: "foto",
      label: "Foto",
      type: "image", // Usaremos este tipo para renderizarlo como imagen en el modal
      render: (row) => (
        <div className="w-32 h-32 mx-auto mb-4">
          <img
            src={row.foto || "https://via.placeholder.com/150"}
            alt={`Foto de ${row.primerNombre}`}
            className="w-full h-full rounded-full object-cover border border-gray-300"
          />
        </div>
      ),
    },
    { key: "dpi", label: "DPI" },
    { key: "cf", label: "CF" },
    { key: "fechaNacimiento", label: "Fecha de Nacimiento", render: (row) => new Date(row.fechaNacimiento).toLocaleDateString("es-ES") },
    { key: "edad", label: "Edad" },
    { key: "celular", label: "Celular" },
    { key: "celular2", label: "Celular Secundario" },
    { key: "email", label: "Email" },
    { key: "direccion", label: "Dirección" },
    { key: "colonia", label: "Colonia" },
    { key: "zona", label: "Zona" },
    { key: "municipio", label: "Municipio" },
    { key: "departamento", label: "Departamento" },
    { key: "estadoCivil", label: "Estado Civil" },
    { key: "nacionalidad", label: "Nacionalidad" },
    { key: "profesion", label: "Profesión" },
    { key: "empresa", label: "Empresa" },
    { key: "nombreFactura", label: "Nombre Factura" },
    { key: "moneda", label: "Moneda" },
    { key: "descuento", label: "Descuento", render: (row) => `${row.descuento.toFixed(2)} %` },
    { key: "activo", label: "Estado", render: (row) => (row.activo ? "Activo" : "Inactivo") },
    { key: "notificar", label: "Notificar", render: (row) => (row.notificar ? "Sí" : "No") },
    { key: "recorddate", label: "Fecha de Registro", render: (row) => new Date(row.recorddate).toLocaleString("es-ES") },
    { key: "createby", label: "Creado por" },
    { key: "createdate", label: "Fecha de Creación", render: (row) => new Date(row.createdate).toLocaleString("es-ES") },
    { key: "updateby", label: "Actualizado por" },
    { key: "updatedate", label: "Fecha de Actualización", render: (row) => (row.updatedate ? new Date(row.updatedate).toLocaleString("es-ES") : "No actualizado") },
  ]}
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
