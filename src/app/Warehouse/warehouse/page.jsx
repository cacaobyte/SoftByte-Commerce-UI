"use client";
import { useState, useEffect } from "react";
import WarehouseService from "../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";
import DataTable from "@/components/shared/DataTable/DataTable";
import { warehouseColumns } from "@/models/Warehouse/warehouse/warehouseModel";
import { getWarehouseActions } from "@/models/Warehouse/warehouse/warehouseProps";
import GenericModal from "@/components/shared/Modal/Modal";
import { toast } from "react-toastify";

const WarehousePage = () => {
    const [warehouse, setWarehouse] = useState([]);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

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

    const handleToggle = async (row) => {
        const newStatus = !row.activo;
        try {
            await warehouseService.putWarehouseId(row.bodega1);
            setWarehouse(prev =>
                prev.map(bodega =>
                    bodega.bodega1 === row.bodega1 ? { ...bodega, activo: newStatus } : bodega
                )
            );
            toast.success(`Bodega ${row.descripcion} ${newStatus ? "activada" : "desactivada"} con éxito.`);
        } catch (error) {
            toast.error("Error al cambiar el estado de la bodega.");
        }
    };

    // Se generan las acciones una sola vez para evitar llamadas innecesarias
    const actions = getWarehouseActions({
        onView: handleView,
        onEdit: handleEdit,
        onToggle: handleToggle
    });

    return (
        <div>
            <DataTable
                columns={warehouseColumns}
                data={warehouse}
                searchField="descripcion"
                showActions={true}
                actions={actions} // Aquí se pasa correctamente
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
        </div>
    );
};

export default WarehousePage;
