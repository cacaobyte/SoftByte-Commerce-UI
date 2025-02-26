"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UsersService from "../../../service/SoftbyteCommerce/Security/users/usersSecurityService";
import WarehouseService from "../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";

import DataTable from "../../../components/DataTable/DataTable";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import ProtectedPage from "../../../components/ProtectedPage";
import { usersColumns } from "../../../models/security/usersModel";
import ConfirmationModal from "../../../components/shared/Modal/ConfirmationModal";
import StepFormModal from "../../../components/shared/Forms/StepFormModal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { userModelInputs } from "../../../models/security/userInputModel";

export default function UsersPage() {
    const hasMounted = useHasMounted();
    const [users, setUsers] = useState([]);
    const [warehouses, setWarehouses] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchUsers();
        fetchWarehouses();
    }, []);

    async function fetchUsers() {
        try {
            const usersService = new UsersService();
            const response = await usersService.getAllUsers();

            const formattedUsers = Array.isArray(response.data) ? response.data.map(user => ({
                ...user,
                fechaNacimiento: user.fechaNacimiento
                    ? new Date(user.fechaNacimiento).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) 
                    : 'Sin fecha',
                createDate: user.createDate
                    ? new Date(user.createDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) 
                    : 'Sin fecha'
            })) : [];

            setUsers(formattedUsers);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            toast.error("Error al obtener usuarios.");
        } finally {
            setLoading(false);
        }
    }

    // 🔹 Función para abrir el modal de confirmación
    const openConfirmModal = (user) => {
        setSelectedUser(user);
        setConfirmModalOpen(true);
    };

    // 🔹 Función para cambiar el estado del usuario
    async function handleToggleStatus() {
        if (!selectedUser) return;

        setUpdating(true);
        try {
            const usersService = new UsersService();
            await usersService.UpdateStatusUser(selectedUser.userId);

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.userId === selectedUser.userId ? { ...user, estado: !user.estado } : user
                )
            );

            toast.success(`Usuario ${selectedUser.userName} ${selectedUser.estado ? "desactivado" : "activado"} correctamente.`);
        } catch (error) {
            toast.error("Error al actualizar el estado del usuario.");
        } finally {
            setUpdating(false);
            setConfirmModalOpen(false);
        }
    }

    async function fetchWarehouses() {
        try {
          const warehouseService = new WarehouseService();
          const response = await warehouseService.getWarehouseActive();
    
          // 🔹 Filtrar solo las bodegas activas
          const activeWarehouses = response.data
            .filter(bodega => bodega.activo) // Solo las activas
            .map(bodega => ({
              value: bodega.bodega1, // Código de la bodega
              label: `${bodega.bodega1} - ${bodega.descripcion}`, 
            }));
    
          setWarehouses(activeWarehouses);
        } catch (error) {
          console.error("Error al obtener bodegas activas:", error);
        }
      }

    // 🔹 Función para crear un nuevo usuario
    async function handleCreateUser(userData) {
        setCreating(true);
        try {
            const usersService = new UsersService();
            const formData = new FormData();
    
            Object.keys(userData).forEach((key) => {
                if (key === "foto" && userData[key] instanceof File) {
                    formData.append("imageFile", userData[key]);  // 🔹 Enviar la imagen correctamente
                } else {
                    formData.append(key, userData[key]);
                }
            });
    
            await usersService.createUsers(formData);
            toast.success("Usuario creado exitosamente.");
            setIsCreateOpen(false);
            fetchUsers();
        } catch (error) {
            console.error("Error al crear usuario:", error);
            toast.error("Error al crear usuario.");
        } finally {
            setCreating(false);
        }
    }
    

    const actions = [
        {
            label: "Activar/Desactivar",
            variant: "destructive",
            onClick: (user) => openConfirmModal(user),
        },
    ];

    if (!hasMounted) {
        return <LoadingScreen message="Cargando usuarios..." />;
    }

    return (
        <ProtectedPage>
            <div>
                En este apartado podras gestionar los usuarios de la aplicación.  
                <strong className="text-black"> Toma en cuenta que si desactivar un usuario este no podrá iniciar sesión al sistema.</strong>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Usuarios</h1>
                    <Button className="bg-black text-white flex items-center gap-2" onClick={() => setIsCreateOpen(true)}>
                        <PlusCircle className="w-5 h-5" /> Nuevo Usuario
                    </Button>
                </div>

                <DataTable columns={usersColumns} data={users} searchField="userName" actions={actions} showActions={true} />

                {/* 📌 Formulario Paso a Paso para Creación de Usuario */}

                <StepFormModal 
  isOpen={isCreateOpen} 
  onClose={() => setIsCreateOpen(false)} 
  title="Crear Usuario" 
  modelInputs={userModelInputs.map(input => 
    input.key === "celular" ? { ...input, options: warehouses } : input
  )}
  onSubmit={handleCreateUser}
  loading={creating}
/>


                {/* 📌 Modal de Confirmación para Activar/Desactivar Usuario */}
                <ConfirmationModal
                    isOpen={confirmModalOpen}
                    onClose={() => setConfirmModalOpen(false)}
                    onConfirm={handleToggleStatus}
                    title="Confirmar acción"
                    description={`¿Estás seguro de que deseas ${selectedUser?.estado ? "desactivar" : "activar"} al usuario "${selectedUser?.userName}"?`}
                    confirmText={selectedUser?.estado ? "Desactivar" : "Activar"}
                    loading={updating}
                />
            </div>
        </ProtectedPage>
    );
}
