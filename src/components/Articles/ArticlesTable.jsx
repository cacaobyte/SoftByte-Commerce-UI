import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import ArticleDetailsModal from "./ArticleDetailsModal";
import ArticleStockModal from "./ArticleStockModal"; // Nuevo modal de stock

const ArticlesTable = ({ articles, filter, setFilter, search, setSearch }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filtrar artículos según búsqueda y filtro
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.descripcion.toLowerCase().includes(search.toLowerCase());
    return filter === "all" ? matchesSearch : article.activo === (filter === "active") && matchesSearch;
  });

  // Calcular páginas
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4">
      {/* Filtros y Búsqueda */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <input
          placeholder="Buscar por descripción..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-auto border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-2">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            Todos
          </Button>
          <Button variant={filter === "active" ? "default" : "outline"} onClick={() => setFilter("active")}>
            Activos
          </Button>
          <Button variant={filter === "inactive" ? "default" : "outline"} onClick={() => setFilter("inactive")}>
            Inactivos
          </Button>
        </div>
      </div>

      {/* Tabla con scroll */}
      <div className="overflow-auto max-h-[400px] border rounded-md shadow-inner">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedArticles.map((article) => (
              <TableRow key={article.articulo1}>
                <TableCell>{article.articulo1}</TableCell>
                <TableCell>{article.descripcion}</TableCell>
                <TableCell>Q{article.precio.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={article.activo ? "success" : "destructive"}>
                    {article.activo ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => { setSelectedArticle(article); setIsDetailsOpen(true); }}>
                    Ver Detalles
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { setSelectedArticle(article); setIsStockOpen(true); }}>
                    Ver Stock
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Selector de artículos por página */}
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-700">
            Artículos por página:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reinicia a la primera página
            }}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm pr-8"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>

        {/* Controles de paginación */}
        <div className="flex items-center justify-center space-x-2 text-sm">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Anterior
          </Button>
          <span>
            Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente →
          </Button>
        </div>
      </div>

      {/* Modales */}
      <ArticleDetailsModal article={selectedArticle} isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
      <ArticleStockModal article={selectedArticle} isOpen={isStockOpen} onClose={() => setIsStockOpen(false)} />
    </div>
  );
};

export default ArticlesTable;
