"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "../../../components/DataTable/DataTable";
import StepFormModal from "../../../components/shared/Forms/StepFormModal";
import GenericModal from "../../../components/shared/Modal/Modal";
import { PlusCircle, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { positionModelInputsCreate } from "../../../models/Rrhh/positions/positionModelInputsCreate";
import PositionService from "../../../service/SoftbyteCommerce/Rrhh/positionService";
import DepartamentService from "../../../service/SoftbyteCommerce/Rrhh/departamentService";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";

const PositionsPage = () => {
  const [positions, setPositions] = useState([]);
  const [departaments, setDepartaments] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const hasMounted = useHasMounted();

  const positionService = new PositionService();
  const departamentService = new DepartamentService();

  useEffect(() => {
    fetchPositions();
    fetchDepartaments();
  }, []);

  const fetchPositions = async () => {
    try {
      const res = await positionService.getAllPositions();
      setPositions(res.data);
    } catch (err) {
      toast.error("Error al obtener puestos");
    }
  };

  const fetchDepartaments = async () => {
    try {
      const res = await departamentService.getAllDepartaments();
      setDepartaments(res.data);
    } catch (err) {
      toast.error("Error al obtener departamentos");
    }
  };

  const handleCreatePosition = async (formData) => {
    try {
      const payload = Object.keys(formData).reduce((acc, key) => {
        acc[key.charAt(0).toLowerCase() + key.slice(1)] = formData[key];
        return acc;
      }, {});
      payload.createdBy = "admin";
      payload.updatedBy = "admin";
      payload.nombreDepartamento = departaments.find(
        (d) => d.idDepartamento === payload.idDepartamento
      )?.nombreDepartamento;

      await positionService.CreatePositions(payload);
      toast.success("Puesto creado exitosamente");
      setIsCreateOpen(false);
      fetchPositions();
    } catch (err) {
      toast.error("Error al crear puesto");
    }
  };

  const handleEditPosition = (position) => {
    const normalized = positionModelInputsCreate(departaments).reduce((acc, field) => {
      const key = field.key;
      const backendKey = key.charAt(0).toLowerCase() + key.slice(1);
      acc[key] = position[backendKey] ?? "";
      return acc;
    }, {});
    setSelectedPosition(normalized);
    setIsEditOpen(true);
  };

  const handleUpdatePosition = async (formData) => {
    try {
      const payload = Object.keys(formData).reduce((acc, key) => {
        acc[key.charAt(0).toLowerCase() + key.slice(1)] = formData[key];
        return acc;
      }, {});

      const pos = positions.find((p) => p.codigoPuesto === payload.codigoPuesto);
      payload.idPuesto = pos?.idPuesto;
      payload.updatedBy = "admin";

      await positionService.UpdatePositions(payload);
      toast.success("Puesto actualizado correctamente");
      setIsEditOpen(false);
      fetchPositions();
    } catch (error) {
      toast.error("Error al actualizar puesto");
    }
  };

  const handleViewDetails = (position) => {
    setSelectedPosition(position);
    setIsDetailOpen(true);
  };

  const positionColumns = [
    { key: "nombrePuesto", label: "Nombre del Puesto" },
    { key: "descripcion", label: "Descripción" },
    { key: "codigoPuesto", label: "Código" },
    { key: "nivelJerarquico", label: "Nivel Jerárquico" },
    { key: "tipoPuesto", label: "Tipo" },
    { key: "sueldoBase", label: "Sueldo" },
    { key: "modalidadTrabajo", label: "Modalidad" },
    { key: "estado", label: "Estado" },
    { key: "nombreDepartamento", label: "Departamento" },
  ];

  if (!hasMounted) return <LoadingScreen message="Cargando puestos..." />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Puestos</h1>
        <div className="flex gap-4">
          <Button
            className="bg-black text-white flex items-center gap-2"
            onClick={() => setIsCreateOpen(true)}
          >
            <PlusCircle className="w-5 h-5" /> Nuevo Puesto
          </Button>
          <Button onClick={fetchPositions}>Refrescar</Button>
        </div>
      </div>

      {/* Crear */}
      <StepFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Crear Puesto"
        modelInputs={positionModelInputsCreate(departaments)}
        defaultValues={{}}
        onSubmit={handleCreatePosition}
      />

      {/* Editar */}
      {isEditOpen && selectedPosition && (
        <StepFormModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title="Actualizar Puesto"
          modelInputs={positionModelInputsCreate(departaments)}
          defaultValues={selectedPosition}
          onSubmit={handleUpdatePosition}
        />
      )}

      {/* Detalles */}
      {isDetailOpen && selectedPosition && (
        <GenericModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Detalles del Puesto - ${selectedPosition?.nombrePuesto}`}
          data={selectedPosition}
          model={positionModelInputsCreate(departaments)}
        />
      )}

      {/* Tabla */}
      <DataTable
        columns={positionColumns}
        data={positions}
        searchField="nombrePuesto"
        showActions={true}
        actions={[
          {
            label: "Editar",
            icon: <Pencil className="w-4 h-4" />,
            onClick: handleEditPosition,
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

export default PositionsPage;
