"use client";
import { useEffect, useState } from "react";
import OptionUserService from "../../../service/SoftbyteCommerce/Security/optionUser/optionUserService";
import UsersService from "../../../service/SoftbyteCommerce/Security/users/usersSecurityService";
import OptionsService from "../../../service/SoftbyteCommerce/Security/Option/OptionService";
import { toast } from "react-toastify";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserOptionsList from "../../../components/shared/security/UserOptionsList";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

const PageOptionUser = () => {
    const [optionsUsers, setOptionsUsers] = useState([]);
    const [usuariosActivos, setUsuariosActivos] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

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

    /**
     * Maneja la asignación de una opción a un usuario.
     */
    async function handleAssignOption() {
        if (!selectedUser || !selectedOption) {
            toast.warning("Debe seleccionar un usuario y una opción.");
            return;
        }

        try {
            const optionUserService = new OptionUserService();
            await optionUserService.assignOptionToUser({
                user: selectedUser,
                options: [parseInt(selectedOption)], // Convertimos la opción a número y la enviamos como array
                allowed: true,
            });

            toast.success("Opción asignada con éxito.");
            setIsModalOpen(false);
            fetchOptionsUsers(); 
            resetForm();
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Error al asignar la opción.";
            toast.error(errorMessage);
        }
    }

    const resetForm = () => {
        setSelectedUser("");
        setSelectedOption("");
    };

    // Carga mientras se obtienen los datos
    if (loading) return <LoadingScreen message="Cargando opciones de usuario..." />;
    if (error) return <div className="text-red-500 font-semibold">Error al cargar los datos.</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Opciones Asignadas a Usuarios</h1>
                <Button className="bg-black text-white flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
                    <PlusCircle size={20} className="mr-2" /> Asignar Nueva Opción
                </Button>
            </div>

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

            {/* 📋 Lista de opciones agrupadas por usuario */}
            <UserOptionsList groupedOptions={optionsUsers} searchTerm={searchTerm} />

            {/* 🔹 Modal para asignar opción */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Asignar Opción a Usuario</DialogTitle>
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
                        <label className="block font-medium text-gray-700">Opción:</label>
                        <Select value={selectedOption} onValueChange={setSelectedOption}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccione una opción" />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map(option => (
                                    <SelectItem key={option.idOpcion} value={option.idOpcion}>
                                        {option.opcion} - {option.menu}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button className="bg-black text-white flex items-center gap-2" onClick={handleAssignOption}>
                            Asignar Opción
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PageOptionUser;
