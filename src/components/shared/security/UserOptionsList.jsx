import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import OptionUserService from "../../../service/SoftbyteCommerce/Security/optionUser/optionUserService";
import { toast } from "react-toastify";

const UserOptionsList = ({ groupedOptions, searchTerm, fetchOptionsUsers }) => {
    const [expandedUsers, setExpandedUsers] = useState({});
    const [updating, setUpdating] = useState(false);

    const optionUserService = new OptionUserService();

    // Filtra los usuarios por el término de búsqueda
    const filteredUsers = Object.keys(groupedOptions).filter(userName =>
        userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        groupedOptions[userName].nameUser.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Alternar la vista expandida para cada usuario
    const toggleExpand = (userName) => {
        setExpandedUsers(prev => ({ ...prev, [userName]: !prev[userName] }));
    };

    // Manejar el cambio de estado de una opción asignada al usuario
    const handleOptionChange = async (user, option, allowed) => {
        if (updating) return;
        setUpdating(true);
    
        const payload = {
            user,
            option,
            allowed,
        };
    
        console.log("Datos que se enviarán al backend:", payload); // 🔍 Verifica en la consola
    
        try {
            await optionUserService.updateUserOptionStatus(payload);
    
            toast.success(`Opción ${allowed ? "habilitada" : "deshabilitada"} correctamente.`);
            fetchOptionsUsers(); // Refrescar la lista después de la actualización
        } catch (error) {
            console.error("Error en la actualización:", error);
            toast.error(error.response?.data?.errors?.options?.[0] || "Error al actualizar la opción.");
        } finally {
            setUpdating(false);
        }
    };
    

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            {filteredUsers.length === 0 ? (
                <p className="text-gray-600">No se encontraron opciones asignadas.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {filteredUsers.map(userName => (
                        <li key={userName} className="py-4">
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold text-gray-900">
                                    {userName} - <span className="text-gray-600">{groupedOptions[userName].nameUser}</span>
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleExpand(userName)}
                                >
                                    {expandedUsers[userName] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </Button>
                            </div>

                            {expandedUsers[userName] && (
                                <ul className="mt-2 space-y-1 bg-gray-50 p-3 rounded-md">
                                    {groupedOptions[userName].options.map((option) => (
                                        <li key={option.idUsuarioOpcion} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={option.selected}
                                                onChange={() => handleOptionChange(option.usuario, option.idOpcion, !option.selected)}
                                                className="h-4 w-4 text-blue-600 cursor-pointer"
                                                disabled={updating}
                                            />
                                            <span className="text-gray-700">{option.claveVista}</span>
                                            <p className="text-sm text-gray-500">
                                                Empresa: {option.nameEnterprice} | Plan: {option.plan}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserOptionsList;
