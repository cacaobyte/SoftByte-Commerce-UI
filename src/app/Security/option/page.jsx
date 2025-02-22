"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OptionsService from "../../../service/SoftbyteCommerce/Security/Option/OptionService";
import DataTable from "../../../components/DataTable/DataTable";
import ConfirmationModal from "../../../components/shared/Modal/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Eye, PlusCircle, CheckCircle, XCircle } from "lucide-react";
import { useHasMounted } from "../../../hooks/useHasMounted";
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen";
import ProtectedPage from "../../../components/ProtectedPage";

// 📌 Definir columnas para DataTable
export const optionColumns = [
    { key: "nombreMostrar", label: "Nombre", type: "string" },   
    { key: "menu", label: "Menú", type: "string" }, 
    { key: "estado", label: "Activo", type: "boolean" }, 
    { key: "descripcion", label: "Descripción", type: "string" },
    { key: "url", label: "URL", type: "string" },
    { key: "agrupador", label: "Agrupador", type: "string" },
    { key: "icons", label: "Ícono", type: "string" },
];

export default function OptionsPage() {
    const hasMounted = useHasMounted();
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // 📌 Estado del formulario de nueva opción
    const [newOption, setNewOption] = useState({
        id: 0,
        menu: "",
        grouper: null,
        name: "",
        text: "",
        pathIcon: "",
        url: "",
        orderShow: 0,
        active: true,
    });

    useEffect(() => {
        fetchOptions();
    }, []);

    async function fetchOptions() {
        try {
            const optionsService = new OptionsService();
            const response = await optionsService.getOptions({ aplication: 1 }); // Cambiar por el ID correcto
            const optionsData = Array.isArray(response.data) ? response.data : response;

            if (!Array.isArray(optionsData)) {
                throw new Error("La respuesta del servicio no contiene un array.");
            }

            setOptions(optionsData);
        } catch (error) {
            console.error("Error al obtener opciones:", error);
            toast.error("Error al obtener opciones.");
        } finally {
            setLoading(false);
        }
    }

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

    // 📌 Modal de "Ver más" detalles de la opción
    const handleViewOption = (option) => {
        setSelectedOption(option);
        setViewModalOpen(true);
    };

    // 📌 Crear nueva opción
    const handleCreateOption = async () => {
        if (!newOption.name.trim() || !newOption.text.trim() || !newOption.menu.trim() || !newOption.url.trim()) {
            toast.warn("Todos los campos obligatorios deben estar completos.");
            return;
        }

        setCreating(true);
        try {
            const optionsService = new OptionsService();
            await optionsService.createRoll({
                id: 0,
                menu: parseInt(newOption.menu, 10),
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
                id: 0,
                menu: "",
                grouper: null,
                name: "",
                text: "",
                pathIcon: "",
                url: "",
                orderShow: 0,
                active: true,
            });

            fetchOptions();
            toast.success("Opción creada exitosamente.");
        } catch (error) {
            console.error("Error al crear opción:", error);
            toast.error(error.response.json().then((data)=> data.error) || "Error al crear la opción.");
        } finally {
            setCreating(false);
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
    <DialogContent className="p-6">
        <DialogHeader>
            <DialogTitle>Crear Nueva Opción</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
            <div>
                <Label>Menú</Label>
                <Input
                    type="text"
                    placeholder="Ingrese el menú"
                    value={newOption.menu}
                    onChange={(e) => setNewOption({ ...newOption, menu: e.target.value })}
                />
            </div>
            <div>
                <Label>Nombre</Label>
                <Input
                    type="text"
                    placeholder="Ingrese el nombre"
                    value={newOption.name}
                    onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                />
            </div>
            <div>
                <Label>Descripción</Label>
                <Input
                    type="text"
                    placeholder="Ingrese la descripción"
                    value={newOption.text}
                    onChange={(e) => setNewOption({ ...newOption, text: e.target.value })}
                />
            </div>
            <div>
                <Label>URL</Label>
                <Input
                    type="text"
                    placeholder="Ingrese la URL"
                    value={newOption.url}
                    onChange={(e) => setNewOption({ ...newOption, url: e.target.value })}
                />
            </div>
            <div>
                <Label>Ícono</Label>
                <Input
                    type="text"
                    placeholder="Ingrese el ícono"
                    value={newOption.pathIcon}
                    onChange={(e) => setNewOption({ ...newOption, pathIcon: e.target.value })}
                />
            </div>
            <Button onClick={handleCreateOption} disabled={creating} className="w-full bg-green-600 text-white">
                {creating ? "Creando..." : "Crear Opción"}
            </Button>
        </div>
    </DialogContent>
</Dialog>

                </div>

                <DataTable columns={optionColumns} data={options} searchField="nombreMostrar" actions={actions} showActions={true} />

                <ConfirmationModal 
                    isOpen={confirmModalOpen} 
                    onClose={() => setConfirmModalOpen(false)} 
                    onConfirm={handleToggleStatus} 
                    title="Confirmar acción" 
                    description={`¿Desea ${selectedOption?.estado ? "desactivar" : "activar"} la opción "${selectedOption?.opcion}"?`} 
                    confirmText={selectedOption?.estado ? "Desactivar" : "Activar"} 
                    loading={updating} 
                />

                {/* 📌 Modal de "Ver más" */}
                <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Detalles de la Opción</DialogTitle>
                        </DialogHeader>
                        {selectedOption && (
                            <div className="space-y-2">
                                <p><strong>Menú:</strong> {selectedOption.menu}</p>
                                <p><strong>Descripción:</strong> {selectedOption.descripcion}</p>
                                <p><strong>URL:</strong> {selectedOption.url}</p>
                                <p><strong>Ícono:</strong> {selectedOption.icons}</p>
                                <p><strong>Agrupador:</strong> {selectedOption.agrupador || "N/A"}</p>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </ProtectedPage>
    );
}
