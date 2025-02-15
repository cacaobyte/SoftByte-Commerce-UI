"use client";
import { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, ChevronRight, FileSpreadsheet, CheckCircle, XCircle } from "lucide-react";
import * as XLSX from "xlsx";

const DataTable = ({ columns, data, searchField, actions = [], showActions = false }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredData(
      data.filter((item) => item[searchField]?.toString().toLowerCase().includes(query))
    );
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    const sortedData = [...filteredData].sort((a, b) => {
      const valueA = a[column]?.toString().toLowerCase() || "";
      const valueB = b[column]?.toString().toLowerCase() || "";
      return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });

    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
    XLSX.writeFile(wb, "tabla_excel.xlsx");
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder={`Buscar ${searchField}...`}
          value={search}
          onChange={handleSearch}
          className="w-1/3"
        />
        <Button onClick={exportToExcel} className="flex items-center gap-2">
          <FileSpreadsheet size={18} /> Exportar Excel
        </Button>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-md">
        <Table className="hidden md:table min-w-full">
          <TableHeader className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}{" "}
                  {sortColumn === col.key && (sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </TableHead>
              ))}
              {showActions && <TableHead className="px-4 py-2">Acciones</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={index} className="border-b bg-white dark:bg-gray-900">
                  {columns.map((col) => (
                    <TableCell key={col.key} className="px-4 py-2">
                      {col.render ? col.render(row) : row[col.key] || "No disponible"}
                    </TableCell>
                  ))}
                  {showActions && (
                    <TableCell className="px-4 py-2 flex gap-2">
                    {actions.map((action, idx) => (
                      <Button
                        key={idx}
                        variant={action.variant || "default"}
                        onClick={() => typeof action.onClick === "function" && action.onClick(row)}
                      >
                        {action.label || "Acción"}
                      </Button>
                    ))}
                  </TableCell>

                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (showActions ? 1 : 0)} className="text-center py-4">
                  No hay registros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="md:hidden">
  {paginatedData.length > 0 ? (
    paginatedData.map((row, index) => (
      <div key={index} className="border-b border-gray-300 py-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">{row[columns[0].key]}</span>
          <Button variant="ghost" onClick={() => setExpandedRow(expandedRow === index ? null : index)}>
            {expandedRow === index ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </Button>
        </div>
        {expandedRow === index && (
          <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="grid grid-cols-1 gap-4 text-sm">
              {columns.map((col) => (
                <p key={col.key} className="flex justify-between">
                  <span className="font-semibold">{col.label}:</span>
                  <span>{col.render ? col.render(row) : row[col.key] || "No disponible"}</span>
                </p>
              ))}
            </div>
            {/* 📌 Sección de Acciones para Móvil */}
            {showActions && (
              <div className="mt-4 flex flex-wrap gap-2">
                {actions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant={action.variant || "default"}
                    onClick={() => typeof action.onClick === "function" && action.onClick(row)}
                  >
                    {action.label || "Acción"}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    ))
  ) : (
    <p className="text-center py-4">No hay registros.</p>
  )}
</div>


      </div>

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
