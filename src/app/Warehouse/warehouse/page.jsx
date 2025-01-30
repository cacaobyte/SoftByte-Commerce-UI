"use client";
import { useState, useEffect } from "react";
import WarehouseService from "../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

const WarehousePage = () => {
    const [warehouse, setWarehouse] = useState([]);
    const [filteredWarehouses, setFilteredWarehouses] = useState([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [error, setError] = useState(null);

    const warehouseService = new WarehouseService();
    
    const fetchWarehouse = async () => {
        try {
            const response = await warehouseService.getWarehouse();
            setWarehouse(response.data);
            setFilteredWarehouses(response.data);
        } catch (err) {
            setError("Error al cargar las bodegas.");
        } 
    };

    useEffect(() => {
        fetchWarehouse();
    }, []);

    // 🔍 Función para filtrar bodegas por búsqueda
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);
        setFilteredWarehouses(
            warehouse.filter((bodega) =>
                bodega.departamento.toLowerCase().includes(query) ||
                bodega.descripcion.toLowerCase().includes(query) ||
                bodega.municipio.toLowerCase().includes(query) ||
                bodega.bodega1.toLowerCase().includes(query)
            )
        );
    };

    // 🔄 Función para ordenar las bodegas por nombre
    const handleSort = () => {
        const sortedData = [...filteredWarehouses].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.departamento.localeCompare(b.departamento);
            } else {
                return b.departamento.localeCompare(a.departamento);
            }
        });

        setFilteredWarehouses(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <div className="max-w-6xl mx-auto mt-8 p-4">
            {error && <p className="text-red-500">{error}</p>}

            <h2 className="text-2xl font-semibold mb-4">📦 Listado de Bodegas</h2>

            {/* 🔍 Buscador */}
            <div className="flex justify-between items-center mb-4">
                <Input 
                    type="text" 
                    placeholder="Buscar bodega..."
                    value={search}
                    onChange={handleSearch}
                    className="w-1/3"
                />
                <Button variant="outline" onClick={handleSort}>
                    Ordenar por Departamento 
                    {sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
            </div>

            {/* 📋 Tabla de bodegas */}
            <div className="overflow-x-auto rounded-lg border shadow-md">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="px-4 py-2">Bodega</TableHead>
                            <TableHead className="px-4 py-2">Descripción</TableHead>
                            <TableHead className="px-4 py-2 cursor-pointer" onClick={handleSort}>
                                Departamento {sortOrder === "asc" ? "▲" : "▼"}
                            </TableHead>
                            <TableHead className="px-4 py-2">Municipio</TableHead>
                            <TableHead className="px-4 py-2">Dirección</TableHead>
                            <TableHead className="px-4 py-2">Teléfono</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredWarehouses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                                    No hay bodegas registradas.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredWarehouses.map((bodega) => (
                                <TableRow key={bodega.bodega1} className="hover:bg-gray-50">
                                    <TableCell className="px-4 py-2">{bodega.bodega1}</TableCell>
                                    <TableCell className="px-4 py-2">{bodega.descripcion}</TableCell>
                                    <TableCell className="px-4 py-2">{bodega.departamento}</TableCell>
                                    <TableCell className="px-4 py-2">{bodega.municipio}</TableCell>
                                    <TableCell className="px-4 py-2">{bodega.direccion}</TableCell>
                                    <TableCell className="px-4 py-2">{bodega.telefono}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default WarehousePage;
