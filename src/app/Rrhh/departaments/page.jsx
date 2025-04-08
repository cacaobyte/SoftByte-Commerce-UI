"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable/DataTable";
import StepFormModal from "@/components/shared/Forms/StepFormModal";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { departamentModelInputs } from "../../../models/Rrhh/departamentModelInputs";
import DepartamentService from "../../../service/SoftbyteCommerce/Rrhh/departamentService";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";

const DepartamentsPage = () => {
  const [departaments, setDepartaments] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
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
      const payload = {
        ...formData,
        CreatedBy: "admin", // Sustituir por usuario actual si aplica
        CreatedAt: new Date(),
        UpdatedBy: "admin",
        UpdatedAt: new Date(),
      };

      await departamentService.CreateDepartaments(payload);
      toast.success("Departamento creado exitosamente");
      setIsCreateOpen(false);
      fetchDepartaments();
    } catch (error) {
      toast.error("No se pudo crear el departamento");
      console.error("Error al crear departamento:", error);
    }
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
          <Button
            className="bg-black text-white flex items-center gap-2"
            onClick={() => setIsCreateOpen(true)}
          >
            <PlusCircle className="w-5 h-5" /> Nuevo Departamento
          </Button>
          <Button onClick={fetchDepartaments}>Refrescar</Button>
        </div>
      </div>

      {/* MODAL CREAR */}
      <StepFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Crear Departamento"
        modelInputs={departamentModelInputs}
        onSubmit={handleCreateDepartament}
      />

      {/* DATATABLE */}
      <DataTable
        columns={departamentColumns}
        data={departaments}
        searchField="nombreDepartamento"
        showActions={false}
      />
    </div>
  );
};

export default DepartamentsPage;
