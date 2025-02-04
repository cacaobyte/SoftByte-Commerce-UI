"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/shared/DataTable/DataTable";
import { warehouseColumns } from "@/models/Warehouse/warehouse/warehouseModel";
import { getWarehouseActions } from "@/models/Warehouse/warehouse/warehouseProps";
import GenericModal from "@/components/shared/Modal/Modal";
import ConfirmationModal from "@/components/shared/Modal/ConfirmationModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WarehouseService from "../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";
import RegionsService from "../../../service/SoftbyteCommerce/Sales/Warehouse/regionsService";
import DynamicForm from "@/components/shared/Forms/DynamicForm";
import InfoCard from "@/components/shared/Cards/InfoCard";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import GT from "territory-gt";
import createWarehouseModel from "@/models/Warehouse/createWarehouse/createWarehouseModel";

const WarehousePage = () => {
    const [warehouse, setWarehouse] = useState([]);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [createEditModalOpen, setCreateEditModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const warehouseService = new WarehouseService();
    const regionsService = new RegionsService();

    // Estados para el formulario de creación/edición
    const [departments, setDepartments] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [warehouseData, setWarehouseData] = useState({
        departamento: "",
        municipio: "",
        descripcion: "",
        direccion: "",
        telefono: "",
        region: "",
        correo: "",
        bodegacentral: false,
        bodegasecundaria: false
    });

    useEffect(() => {
        fetchWarehouse();
        setDepartments(GT.departamentos());
        fetchRegions();
    }, []);

    const fetchWarehouse = async () => {
        try {
            const response = await warehouseService.getWarehouse();
            setWarehouse(response.data);
        } catch (err) {
            toast.error("Error al cargar las bodegas.");
        }
    };

    const fetchRegions = async () => {
        try {
            const response = await regionsService.getRegions();
            setRegions(response.data.map((reg) => ({ label: reg.nombre, value: reg.nombre })));
        } catch (error) {
            console.error("Error al obtener regiones:", error);
        }
    };

    const handleDepartmentChange = (department) => {
        const newMunicipalities = GT.municipios(department) || [];
        setMunicipalities(newMunicipalities);
        setWarehouseData((prev) => ({
            ...prev,
            departamento: department,
            municipio: newMunicipalities.length > 0 ? newMunicipalities[0] : ""
        }));
    };

    const handleView = (row) => {
        setSelectedWarehouse(row);
        setDetailModalOpen(true);
    };

    const handleEdit = (row) => {
        setWarehouseData(row);
        setEditMode(true);
        setCreateEditModalOpen(true);
    };

    const handleNewWarehouse = () => {
        setWarehouseData({
            departamento: "",
            municipio: "",
            descripcion: "",
            direccion: "",
            telefono: "",
            region: "",
            correo: "",
            bodegacentral: false,
            bodegasecundaria: false
        });
        setEditMode(false);
        setCreateEditModalOpen(true);
    };

    const handleConfirmToggle = (row) => {
        setSelectedWarehouse(row);
        setConfirmModalOpen(true);
    };

    const handleToggle = async () => {
        if (!selectedWarehouse) return;
        setLoading(true);
        try {
            await warehouseService.putWarehouseId(selectedWarehouse.bodega1);
            setWarehouse(prev => prev.map(bodega =>
                bodega.bodega1 === selectedWarehouse.bodega1 ? { ...bodega, activo: !bodega.activo } : bodega
            ));
            toast.success("Estado actualizado con éxito.");
        } catch (error) {
            toast.error("Error al cambiar el estado de la bodega.");
        } finally {
            setConfirmModalOpen(false);
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (editMode) {
                await warehouseService.putWarehouse(formData, formData.bodega1);
                toast.success("Bodega actualizada con éxito.");
            } else {
                await warehouseService.createWarehouse(formData);
                toast.success("Bodega creada con éxito.");
            }
            fetchWarehouse();
            setCreateEditModalOpen(false);
        } catch (error) {
            toast.error("Error al guardar la bodega.");
        }
    };

    const warehouseModel = createWarehouseModel(departments, municipalities, regions, handleDepartmentChange);

    const actions = getWarehouseActions({
        onView: handleView,
        onEdit: handleEdit,
        onToggle: handleConfirmToggle
    });

    return (
        <div className="p-6">
            {/* 📌 SECCIÓN DE TARJETAS CON ESTADÍSTICAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <InfoCard icon={BuildingStorefrontIcon} title="Total de Bodegas" value={warehouse.length} />
                <InfoCard icon={BuildingStorefrontIcon} title="Bodegas Activas" value={warehouse.filter(w => w.activo).length} />
                <InfoCard icon={BuildingStorefrontIcon} title="Bodegas Inactivas" value={warehouse.filter(w => !w.activo).length} />
                <InfoCard icon={BuildingStorefrontIcon} title="Bodegas Centrales" value={warehouse.filter(w => w.bodegacentral).length} />
            </div>

            {/* ✅ TÍTULO + BOTÓN "NUEVA BODEGA" */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Bodegas</h1>
                <Button className="bg-black text-white" onClick={handleNewWarehouse}>
                    Nueva Bodega
                </Button>
            </div>

            {/* 📦 TABLA DE BODEGAS */}
            <DataTable columns={warehouseColumns} data={warehouse} searchField="descripcion" showActions={true} actions={actions} />

            {/* 📌 MODAL DETALLE */}
            {selectedWarehouse && (
                <GenericModal
                    isOpen={detailModalOpen}
                    onClose={() => setDetailModalOpen(false)}
                    title="Detalles de Bodega"
                    data={selectedWarehouse}
                    model={warehouseColumns}
                    hasImage={false}
                />
            )}

            {/* 📌 MODAL CREAR/EDITAR */}
            <Dialog open={createEditModalOpen} onOpenChange={setCreateEditModalOpen}>
                <DialogContent className="max-w-3xl p-6 rounded-lg shadow-md bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">{editMode ? "Editar Bodega" : "Nueva Bodega"}</DialogTitle>
                    </DialogHeader>
                    <DynamicForm
                        model={warehouseModel}
                        title=""
                        onSubmit={handleSubmit}
                        initialValues={warehouseData}
                        columns={2}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default WarehousePage;
