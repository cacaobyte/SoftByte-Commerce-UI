"use client";
import { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, CheckCircle, XCircle, Search } from "lucide-react";
import clsx from "clsx";

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

    // 🔍 Búsqueda con resaltado
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

    // 🎯 Formatear fechas al estilo '30 de enero del 2025'
    const formatDate = (dateString) => {
        if (!dateString) return "No disponible";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Formato inválido";
        return new Intl.DateTimeFormat("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    return (
        <div className="w-full p-2">
            {/* 🔍 Buscador con Icono */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg mb-4 shadow-sm">
                <Search className="text-gray-500 dark:text-gray-400 mr-2" size={18} />
                <Input 
                    type="text" 
                    placeholder={`Buscar ${searchField}...`}
                    value={search}
                    onChange={handleSearch}
                    className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100"
                />
            </div>

            {/* 📋 Tabla con Mejor Estilización y Modo Oscuro */}
            <div className="w-full overflow-x-auto border rounded-lg shadow-lg">
                <Table className="w-full">
                    <TableHeader className="sticky top-0 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm z-10">
                        <TableRow className="border-b">
                            {columns.map((col) => (
                                <TableHead 
                                    key={col.key}
                                    className="px-3 py-3 cursor-pointer text-left text-sm font-semibold"
                                    onClick={() => handleSort(col.key)}
                                >
                                    {col.label}{" "}
                                    {sortColumn === col.key && (
                                        sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                                    )}
                                </TableHead>
                            ))}
                            {showActions && <TableHead className="px-3 py-3 text-left text-sm font-semibold">Acciones</TableHead>}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
                                <TableRow 
                                    key={index} 
                                    className={clsx(
                                        "hover:bg-gray-100 dark:hover:bg-gray-700 transition-all",
                                        index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
                                    )}
                                >
                                    {columns.map((col) => (
                                        <TableCell key={col.key} className="px-3 py-3 text-sm text-gray-900 dark:text-gray-100">
                                            {/* 🟢 Manejo de valores booleanos con iconos */}
                                            {typeof row[col.key] === "boolean" ? (
                                                row[col.key] ? (
                                                    <CheckCircle className="text-green-500 inline" size={16} />
                                                ) : (
                                                    <XCircle className="text-red-500 inline" size={16} />
                                                )
                                            ) : col.type === "date" ? (
                                                formatDate(row[col.key]) // 🎯 Formatear fecha
                                            ) : (
                                                row[col.key] || "No disponible"
                                            )}
                                        </TableCell>
                                    ))}
                                    {showActions && (
                                        <TableCell className="px-3 py-3 flex gap-2">
                                            {actions.map((action, idx) => (
                                                <Button
                                                    key={idx}
                                                    variant={action.variant}
                                                    onClick={() => action.onClick(row)}
                                                    className="text-xs px-2 py-1"
                                                >
                                                    {action.icon && <action.icon size={14} className="mr-1" />}
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

            {/* 📌 Paginación Mejorada */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-2 px-2">
                    <Button variant="outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Anterior
                    </Button>
                    <span className="text-sm font-semibold">{currentPage} de {totalPages}</span>
                    <Button variant="outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Siguiente
                    </Button>
                </div>
            )}
        </div>
    );
};

export default DataTable;
