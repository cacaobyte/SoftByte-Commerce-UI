"use client";

import React, { useEffect, useState } from "react";
import ArticlesService from "../../../service/SoftbyteCommerce/Article/articleService";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);
    const [articlesWholesale, setArticlesWholesale] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const articlesService = new ArticlesService();

    const fetchArticlesWholesale = async () => {
        try {
            const response = await articlesService.getArticlesWholesale();
            setArticlesWholesale(response.data);      
        } catch (error) {
            setError("Error al cargar los artículos al por mayor.");
        }finally {
            setLoading(false);
        }
    };

        const fetchArticles = async () => {
            try {
                const response = await articlesService.getArticles();
                setArticles(response.data); // Ajusta según la estructura del response
            } catch (err) {
                setError("Error al cargar los artículos.");
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchArticlesWholesale();
        fetchArticles();
    }, []);

    if (loading) return <div className="text-center p-4">Cargando artículos...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {articles.map((article, index) => (
                <Card key={index} className="shadow-lg rounded-xl overflow-hidden">
                    <CardHeader>
                        <img
                            src={article.foto}
                            alt={article.descripcion}
                            className="w-full h-48 object-cover"
                        />
                        <div className="flex justify-between items-center mt-2">
                            <CardTitle className="text-xl">{article.descripcion}</CardTitle>
                            <Badge variant={article.activo ? "success" : "destructive"}>
                                {article.activo ? "Activo" : "Inactivo"}
                            </Badge>
                        </div>
                        <CardDescription>
                            {article.categoria} - {article.subCategoria}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p><strong>Código:</strong> {article.articulo1}</p>
                        <p><strong>Precio:</strong> Q{article.precio.toFixed(2)}</p>
                        <p><strong>Peso Neto:</strong> {article.pesoNeto} kg</p>
                        <p><strong>Volumen:</strong> {article.volumen} m³</p>
                        <p><strong>Fecha de Creación:</strong> {new Date(article.fechacreacion).toLocaleDateString()}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Creado por: {article.createdby}</span>
                        <Button variant="outline" size="sm">Detalles</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default ArticlesPage;
