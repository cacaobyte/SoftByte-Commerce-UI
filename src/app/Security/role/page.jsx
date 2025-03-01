"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RoleService from "../../../service/SoftbyteCommerce/Security/Role/RoleSecurityService";
import DataTable from "../../../components/DataTable/DataTable";
import ConfirmationModal from "../../../components/shared/Modal/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Eye, PlusCircle, CheckCircle, XCircle } from "lucide-react";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import ProtectedPage from "../../../components/ProtectedPage";
import { roleColumns } from "../../../models/security/roleModels";
import ConfirmationModal from "../../../components/shared/Modal/ConfirmationModal";

export default function RolesPage() {
    const hasMounted = useHasMounted();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newRoleName, setNewRoleName] = useState("");

    useEffect(() => {
        fetchRoles();
    }, []);

    async function fetchRoles() {
        try {
            const roleService = new RoleService();
            const response = await roleService.getRolls({});
            const rolesData = Array.isArray(response.data) ? response.data : response;

            if (!Array.isArray(rolesData)) {
                throw new Error("La respuesta del servicio no contiene un array.");
            }

            setRoles(rolesData);
        } catch (error) {
            console.error("Error al obtener roles:", error);
            toast.error("Error al obtener roles.");
        } finally {
            setLoading(false);
        }
    }

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

            toast.success(`El rol "${selectedRole.rol}" ha sido ${selectedRole.estado ? "desactivado" : "activado"} correctamente.`);
        } catch (error) {
            console.error("Error al actualizar estado:", error);
            toast.error("Error al actualizar el estado del rol.");
        } finally {
            setConfirmModalOpen(false);
            setUpdating(false);
        }
    };

    // Crear nuevo rol
    const handleCreateRole = async () => {
        if (!newRoleName.trim()) {
            toast.warn("Debe ingresar el nombre del rol.");
            return;
        }

        // Si no hay idAplicaction, usar 0
        const newRoleAppId = roles[0]?.idAplicaction || 0;

        setCreating(true);
        try {
            const roleService = new RoleService();
            await roleService.createRoll({
                id: newRoleAppId, // ID de la aplicación obtenido automáticamente o 0 si no hay roles
                name: newRoleName,
                active: true, // Siempre activo por defecto
            });

            setIsCreateOpen(false);
            setNewRoleName("");
            fetchRoles(); // Recargar la lista de roles
            toast.success("Rol creado exitosamente.");
        } catch (error) {
            console.error("Error al crear rol:", error);
            toast.error("Error al crear el rol.");
        } finally {
            setCreating(false);
        }
    };

    // Definir acciones para la tabla
    const actions = [
        {
            label: "Ver",
            icon: Eye,
            variant: "outline",
            onClick: (role) => setSelectedRole(role),
        },
        {
            label: "Activar/Desactivar",
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
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Roles</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-2">
                            Administra los roles de usuario en el sistema. Aquí puedes <CheckCircle className="text-green-500 w-5 h-5" />
                            crear, <Eye className="text-blue-500 w-5 h-5" /> visualizar y <XCircle className="text-red-500 w-5 h-5" />
                            activar/desactivar roles.
                        </p>
                    </div>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-black text-white flex items-center gap-2">
                                <PlusCircle className="w-5 h-5" /> Nuevo Rol
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="p-6">
                            <DialogHeader>
                                <DialogTitle>Crear Nuevo Rol</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                {/* Mostramos la aplicación asociada */}
                                <div>
                                    <Label>Aplicación</Label>
                                    <Input
                                        type="text"
                                        value={roles[0]?.aplicacion || "No disponible"}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <Label>Nombre del Rol</Label>
                                    <Input
                                        type="text"
                                        placeholder="Ingrese el nombre del rol"
                                        value={newRoleName}
                                        onChange={(e) => setNewRoleName(e.target.value)}
                                    />
                                </div>
                                <Button onClick={handleCreateRole} disabled={creating} className="w-full bg-green-600 text-white">
                                    {creating ? "Creando..." : "Crear Rol"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* 📌 TABLA CON ROLES */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                    {loading ? (
                        <LoadingScreen message="Cargando roles..." />
                    ) : (
                        <DataTable columns={roleColumns} data={roles} searchField="nombreMostrar" actions={actions} showActions={true} />
                    )}
                </div>

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
