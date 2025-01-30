"use client";
import { useState, useEffect } from "react";
import WarehouseService from "../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";
import DataTable from "@/components/shared/DataTable/DataTable";

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
                municipio: bodega.municipio.toLowerCase(),
            }));
            setWarehouse(normalizedData);
        } catch (err) {
            setError("Error al cargar las bodegas.");
        }
    };

    // 🔹 Definir las columnas de la tabla
    const columns = [
        { key: "bodega1", label: "Bodega" },
        { key: "descripcion", label: "Descripción" },
        { key: "departamento", label: "Departamento" },
        { key: "municipio", label: "Municipio" },
        { key: "direccion", label: "Dirección" },
        { key: "telefono", label: "Teléfono" }
    ];

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="text-2xl font-semibold mb-4 flex items-center">📦 Listado de Bodegas</h2>

            {/* 📋 Usando el componente genérico DataTable */}
            <DataTable 
                columns={columns}
                data={warehouse}
                searchField="direccion"
            />
        </div>
    );
};

export default WarehousePage;
