"use client";
import { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

const DataTable = ({ columns, data, searchField, actions = [], showActions = false }) => {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortColumn, setSortColumn] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    // 🔍 Búsqueda dinámica
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);
        setFilteredData(
            data.filter((item) =>
                item[searchField]?.toString().toLowerCase().includes(query)
            )
        );
        setCurrentPage(1);
    };

    // 🔄 Ordenamiento dinámico
    const handleSort = (column) => {
        const sortedData = [...filteredData].sort((a, b) => {
            const valueA = a[column]?.toString().toLowerCase();
            const valueB = b[column]?.toString().toLowerCase();
            return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        });

        setFilteredData(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setSortColumn(column);
    };

    // 🔄 Paginación
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="max-w-6xl mx-auto mt-8 p-4">
            {/* 🔍 Buscador */}
            <div className="flex justify-between items-center mb-4">
                <Input 
                    type="text" 
                    placeholder={`Buscar ${searchField}...`}
                    value={search}
                    onChange={handleSearch}
                    className="w-1/3"
                />
            </div>

            {/* 📋 Tabla Genérica */}
            <div className="overflow-x-auto rounded-lg border shadow-md">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            {columns.map((col) => (
                                <TableHead 
                                    key={col.key}
                                    className="px-4 py-2 cursor-pointer"
                                    onClick={() => handleSort(col.key)}
                                >
                                    {col.label}{" "}
                                    {sortColumn === col.key && (
                                        sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </TableHead>
                            ))}
                            {showActions && <TableHead className="px-4 py-2">Acciones</TableHead>}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
                                <TableRow key={index} className="hover:bg-gray-50">
                                    {columns.map((col) => (
                                        <TableCell key={col.key} className="px-4 py-2">{row[col.key]}</TableCell>
                                    ))}
                                    {showActions && (
                                        <TableCell className="px-4 py-2 flex gap-2">
                                            {actions.map((action, idx) => (
                                                <Button
                                                    key={idx}
                                                    variant={action.variant}
                                                    onClick={() => action.onClick(row)}
                                                >
                                                    {action.icon && <action.icon size={16} className="mr-1" />}
                                                    {typeof action.label === "function" ? action.label(row) : action.label}
                                                </Button>
                                            ))}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + (showActions ? 1 : 0)} className="text-center text-gray-500 py-4">
                                    No hay registros.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* 📌 Paginación */}
            {totalPages > 1 && (
                <div className="flex justify-end items-center mt-4">
                    <Button variant="outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Anterior
                    </Button>
                    <span className="mx-4">{currentPage} de {totalPages}</span>
                    <Button variant="outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Siguiente
                    </Button>
                </div>
            )}
        </div>
    );
};

export default DataTable;
