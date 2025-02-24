"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import GrouperService from "../../../service/SoftbyteCommerce/Security/grouper/grouperService";
import DataTable from "../../../components/DataTable/DataTable";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import ProtectedPage from "../../../components/ProtectedPage";

export const grouperColumns = [
    { key: "nameAgrupador", label: "Nombre del Agrupador", type: "string" },
    { key: "nameMenu", label: "Menú", type: "string" },
    { key: "textoAgrupador", label: "Texto", type: "string" },
    { key: "icono", label: "Ícono", type: "icon" },
    { key: "estado", label: "Estado", type: "boolean" },
];

export default function GrouperPage() {
    const hasMounted = useHasMounted();
    const [groupers, setGroupers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGroupers();
    }, []);

    async function fetchGroupers() {
        try {
            const grouperService = new GrouperService();
            const response = await grouperService.getGroupers();
            setGroupers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error al obtener agrupadores:", error);
            toast.error("Error al obtener agrupadores.");
        } finally {
            setLoading(false);
        }
    }

    if (!hasMounted) {
        return <LoadingScreen message="Cargando agrupadores..." />;
    }

    return (
        <ProtectedPage>
            <div className="p-6">
                {/* ✅ Título de la Página */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Gestión de Agrupadores</h1>
                
                {/* ✅ Mensaje Explicativo */}
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Aquí puedes ver los módulos a los que tienes acceso de acuerdo con tu plan. 
                    Si necesitas más permisos, contacta al administrador del sistema.
                </p>

                {/* 📌 Tabla con los Agrupadores */}
                <DataTable 
                    columns={grouperColumns} 
                    data={groupers} 
                    searchField="nameAgrupador" 
                />
            </div>
        </ProtectedPage>
    );
}
