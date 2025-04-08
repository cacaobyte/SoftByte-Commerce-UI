"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable/DataTable";
import StepFormModal from "@/components/shared/Forms/StepFormModal";
import GenericModal from "@/components/shared/Modal/Modal";
import { PlusCircle, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { departamentModelInputs } from "../../../models/Rrhh/departamentModelInputs";
import DepartamentService from "../../../service/SoftbyteCommerce/Rrhh/departamentService";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";

const DepartamentsPage = () => {
  const [departaments, setDepartaments] = useState([]);
  const [selectedDepartament, setSelectedDepartament] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const hasMounted = useHasMounted();
  const departamentService = new DepartamentService();

  useEffect(() => {
    fetchDepartaments();
  }, []);

  const fetchDepartaments = async () => {
    try {
      const response = await departamentService.getAllDepartaments();
      setDepartaments(response.data);
    } catch (err) {
      toast.error("Error al cargar los departamentos.");
    }
  };

  const handleCreateDepartament = async (formData) => {
    try {
      // Convertimos a claves que espera el backend (minúscula inicial)
      const payload = Object.keys(formData).reduce((acc, key) => {
        acc[key.charAt(0).toLowerCase() + key.slice(1)] = formData[key];
        return acc;
      }, {});
      payload.CreatedBy = "admin";
      payload.UpdatedBy = "admin";

      await departamentService.CreateDepartaments(payload);
      toast.success("Departamento creado exitosamente");
      setIsCreateOpen(false);
      fetchDepartaments();
    } catch (error) {
      toast.error("No se pudo crear el departamento");
      console.error("Error al crear departamento:", error);
    }
  };

  const handleEditDepartament = (departament) => {
    // Normalizar según los nombres en el modelo
    const normalized = departamentModelInputs.reduce((acc, field) => {
      const key = field.key;
      const backendKey = key.charAt(0).toLowerCase() + key.slice(1);
      acc[key] = departament[backendKey] ?? "";
      return acc;
    }, {});
    setSelectedDepartament(normalized);
    setIsEditOpen(true);
  };

  const handleUpdateDepartament = async (formData) => {
    try {
      const payload = Object.keys(formData).reduce((acc, key) => {
        acc[key.charAt(0).toLowerCase() + key.slice(1)] = formData[key];
        return acc;
      }, {});
      payload.UpdatedBy = "admin";
      payload.UpdatedAt = new Date();

      await departamentService.UpdateDepartament(payload);
      toast.success("Departamento actualizado correctamente");
      setIsEditOpen(false);
      fetchDepartaments();
    } catch (error) {
      toast.error("No se pudo actualizar el departamento");
      console.error("Error al actualizar:", error);
    }
  };

  const handleViewDetails = (departament) => {
    setSelectedDepartament(departament);
    setIsDetailOpen(true);
  };

  const departamentColumns = [
    { key: "nombreDepartamento", label: "Nombre del Departamento" },
    { key: "descripcion", label: "Descripción" },
    { key: "codigoDepartamento", label: "Código" },
    { key: "ubicacionFisica", label: "Ubicación Física" },
    { key: "correoContacto", label: "Correo de Contacto" },
    { key: "estado", label: "Estado" },
    { key: "observaciones", label: "Observaciones" },
  ];

  if (!hasMounted) return <LoadingScreen message="Cargando departamentos..." />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Departamentos</h1>
        <div className="flex gap-4">
          <Button className="bg-black text-white flex items-center gap-2" onClick={() => setIsCreateOpen(true)}>
            <PlusCircle className="w-5 h-5" /> Nuevo Departamento
          </Button>
          <Button onClick={fetchDepartaments}>Refrescar</Button>
        </div>
      </div>

      {/* Modal Crear */}
      <StepFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Crear Departamento"
        modelInputs={departamentModelInputs}
        onSubmit={handleCreateDepartament}
      />

      {/* Modal Editar */}
      {isEditOpen && selectedDepartament && (
        <StepFormModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title="Actualizar Departamento"
          modelInputs={departamentModelInputs}
          defaultValues={selectedDepartament}
          onSubmit={handleUpdateDepartament}
        />
      )}

      {/* Modal Detalles */}
      {isDetailOpen && selectedDepartament && (
        <GenericModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Detalles del Departamento - ${selectedDepartament?.NombreDepartamento}`}
          data={selectedDepartament}
          model={departamentModelInputs}
        />
      )}

      {/* Tabla */}
      <DataTable
        columns={departamentColumns}
        data={departaments}
        searchField="nombreDepartamento"
        showActions={true}
        actions={[
          {
            label: "Editar",
            icon: <Pencil className="w-4 h-4" />,
            onClick: handleEditDepartament,
          },
          {
            label: "Ver Detalles",
            onClick: handleViewDetails,
          },
        ]}
      />
    </div>
  );
};

export default DepartamentsPage;
