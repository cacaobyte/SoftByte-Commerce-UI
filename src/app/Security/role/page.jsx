"use client";

import { useEffect, useState } from "react";
import RoleService from "../../../service/SoftbyteCommerce/Security/Role/RoleSecurityService";
import DataTable from "../../../components/DataTable/DataTable";
import GenericModal from "../../../components/shared/Modal/Modal";
import ConfirmationModal from "../../../components/shared/Modal/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import ProtectedPage from "../../../components/ProtectedPage";


// Definir columnas para DataTable con key
export const roleColumns = [
    { key: "nombreMostrar", label: "Nombre", type: "string" },   
    { key: "estado", label: "Activo", type: "boolean" }, 
    { key: "rol", label: "Rol", type: "string" },
    { key: "aplicacion", label: "Aplicación", type: "string" },
  ];
  


export default function RolesPage() {
  const hasMounted = useHasMounted();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const roleService = new RoleService();
        const response = await roleService.getRolls({});
  
        console.log("Response completa:", response);
  
        // Verificar si response tiene una propiedad 'data' con un array
        const rolesData = Array.isArray(response.data) ? response.data : response;
  
        if (!Array.isArray(rolesData)) {
          throw new Error("La respuesta del servicio no contiene un array.");
        }
  
        setRoles(rolesData);
      } catch (error) {
        console.error("Error al obtener roles:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchRoles();
  }, []);
  
  // Manejar activación/desactivación con confirmación
  const handleConfirmToggle = (role) => {
    setSelectedRole(role);
    setConfirmModalOpen(true);
  };

  const handleToggleStatus = async () => {
    if (!selectedRole) return;
    setUpdating(true);
    try {
      const roleService = new RoleService();
      await roleService.UpdateStatuRoll(selectedRole.idRol, !selectedRole.estado);


      // Actualizar estado en la UI
      setRoles((prev) =>
        prev.map((r) => (r.idRol === selectedRole.idRol ? { ...r, estado: !r.estado } : r))
      );
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    } finally {
      setConfirmModalOpen(false);
      setUpdating(false);
    }
  };

  // Manejar apertura del modal de detalles
  const handleViewDetails = (role) => {
    setSelectedRole(role);
    setDetailModalOpen(true);
  };

  // Definir acciones para la tabla
  const actions = [
    {
      label: "Ver",
      icon: Eye,
      variant: "outline",
      onClick: handleViewDetails,
    },
    {
      label: "Activar/Desactivar",
      icon: Checkbox,
      variant: "destructive",
      onClick: handleConfirmToggle,
    },
  ];

  if (!hasMounted) {
    return <LoadingScreen message="Cargando roles..." />;
  }

  return (
    <ProtectedPage>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Gestión de Roles</h1>

        {/* 📌 TABLA CON ROLES */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
          {loading ? (
            <LoadingScreen message="Cargando roles..." />
          ) : (
            <DataTable columns={roleColumns} data={roles} searchField="nombreMostrar" actions={actions} showActions = {true}/>
          )}
        </div>

        {/* 📌 MODAL DETALLE */}
        {selectedRole && (
          <GenericModal
            isOpen={detailModalOpen}
            onClose={() => setDetailModalOpen(false)}
            title="Detalles del Rol"
            data={selectedRole}
            model={roleColumns}
            hasImage={false}
          />
        )}

        {/* 📌 MODAL CONFIRMAR ACTIVACIÓN/DESACTIVACIÓN */}
        <ConfirmationModal
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={handleToggleStatus}
          title="Confirmar acción"
          description={`¿Estás seguro de que deseas ${selectedRole?.estado ? "desactivar" : "activar"} el rol "${selectedRole?.rol}"?`}
          confirmText={selectedRole?.estado ? "Desactivar" : "Activar"}
          loading={updating}
        />
      </div>
    </ProtectedPage>
  );
}
