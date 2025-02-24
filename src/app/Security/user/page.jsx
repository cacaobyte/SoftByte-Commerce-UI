"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UsersService from "../../../service/SoftbyteCommerce/Security/users/usersSecurityService";
import DataTable from "../../../components/DataTable/DataTable";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import ProtectedPage from "../../../components/ProtectedPage";
import { usersColumns } from "../../../models/security/usersModel";


export default function UsersPage() {
    const hasMounted = useHasMounted();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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
    

    if (!hasMounted) {
        return <LoadingScreen message="Cargando usuarios..." />;
    }

    return (
        <ProtectedPage>
            <div className="p-6">
                {/* ✅ Título de la Página */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Gestión de Usuarios</h1>
                
                {/* ✅ Mensaje Explicativo */}
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Aquí puedes ver la lista de usuarios registrados en el sistema. 
                    Contacta al administrador si necesitas realizar cambios.
                </p>

                {/* 📌 Tabla con los Usuarios */}
                <DataTable 
                    columns={usersColumns} 
                    data={users} 
                    searchField="userName" 
                />
            </div>
        </ProtectedPage>
    );
}
