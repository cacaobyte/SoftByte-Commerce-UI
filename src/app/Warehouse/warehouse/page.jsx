"use client";
import { useState, useEffect } from "react";
import WarehouseService from "../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";
import DataTable from "@/components/shared/DataTable/DataTable";
import { Eye, Pencil, Trash, ToggleLeft, ToggleRight } from "lucide-react";

const WarehousePage = () => {
    const [warehouse, setWarehouse] = useState([]);
    const [error, setError] = useState(null);

    const warehouseService = new WarehouseService();

    useEffect(() => {
        fetchWarehouse();
    }, []);

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

    const columns = [
        { key: "bodega1", label: "Bodega" },
        { key: "descripcion", label: "Descripción" },
        { key: "departamento", label: "Departamento" },
        { key: "municipio", label: "Municipio" },
        { key: "direccion", label: "Dirección" },
        { key: "telefono", label: "Teléfono" }
    ];

    const actions = [
        { label: "Ver", icon: Eye, variant: "ghost", onClick: (row) => alert(`Ver detalles de ${row.descripcion}`) },
        { label: "Editar", icon: Pencil, variant: "outline", onClick: (row) => alert(`Editar ${row.descripcion}`) },
        { label: "Desactivar", icon: ToggleLeft, variant: "destructive", onClick: (row) => alert(`Eliminar ${row.descripcion}`) },
    ];

    return <DataTable columns={columns} data={warehouse} searchField="descripcion" showActions={true} actions={actions} />;
};

export default WarehousePage;
