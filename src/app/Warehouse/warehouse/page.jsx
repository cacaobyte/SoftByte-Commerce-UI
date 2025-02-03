'use client'
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/shared/DataTable/DataTable";
import { warehouseColumns } from "@/models/Warehouse/warehouse/warehouseModel";
import { getWarehouseActions } from "@/models/Warehouse/warehouse/warehouseProps";
import GenericModal from "@/components/shared/Modal/Modal";
import ConfirmationModal from "@/components/shared/Modal/ConfirmationModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewWarehousePage from "../newWarehouse/page"; 
import WarehouseService from "../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";
import InfoCard from "@/components/shared/Cards/InfoCard";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";


const WarehousePage = () => {
    const [warehouse, setWarehouse] = useState([]);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false); 

    const warehouseService = new WarehouseService();

    useEffect(() => {
        fetchWarehouse();
    }, []);

    const fetchWarehouse = async () => {
        try {
            const response = await warehouseService.getWarehouse();
            setWarehouse(response.data);
        } catch (err) {
            setError("Error al cargar las bodegas.");
        }
    };

    const handleView = (row) => {
        setSelectedWarehouse(row);
        setModalOpen(true);
    };

    const handleEdit = (row) => alert(`Editar ${row.descripcion}`);

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
                <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-black text-white">Nueva Bodega</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-6 rounded-lg shadow-md bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold">Nueva Bodega</DialogTitle>
                        </DialogHeader>
                        <NewWarehousePage onClose={() => setCreateModalOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* 📦 TABLA DE BODEGAS */}
            <DataTable columns={warehouseColumns} data={warehouse} searchField="descripcion" showActions={true} actions={actions} />

            {/* 📌 MODAL DETALLE */}
            {selectedWarehouse && (
                <GenericModal 
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Detalles de Bodega"
                    data={selectedWarehouse}
                    model={warehouseColumns}
                    hasImage={false} 
                />
            )}

            {/* 🔄 MODAL CONFIRMACIÓN DE ACTIVACIÓN/DESACTIVACIÓN */}
            <ConfirmationModal
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleToggle}
                title="Confirmar acción"
                description={`¿Estás seguro de que deseas ${selectedWarehouse?.activo ? "desactivar" : "activar"} la bodega "${selectedWarehouse?.descripcion}"?`}
                confirmText={selectedWarehouse?.activo ? "Desactivar" : "Activar"}
                loading={loading}
            />
        </div>
    );
};

export default WarehousePage;
