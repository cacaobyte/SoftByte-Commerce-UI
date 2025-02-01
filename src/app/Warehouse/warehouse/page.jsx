"use client";
import { useState, useEffect } from "react";
import WarehouseService from "../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";
import DataTable from "@/components/shared/DataTable/DataTable";
import { warehouseColumns } from "@/models/Warehouse/warehouse/warehouseModel";
import { getWarehouseActions } from "@/models/Warehouse/warehouse/warehouseProps";
import GenericModal from "@/components/shared/Modal/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../../components/shared/Modal/ConfirmationModal";

const WarehousePage = () => {
    const [warehouse, setWarehouse] = useState([]);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [loading, setLoading] = useState(false);

    const warehouseService = new WarehouseService();

    const fetchWarehouse = async () => {
        try {
            const response = await warehouseService.getWarehouse();
            const normalizedData = response.data.map(bodega => ({
                ...bodega,
                departamento: bodega.departamento.toLowerCase(),
                municipio: bodega.municipio.toLowerCase()
            }));
            setWarehouse(normalizedData);
        } catch (err) {
            setError("Error al cargar las bodegas.");
        }
    };

    useEffect(() => {
        fetchWarehouse();
    }, []);

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
            const response = await warehouseService.putWarehouseId(selectedWarehouse.bodega1);
            const message = response.data?.message || "Estado actualizado con éxito.";

            setWarehouse(prev =>
                prev.map(bodega =>
                    bodega.bodega1 === selectedWarehouse.bodega1 ? { ...bodega, activo: !bodega.activo } : bodega
                )
            );

            toast.success(message);
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
        <div>
            <DataTable
                columns={warehouseColumns}
                data={warehouse}
                searchField="descripcion"
                showActions={true}
                actions={actions}
            />

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
