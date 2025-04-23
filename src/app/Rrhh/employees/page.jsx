"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable/DataTable";
import StepFormModal from "@/components/shared/Forms/StepFormModal";
import GenericModal from "@/components/shared/Modal/Modal";
import { PlusCircle, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHasMounted } from "@/hooks/useHasMounted";
import LoadingScreen from "@/components/UseHasMounted/LoadingScreen";

import EmployeeService from "@/service/SoftbyteCommerce/Rrhh/employeeService";
import DepartamentService from "@/service/SoftbyteCommerce/Rrhh/departamentService";
import PositionService from "@/service/SoftbyteCommerce/Rrhh/positionService";

import { employeeModelInputsCreate } from "@/models/Rrhh/employees/employeeModelInputsCreate";
import { employeeColumns } from "@/models/Rrhh/employees/employeeColumns";
import { employeeGenericModal } from "@/models/Rrhh/employees/employeeGenericModal";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [departaments, setDepartaments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const hasMounted = useHasMounted();

  const employeeService = new EmployeeService();
  const departamentService = new DepartamentService();
  const positionService = new PositionService();

  useEffect(() => {
    fetchEmployees();
    fetchDepartaments();
    fetchPositions();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await employeeService.getAllEmployees();
  
      if (!Array.isArray(res.data) || res.data.length === 0) {
        setEmployees([]); 
        return;
      }
  
      const formatted = res.data.map((emp) => ({
        ...emp,
        createdAt: emp.createdAt
          ? new Date(emp.createdAt).toLocaleDateString("es-ES")
          : null,
        updatedAt: emp.updatedAt
          ? new Date(emp.updatedAt).toLocaleDateString("es-ES")
          : null,
      }));
  
      setEmployees(formatted);
    } catch (error) {
      toast.error("Error al obtener empleados");
      console.error("Error al obtener empleados:", error);
    }
  };
  

  const fetchDepartaments = async () => {
    try {
      const res = await departamentService.getAllDepartaments();
      setDepartaments(res.data);
    } catch {
      toast.error("Error al obtener departamentos");
    }
  };

  const fetchPositions = async () => {
    try {
      const res = await positionService.getAllPositions();
      setPositions(res.data);
    } catch {
      toast.error("Error al obtener puestos");
    }
  };

  const sanitizeEmployeePayload = (formData) => {
    const dateFields = ["fechaNacimiento", "fechaIngreso", "fechaEgreso"];
    const numberFields = ["salario"];
  
    return Object.fromEntries(
      Object.entries(formData).flatMap(([key, value]) => {
        const normalizedKey = key.charAt(0).toLowerCase() + key.slice(1);
  
        // Manejo de fechas vacías
        if (dateFields.includes(normalizedKey) && value === "") {
          return [[normalizedKey, null]];
        }
  
        // Manejo de salario vacío: lo removemos si no es número válido
        if (numberFields.includes(normalizedKey)) {
          if (value === "" || value === null || isNaN(value)) {
            return []; // ← omitimos el campo del objeto
          }
          return [[normalizedKey, parseFloat(value)]];
        }
  
        return [[normalizedKey, value]];
      })
    );
  };
  

  

const handleCreateEmployee = async (formData) => {
  try {
    const payload = sanitizeEmployeePayload(formData);
    payload.createdBy = "admin";
    payload.updatedBy = "admin";

    await employeeService.CreateEmployees(payload);
    toast.success("Empleado creado exitosamente");
    setIsCreateOpen(false);
    fetchEmployees();
  } catch {
    toast.error("Error al crear empleado");
  }
};


  const handleEditEmployee = (employee) => {
    const normalized = employeeModelInputsCreate(departaments, positions).reduce((acc, field) => {
      const key = field.key;
      const backendKey = key.charAt(0).toLowerCase() + key.slice(1);
      acc[key] = employee[backendKey] ?? "";
      return acc;
    }, {});
    normalized.idEmpleado = employee.idEmpleado;
    setSelectedEmployee(normalized);
    setIsEditOpen(true);
  };

  const handleUpdateEmployee = async (formData) => {
    try {
      const payload = sanitizeEmployeePayload(formData);
      payload.idEmpleado = formData.idEmpleado;
      payload.updatedBy = "admin";
  
      await employeeService.UpdateEmployees(payload);
      toast.success("Empleado actualizado correctamente");
      setIsEditOpen(false);
      fetchEmployees();
    } catch {
      toast.error("Error al actualizar empleado");
    }
  };
  

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailOpen(true);
  };

  if (!hasMounted) return <LoadingScreen message="Cargando empleados..." />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Empleados</h1>
        <div className="flex gap-4">
          <Button className="bg-black text-white flex items-center gap-2" onClick={() => setIsCreateOpen(true)}>
            <PlusCircle className="w-5 h-5" /> Nuevo Empleado
          </Button>
          <Button onClick={fetchEmployees}>Refrescar</Button>
        </div>
      </div>

      {/* Crear */}
      <StepFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Crear Empleado"
        modelInputs={employeeModelInputsCreate(positions, departaments)}
        defaultValues={{}}
        onSubmit={handleCreateEmployee}
      />

      {/* Editar */}
      {isEditOpen && selectedEmployee && (
        <StepFormModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title="Actualizar Empleado"
          modelInputs={employeeModelInputsCreate(positions, departaments )}
          defaultValues={selectedEmployee}
          onSubmit={handleUpdateEmployee}
        />
      )}

      {/* Detalles */}
      {isDetailOpen && selectedEmployee && (
        <GenericModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Detalles del Empleado - ${selectedEmployee?.nombres} ${selectedEmployee?.apellidos}`}
          data={selectedEmployee}
          model={employeeGenericModal(departaments, positions)}
        />
      )}

      {/* Tabla */}
      <DataTable
        columns={employeeColumns}
        data={employees}
        searchField="nombres"
        showActions={true}
        actions={[
          { label: "Editar", icon: <Pencil className="w-4 h-4" />, onClick: handleEditEmployee },
          { label: "Ver Detalles", onClick: handleViewDetails },
        ]}
      />
    </div>
  );
};

export default EmployeesPage;
