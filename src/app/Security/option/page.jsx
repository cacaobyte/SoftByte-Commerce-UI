"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OptionsService from "../../../service/SoftbyteCommerce/Security/Option/OptionService";
import GrouperService from "../../../service/SoftbyteCommerce/Security/grouper/grouperService";
import DataTable from "../../../components/DataTable/DataTable";
import ConfirmationModal from "../../../components/shared/Modal/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Eye, PlusCircle, XCircle, CheckCircle } from "lucide-react";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import ProtectedPage from "../../../components/ProtectedPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIconComponent } from "../../../utils/getIconComponent";
import GenericModal from "../../../components/shared/Modal/Modal";
import IconPickerModal from "../../../components/shared/Icons/IconPickerModal"; 
import { optionColumns } from "../../../models/security/optionModel";

export default function OptionsPage() {
    const hasMounted = useHasMounted();
    const [options, setOptions] = useState([]);
    const [groupers, setGroupers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false); 

    // 📌 Estado del formulario de nueva opción
    const [newOption, setNewOption] = useState({
        name: "",
        text: "",
        pathIcon: "",
        url: "",
        orderShow: 0,
        grouper: null,
        active: true,
    });

    useEffect(() => {
        fetchOptions();
        fetchGroupers();
    }, []);

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

    async function fetchGroupers() {
        try {
            const grouperService = new GrouperService();
            const response = await grouperService.getGroupersActive();
            setGroupers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error al obtener agrupadores:", error);
            toast.error("Error al obtener agrupadores.");
        }
    }

    // 📌 Crear nueva opción
    const handleCreateOption = async () => {
        if (!newOption.name.trim() || !newOption.text.trim() || !newOption.url.trim()) {
            toast.warn("Todos los campos obligatorios deben estar completos.");
            return;
        }

        setCreating(true);
        try {
            const optionsService = new OptionsService();
            await optionsService.createRoll({
                menu: 0, 
                grouper: newOption.grouper || null,
                name: newOption.name,
                text: newOption.text,
                pathIcon: newOption.pathIcon,
                url: newOption.url,
                orderShow: parseInt(newOption.orderShow, 10),
                active: true,
            });

            setIsCreateOpen(false);
            setNewOption({
                name: "",
                text: "",
                pathIcon: "",
                url: "",
                orderShow: 0,
                grouper: null,
                active: true,
            });

            fetchOptions();
            toast.success("Opción creada exitosamente.");
        } catch (error) {
            console.error("Error al crear opción:", error);
            const errorMessage = await error.response?.json().then((data) => data.error) || "Error al crear la opción.";
            toast.error(errorMessage);
        } finally {
            setCreating(false);
        }
    };

    // 📌 Ver detalles
    const handleViewOption = (option) => {
        setSelectedOption(option);
        setViewModalOpen(true);
    };

    // 📌 Activar/Desactivar opción
    const handleConfirmToggle = (option) => {
        setSelectedOption(option);
        setConfirmModalOpen(true);
    };

    const handleToggleStatus = async () => {
        if (!selectedOption) return;
        setUpdating(true);
        try {
            const optionsService = new OptionsService();
            await optionsService.UpdateStatusOption(selectedOption.idOpcion, !selectedOption.estado);

            setOptions((prev) =>
                prev.map((o) => (o.idOpcion === selectedOption.idOpcion ? { ...o, estado: !o.estado } : o))
            );

            toast.success(`La opción "${selectedOption.opcion}" ha sido ${selectedOption.estado ? "desactivada" : "activada"} correctamente.`);
        } catch (error) {
            console.error("Error al actualizar estado:", error);
            toast.error("Error al actualizar el estado de la opción.");
        } finally {
            setConfirmModalOpen(false);
            setUpdating(false);
        }
    };

    const actions = [
        {
            label: "Ver",
            icon: Eye,
            variant: "outline",
            onClick: handleViewOption,
        },
        {
            label: "Activar/Desactivar",
            icon: (row) => (row.estado ? XCircle : CheckCircle),
            variant: "destructive",
            onClick: handleConfirmToggle,
        },
    ];

    if (!hasMounted) {
        return <LoadingScreen message="Cargando opciones..." />;
    }

    return (
        <ProtectedPage>
            <div className="p-6">
            <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Opciones</h1>
    
    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogTrigger asChild>
            <Button className="bg-black text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5" /> Nueva Opción
            </Button>
        </DialogTrigger>
        
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Crear Nueva Opción</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
                {/* 🔹 Selección de Agrupador */}
                <div>
                    <Label>Agrupador</Label>
                    <Select
                        value={newOption.grouper || ""}
                        onValueChange={(value) => setNewOption({ ...newOption, grouper: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione un agrupador" />
                        </SelectTrigger>
                        <SelectContent>
                            {groupers.map((grouper) => (
                                <SelectItem key={grouper.id} value={grouper.id}>
                                    {grouper.nameAgrupador}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* 🔹 Nombre */}
                <div>
                    <Label>Nombre</Label>
                    <Input
                        type="text"
                        placeholder="Ingrese el nombre de la opción"
                        value={newOption.name}
                        onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                    />
                </div>

                {/* 🔹 Descripción */}
                <div>
                    <Label>Descripción</Label>
                    <Input
                        type="text"
                        placeholder="Ingrese la descripción"
                        value={newOption.text}
                        onChange={(e) => setNewOption({ ...newOption, text: e.target.value })}
                    />
                </div>

                {/* 🔹 URL */}
                <div>
                    <Label>URL</Label>
                    <Input
                        type="text"
                        placeholder="Ingrese la URL"
                        value={newOption.url}
                        onChange={(e) => setNewOption({ ...newOption, url: e.target.value })}
                    />
                </div>

                {/* 🔹 Ícono */}
                    {/* 🔹 Selección de Ícono */}
                    <div>
                        <Label>Ícono</Label>
                        <div className="flex items-center gap-4">
                            {/* 🔹 Vista previa del icono seleccionado */}
                            {newOption.pathIcon ? (
                                React.createElement(
                                    require("react-icons/fa")[newOption.pathIcon] ||
                                    require("react-icons/ri")[newOption.pathIcon], 
                                    { size: 32, className: "text-blue-500" }
                                )
                            ) : (
                                <span className="text-gray-400">Sin ícono</span>
                            )}

                            {/* 🔹 Botón para abrir el selector de íconos */}
                            <Button onClick={() => setIsIconPickerOpen(true)} className="bg-gray-700 text-white">
                                Seleccionar Ícono
                            </Button>
                        </div>
                    </div>

                {/* 🔹 Orden de Mostrar */}
                <div>
                    <Label>Orden de Mostrar</Label>
                    <Input
                        type="number"
                        placeholder="Ingrese el orden de visualización"
                        value={newOption.orderShow}
                        onChange={(e) => setNewOption({ ...newOption, orderShow: parseInt(e.target.value, 10) || 0 })}
                    />
                </div>

                {/* 🔹 Botón de creación */}
                <Button 
                    onClick={handleCreateOption} 
                    disabled={creating} 
                    className="w-full bg-green-600 text-white"
                >
                    {creating ? "Creando..." : "Crear Opción"}
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</div>


                <DataTable columns={optionColumns} data={options} searchField="nombreMostrar" actions={actions} showActions={true} />

                {/* 📌 Modales para activar/desactivar y ver detalles */}
                <ConfirmationModal
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleToggleStatus}
                title="Confirmar acción"
                description={`¿Seguro que deseas ${selectedOption?.estado ? "desactivar" : "activar"} la opción "${selectedOption?.nombreMostrar}"?`}
                confirmText={selectedOption?.estado ? "Desactivar" : "Activar"}
                loading={updating}
                />

                            <GenericModal
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                title="Detalles de la Opción"
                data={selectedOption}
                model={[
                    { key: "descripcion", label: "Descripción", type: "text" },
                    { key: "url", label: "URL", type: "text" },
                    { key: "agrupador", label: "Agrupador", type: "text" },
                    { key: "icons", label: "Ícono", type: "icon" },
                    { key: "estado", label: "Estado", type: "boolean" }
                ]}
            />
                                <IconPickerModal
                        isOpen={isIconPickerOpen}
                        onClose={() => setIsIconPickerOpen(false)}
                        onSelect={(selectedIcon) => {
                            setNewOption({ ...newOption, pathIcon: selectedIcon });
                            setIsIconPickerOpen(false);
                        }}
                    />
            </div>
        </ProtectedPage>
    );
}
