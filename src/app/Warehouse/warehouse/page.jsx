"use client";
import { useState, useEffect } from "react";
import WarehouseService from "../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";
import DataTable from "@/components/shared/DataTable/DataTable";
import { warehouseColumns } from "@/models/Warehouse/warehouse/warehouseModel";
import { getWarehouseActions  } from "@/models/Warehouse/warehouse/warehouseProps";
import GenericModal from "@/components/shared/Modal/Modal";


const WarehousePage = () => {
    const [warehouse, setWarehouse] = useState([]);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const warehouseService = new WarehouseService();

    const handleView = (row) => {
        setSelectedWarehouse(row);  
        setModalOpen(true);         
    };
    
    const handleEdit = (row) => alert(`Editar ${row.descripcion}`);
    const handleToggle = (row) => alert(`Desactivar ${row.descripcion}`);

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

    const actions = getWarehouseActions({
        onView: handleView,
        onEdit: handleEdit,
        onToggle: handleToggle
    });

    useEffect(() => {
        fetchWarehouse();
    }, []);


    return (
    <div>
        <DataTable columns={warehouseColumns} data={warehouse} searchField="descripcion" showActions={true} actions={actions} />
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
    )
};

export default WarehousePage;
