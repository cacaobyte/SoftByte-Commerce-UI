'use client';
import React, { useState, useEffect } from "react";
import ArticlesService from "../../../service/SoftbyteCommerce/Article/articleService";
import ArticlesChart from "../../../components/Articles/ArticlesChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const articlesService = new ArticlesService();

  const fetchArticles = async () => {
    try {
      const response = await articlesService.getArticles();
      setArticles(response.data);
      setFilteredArticles(response.data);
    } catch (err) {
      setError("Error al cargar los artículos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    let filtered = articles;

    if (search) {
      filtered = filtered.filter((article) =>
        article.articulo1.toLowerCase().includes(search.toLowerCase()) ||
        article.descripcion.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "active") {
      filtered = filtered.filter((article) => article.activo);
    } else if (filter === "inactive") {
      filtered = filtered.filter((article) => !article.activo);
    }

    setFilteredArticles(filtered);
  }, [search, filter, articles]);

  if (loading) return <div className="text-center p-4">Cargando artículos...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  const openDetails = (article) => {
    setSelectedArticle(article);
  };

  const closeDetails = () => {
    setSelectedArticle(null);
  };

  const totalValue = articles.reduce((sum, article) => sum + article.precio, 0);
  const mostExpensive = articles.reduce((prev, current) => (prev.precio > current.precio ? prev : current), {});
  const cheapest = articles.reduce((prev, current) => (prev.precio < current.precio ? prev : current), {});
  const categories = [...new Set(articles.map((article) => article.categoria))];

  return (
    <div className="p-6 space-y-6">
      {/* Panel de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="shadow-lg p-4 hover:shadow-xl transition">
          <CardHeader>
            <CardTitle>Total de Artículos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-gray-800">{articles.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg p-4 hover:shadow-xl transition">
          <CardHeader>
            <CardTitle>Más Caro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-blue-600">{mostExpensive.descripcion || "N/A"}</p>
            <p className="text-sm text-gray-500">Q{mostExpensive.precio?.toFixed(2) || "0.00"}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg p-4 hover:shadow-xl transition">
          <CardHeader>
            <CardTitle>Más Económico</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-green-600">{cheapest.descripcion || "N/A"}</p>
            <p className="text-sm text-gray-500">Q{cheapest.precio?.toFixed(2) || "0.00"}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg p-4 hover:shadow-xl transition">
          <CardHeader>
            <CardTitle>Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-blue-600">Q{totalValue.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico y tabla */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <ArticlesChart articles={articles} />
        </div>
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <Input
              placeholder="Buscar por descripción..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
            <div className="flex space-x-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-blue-600 text-white" : ""}
              >
                Todos
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                onClick={() => setFilter("active")}
                className={filter === "active" ? "bg-green-600 text-white" : ""}
              >
                Activos
              </Button>
              <Button
                variant={filter === "inactive" ? "default" : "outline"}
                onClick={() => setFilter("inactive")}
                className={filter === "inactive" ? "bg-red-600 text-white" : ""}
              >
                Inactivos
              </Button>
            </div>
          </div>
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
              {filteredArticles.map((article, index) => (
                <TableRow key={index}>
                  <TableCell>{article.articulo1}</TableCell>
                  <TableCell>{article.descripcion}</TableCell>
                  <TableCell>Q{article.precio.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={article.activo ? "success" : "destructive"}>
                      {article.activo ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => openDetails(article)}>
                          Ver Detalles
                        </Button>
                      </DialogTrigger>
                      {selectedArticle && selectedArticle.articulo1 === article.articulo1 && (
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>{selectedArticle.descripcion}</DialogTitle>
                            <DialogDescription>
                              Detalles completos del artículo.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            {/* Imagen del artículo */}
                            <div className="flex justify-center">
                              <img
                                src={selectedArticle.foto || "/placeholder.png"}
                                alt={selectedArticle.descripcion}
                                className="rounded-lg shadow-md w-full h-60 object-cover"
                              />
                            </div>
                            {/* Información adicional */}
                            <div className="text-sm space-y-2">
                              <p>
                                <strong>Código:</strong> {selectedArticle.articulo1}
                              </p>
                              <p>
                                <strong>Precio:</strong> Q{selectedArticle.precio.toFixed(2)}
                              </p>
                              <p>
                                <strong>Peso Neto:</strong> {selectedArticle.pesoNeto} kg
                              </p>
                              <p>
                                <strong>Volumen:</strong> {selectedArticle.volumen} m³
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" onClick={closeDetails}>
                              Cerrar
                            </Button>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
