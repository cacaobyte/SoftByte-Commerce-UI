"use client";
import { useEffect, useState } from "react";
import OptionUserService from "../../../service/SoftbyteCommerce/Security/optionUser/optionUserService";
import { toast } from "react-toastify";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import { Input } from "@/components/ui/input";
import UserOptionsList from "../../../components/shared/security/UserOptionsList"; 
import UsersService from "../../../service/SoftbyteCommerce/Security/users/usersSecurityService";
import OptionsService from "../../../service/SoftbyteCommerce/Security/Option/OptionService";

const PageOptionUser = () => {
    const [optionsUsers, setOptionsUsers] = useState([]);
    const [usuariosActivos, setUsuariosActivos] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchOptionsUsers();
        fetchUsuariosActivos();
        fetchOptions();
    }, []);

    // Función para obtener las opciones de usuario y agruparlas por 'userName'
    async function fetchOptionsUsers() {
        try {
            const optionUserService = new OptionUserService();
            const response = await optionUserService.getOptionUsers();

            // Agrupar las opciones por 'userName'
            const groupedOptions = response.data.reduce((acc, option) => {
                if (!acc[option.userName]) {
                    acc[option.userName] = {
                        nameUser: option.nameUser,
                        options: [],
                    };
                }
                acc[option.userName].options.push(option);
                return acc;
            }, {});

            setOptionsUsers(groupedOptions);
            console.log("Opciones de Usuario Agrupadas:", groupedOptions);
        } catch (error) {
            console.error("Error al obtener opciones de usuario:", error);
            setError(error);
            toast.error("Error al obtener opciones de usuario.");
        } finally {
            setLoading(false);
        }
    }

    async function fetchUsuariosActivos() {
        try {
            const usersService = new UsersService();
            const response = await usersService.getAllUsersActive();
            setUsuariosActivos(response.data);
        } catch (error) {
            toast.error("Error al obtener usuarios activos.");
        }
    }

    async function fetchOptions() {
        try {
            const optionsService = new OptionsService();
            const response = await optionsService.getOptions({ aplication: 1 });
            setOptions(Array.isArray(response.data) ? response.data : response);
        } catch (error) {
            console.error("Error al obtener opciones:", error);
            toast.error("Error al obtener opciones.");
        } finally {
            setLoading(false);
        }
    }


    // Carga mientras se obtienen los datos
    if (loading) return <LoadingScreen message="Cargando opciones de usuario..." />;
    if (error) return <div className="text-red-500 font-semibold">Error al cargar los datos.</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Opciones Asignadas a Usuarios</h1>
            <p className="text-gray-600 mb-4">
                En esta pantalla puedes ver las opciones asignadas a cada usuario. Usa la barra de búsqueda para encontrar una opción específica.
            </p>

            {/* 🔍 Barra de búsqueda */}
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Buscar usuario u opción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>

            {/* 📋 Lista de opciones agrupadas por usuario - Reutilizando el Componente */}
            <UserOptionsList groupedOptions={optionsUsers} searchTerm={searchTerm} />
        </div>
    );
};

export default PageOptionUser;
