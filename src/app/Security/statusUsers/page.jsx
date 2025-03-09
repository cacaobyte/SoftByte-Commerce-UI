"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UsersService from "../../../service/SoftbyteCommerce/Security/users/usersSecurityService";
import DataTable from "../../../components/DataTable/DataTable";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import ProtectedPage from "../../../components/ProtectedPage";
import { usersColumns } from "../../../models/security/usersModel";
import ConfirmationModal from "../../../components/shared/Modal/ConfirmationModal";

export default function UsersPage() {
    const hasMounted = useHasMounted();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchUsers();
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
                En este apartado podras gestionar los usuarios y su inicio de sesión dentro de tu organización.  
            </div>
            <div className="p-6">

                <DataTable columns={usersColumns} data={users} searchField="userName" actions={actions} showActions={true} />

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
