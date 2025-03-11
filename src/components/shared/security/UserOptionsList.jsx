import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const UserOptionsList = ({ groupedOptions, searchTerm }) => {
    const [expandedUsers, setExpandedUsers] = useState({});

    // Filtra los usuarios por el término de búsqueda
    const filteredUsers = Object.keys(groupedOptions).filter(userName =>
        userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        groupedOptions[userName].nameUser.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Alternar la vista expandida para cada usuario
    const toggleExpand = (userName) => {
        setExpandedUsers(prev => ({ ...prev, [userName]: !prev[userName] }));
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
                                                readOnly
                                                className="h-4 w-4 text-blue-600"
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
