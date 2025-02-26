"use client";
import { useEffect, useState } from "react";
import RoleuserService from "../../../service/SoftbyteCommerce/Security/roleUsers/roleUserService";
import RoleService from "../../../service/SoftbyteCommerce/Security/Role/RoleSecurityService"; 
import { toast } from "react-toastify";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const PageRolUsuario = () => {
    const [rolesUsuarios, setRolesUsuarios] = useState([]);
    const [rolesActivos, setRolesActivos] = useState([]); // Aquí guardaremos los roles activos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedUsers, setExpandedUsers] = useState({}); // Para manejar la expansión de roles

    useEffect(() => {
        fetchRolesUsuarios();
        fetchRolesActivos();
    }, []);

    async function fetchRolesUsuarios() {
        try {
            const roleuserService = new RoleuserService();
            const response = await roleuserService.getRollsUsers();

            console.log("Response de Roles de Usuario:", response.data);

            // Agrupar roles por usuario
            const groupedRoles = response.data.reduce((acc, role) => {
                if (!acc[role.username]) {
                    acc[role.username] = {
                        parentUser: role.parentUser,
                        roles: [],
                    };
                }
                acc[role.username].roles.push({
                    idRol: role.idRol,
                    claveVista: role.claveVista,
                    selected: role.selected
                });
                return acc;
            }, {});

            setRolesUsuarios(groupedRoles);
        } catch (error) {
            console.error("Error al obtener roles de usuario:", error);
            setError(error);
            toast.error("Error al obtener roles de usuario.");
        } finally {
            setLoading(false);
        }
    }

    async function fetchRolesActivos() {
        try {
            const roleService = new RoleService();
            const response = await roleService.getRollsActive(); // Obtiene los roles activos

            console.log("Response de Roles Activos:", response.data);

            setRolesActivos(response.data);
        } catch (error) {
            console.error("Error al obtener roles activos:", error);
            toast.error("Error al obtener roles activos.");
        }
    }

    if (loading) return <LoadingScreen message="Cargando roles de usuario y roles activos..." />;
    if (error) return <div className="text-red-500 font-semibold">Error al cargar los datos.</div>;

    // Filtrar usuarios según la búsqueda
    const filteredUsers = Object.keys(rolesUsuarios).filter(username =>
        username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rolesUsuarios[username].parentUser.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Alternar visibilidad de roles
    const toggleExpand = (username) => {
        setExpandedUsers(prev => ({ ...prev, [username]: !prev[username] }));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Asignación de Roles a Usuarios</h1>
            <p className="text-gray-600 mb-4">
                En esta pantalla puedes ver y administrar los roles asignados a los usuarios. 
                Usa la barra de búsqueda para encontrar un usuario y haz clic en el botón desplegable para ver sus roles asignados.
            </p>

            {/* 🔹 Barra de búsqueda */}
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Buscar usuario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
                {filteredUsers.length === 0 ? (
                    <p className="text-gray-600">No se encontraron usuarios.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {filteredUsers.map(username => (
                            <li key={username} className="py-4">
                                {/* 🔹 Encabezado de Usuario */}
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-semibold text-gray-900">
                                        {username} - <span className="text-gray-600">{rolesUsuarios[username].parentUser}</span>
                                    </p>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => toggleExpand(username)}
                                    >
                                        {expandedUsers[username] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </Button>
                                </div>

                                {/* 🔹 Lista de roles asignados (solo si está expandido) */}
                                {expandedUsers[username] && (
                                    <ul className="mt-2 space-y-1 bg-gray-50 p-3 rounded-md">
                                        {rolesUsuarios[username].roles.map((role) => (
                                            <li key={role.idRol} className="flex items-center gap-2">
                                                <input 
                                                    type="checkbox" 
                                                    checked={role.selected} 
                                                    readOnly 
                                                    className="h-4 w-4 text-blue-600"
                                                />
                                                <span className="text-gray-700">{role.claveVista}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 🔹 Sección de roles activos */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Roles Activos</h2>
                {rolesActivos.length === 0 ? (
                    <p className="text-gray-600">No hay roles activos disponibles.</p>
                ) : (
                    <ul className="list-disc pl-5 text-gray-700">
                        {rolesActivos.map((role) => (
                            <li key={role.idRol}>{role.claveVista}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PageRolUsuario;
