"use client";
import { useEffect, useState } from "react";
import RoleuserService from "../../../service/SoftbyteCommerce/Security/roleUsers/roleUserService";
import RoleService from "../../../service/SoftbyteCommerce/Security/Role/RoleSecurityService";
import UsersService from "../../../service/SoftbyteCommerce/Security/users/usersSecurityService";
import { toast } from "react-toastify";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ConfirmationModal from "../../../components/shared/Modal/ConfirmationModal";

const PageRolUsuario = () => {
    const [rolesUsuarios, setRolesUsuarios] = useState([]);
    const [rolesActivos, setRolesActivos] = useState([]); 
    const [usuariosActivos, setUsuariosActivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedUsers, setExpandedUsers] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState(null);
    const [updating, setUpdating] = useState(false);

    const resetForm = () => {
        setSelectedUser("");
        setSelectedRole("");
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchRolesUsuarios();
        fetchRolesActivos();
        fetchUsuariosActivos();
    }, []);

    async function fetchRolesUsuarios() {
        try {
            const roleuserService = new RoleuserService();
            const response = await roleuserService.getRollsUsers();
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
                    selected: role.selected,
                    usuario: role.usuario
                });
                return acc;
            }, {});
            setRolesUsuarios(groupedRoles);
        } catch (error) {
            toast.error("Error al obtener roles de usuario.");
        } finally {
            setLoading(false);
        }
    }

    async function fetchRolesActivos() {
        try {
            const roleService = new RoleService();
            const response = await roleService.getRollsActive();
            setRolesActivos(response.data);
        } catch (error) {
            toast.error("Error al obtener roles activos.");
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

    async function handleAssignRole() {
        if (!selectedUser || !selectedRole) {
            toast.warning("Debe seleccionar un usuario y un rol.");
            return;
        }

        try {
            const roleuserService = new RoleuserService();
            await roleuserService.postRollsUsers({
                user: selectedUser, 
                role: parseInt(selectedRole), // Convertir a número si es necesario
                roles: [], // Asegurar que es un array vacío
                superUser: false
            });
            

            toast.success("Rol asignado con éxito.");
            setSelectedUser("");
            setSelectedRole("");
            setIsModalOpen(false);
            fetchRolesUsuarios(); 
            resetForm();
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Error al asignar el rol.";
            toast.error(errorMessage);
        }
    }


    async function handleDeleteRole() {
        if (!roleToDelete) return;
    
        try {
            setUpdating(true);
            const roleuserService = new RoleuserService();
            console.log("roleToDelete", roleToDelete);
            await roleuserService.DeleteUserRoll(roleToDelete.user, roleToDelete.role);
      
            toast.success("Rol eliminado con éxito.");
            fetchRolesUsuarios();
        } catch (error) {
            toast.error("Error al eliminar el rol.");
        } finally {
            setConfirmModalOpen(false);
            setRoleToDelete(null);
            setUpdating(false);
        }
    }
    
    if (loading) return <LoadingScreen message="Cargando datos de usuarios y roles..." />;
    if (error) return <div className="text-red-500 font-semibold">Error al cargar los datos.</div>;

    const filteredUsers = Object.keys(rolesUsuarios).filter(username =>
        username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rolesUsuarios[username].parentUser.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleExpand = (username) => {
        setExpandedUsers(prev => ({ ...prev, [username]: !prev[username] }));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Asignación de Roles a Usuarios</h1>
                <Button className="bg-black text-white flex items-center gap-2" onClick={() => setIsModalOpen(true)} >
                    <PlusCircle size={20} className="mr-2" /> Asignar Nuevo Rol
                </Button>
            </div>

            <p className="text-gray-600 mb-4">
                En esta pantalla puedes ver y administrar los roles asignados a los usuarios. 
                Usa la barra de búsqueda para encontrar un usuario y haz clic en el botón desplegable para ver sus roles asignados.
            </p>

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
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-semibold text-gray-900">
                                        {username} - <span className="text-gray-600">{rolesUsuarios[username].parentUser}</span>
                                    </p>
                                    <Button variant="outline" size="sm" onClick={() => toggleExpand(username)}>
                                        {expandedUsers[username] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </Button>
                                </div>

                                {expandedUsers[username] && (
                                    <ul className="mt-2 space-y-1 bg-gray-50 p-3 rounded-md">
                                        {rolesUsuarios[username].roles.map((role) => (
                                            <li key={role.idRol} className="flex items-center gap-2">
                                                <input 
                                                    type="checkbox" 
                                                    checked={role.selected} 
                                                    readOnly 
                                                    onClick={() => {
                                                        setRoleToDelete({ user: role.usuario, role: role.idRol });
                                                        setConfirmModalOpen(true);
                                                    }}                                                                                                       
                                                    className="h-4 w-4 text-blue-600 cursor-pointer"
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

            {/* 🔹 Modal para asignar rol */}
            <Dialog open={isModalOpen} onOpenChange={(open) => { if (!open) resetForm(); }}>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Asignar Rol a Usuario</DialogTitle>
                    </DialogHeader>

                    <div className="mb-4">
                        <label className="block font-medium text-gray-700">Usuario:</label>
                        <Select value={selectedUser} onValueChange={setSelectedUser}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccione un usuario" />
                            </SelectTrigger>
                            <SelectContent>
                                {usuariosActivos.map(user => (
                                    <SelectItem key={user.userId} value={user.userId}>
                                        {user.userName} - {user.usuario}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-gray-700">Rol:</label>
                        <Select value={selectedRole} onValueChange={setSelectedRole}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccione un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                {rolesActivos.map(role => (
                                    <SelectItem key={role.idRol} value={role.idRol}>
                                        {role.rol}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button className="bg-black text-white flex items-center gap-2" onClick={handleAssignRole} >
                            Asignar Rol
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
            <ConfirmationModal
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleDeleteRole}
                title="Confirmar Eliminación"
                description={`¿Estás seguro de que deseas eliminar el rol seleccionado del usuario?`}
                confirmText="Eliminar"
                loading={updating}
            />
        </div>
    );
};

export default PageRolUsuario;
