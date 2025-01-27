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

const ArticlesTable = ({ articles, filter, setFilter, search, setSearch }) => {
  const [selectedArticle, setSelectedArticle] = useState(null); // Estado para el artículo seleccionado
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage, setItemsPerPage] = useState(5); // Artículos por página

  // Filtrar artículos según la búsqueda y el filtro seleccionado
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.descripcion
      .toLowerCase()
      .includes(search.toLowerCase());
    if (filter === "all") return matchesSearch;
    if (filter === "active") return article.activo && matchesSearch;
    return !article.activo && matchesSearch;
  });

  // Calcular la cantidad total de páginas
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  // Obtener los artículos de la página actual
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Abrir detalles
  const openDetails = (article) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
  };

  // Cerrar detalles
  const closeDetails = () => {
    setSelectedArticle(null);
    setIsDialogOpen(false);
  };

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
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
          >
            Activos
          </Button>
          <Button
            variant={filter === "inactive" ? "default" : "outline"}
            onClick={() => setFilter("inactive")}
          >
            Inactivos
          </Button>
        </div>
      </div>

      {/* Tabla con barra de desplazamiento */}
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
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDetails(article)}
                  >
                    Ver Detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

{/* Paginación */}
<div className="flex items-center justify-between mt-4">
  <div className="flex items-center space-x-2">
    <label htmlFor="itemsPerPage" className="whitespace-nowrap">
      Artículos por página:
    </label>
    <select
      id="itemsPerPage"
      value={itemsPerPage}
      onChange={(e) => setItemsPerPage(Number(e.target.value))}
      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white pr-6"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01-.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundPosition: "right 0.5rem center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1rem",
      }}
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
    </select>
  </div>
  <div className="flex items-center space-x-2">
    <Button
      variant="outline"
      size="sm"
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Anterior
    </Button>
    <span>
      Página {currentPage} de {totalPages}
    </span>
    <Button
      variant="outline"
      size="sm"
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Siguiente
    </Button>
  </div>
</div>

      {/* Modal de Detalles */}
      <Dialog open={isDialogOpen} onOpenChange={closeDetails}>
        {selectedArticle && (
          <ArticleDetailsModal
            article={selectedArticle}
            onClose={closeDetails}
          />
        )}
      </Dialog>
    </div>
  );
};

export default ArticlesTable;
