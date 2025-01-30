"use client";
import { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

const DataTable = ({ columns, data, searchField }) => {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortColumn, setSortColumn] = useState(null);

    // Actualizar `filteredData` cuando cambia `data`
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
    };

    // 🔄 Ordenamiento dinámico en cualquier columna
    const handleSort = (column) => {
        const sortedData = [...filteredData].sort((a, b) => {
            const valueA = a[column]?.toString().toLowerCase();
            const valueB = b[column]?.toString().toLowerCase();
            if (sortOrder === "asc") {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        });

        setFilteredData(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setSortColumn(column);
    };

    // 📌 Ordenar por la primera columna desde el botón principal
    const handleSortButton = () => {
        if (columns.length > 0) {
            handleSort(columns[0].key);
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-8 p-4">
            <div className="flex justify-between items-center mb-4">
                {/* 🔍 Input de Búsqueda */}
                <Input 
                    type="text" 
                    placeholder={`Buscar ${searchField}...`}
                    value={search}
                    onChange={handleSearch}
                    className="w-1/3"
                />
                <Button variant="outline" onClick={handleSortButton}>
                    Ordenar
                </Button>
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
                                    {sortColumn === col.key ? (
                                        sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    ) : ""}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((row, index) => (
                                <TableRow key={index} className="hover:bg-gray-50">
                                    {columns.map((col) => (
                                        <TableCell key={col.key} className="px-4 py-2">{row[col.key]}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center text-gray-500 py-4">
                                    No hay registros.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;
