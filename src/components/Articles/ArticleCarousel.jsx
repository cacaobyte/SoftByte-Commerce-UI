'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ArticlesService from "../../service/SoftbyteCommerce/Article/articleService";

const articlesService = new ArticlesService();

const ArticleCarousel = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await articlesService.getAllArticles();
                setArticles(response.data);
                setFilteredArticles(response.data); // Inicialmente, mostramos todos
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
        fetchArticles();
    }, []);

    // Función de búsqueda y filtrado
    useEffect(() => {
        let filtered = articles;
        if (searchTerm) {
            filtered = filtered.filter(article => 
                article.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedCategory) {
            filtered = filtered.filter(article => article.categoria === selectedCategory);
        }
        setFilteredArticles(filtered);
    }, [searchTerm, selectedCategory, articles]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 3 < filteredArticles.length ? prev + 3 : 0));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 3 >= 0 ? prev - 3 : filteredArticles.length - 3));
    };

    return (
        <div className="relative w-full flex flex-col justify-center items-center px-4">
            
            {/* 🔍 Búsqueda y filtro */}
            <div className="flex flex-wrap justify-between w-full max-w-6xl mb-4 gap-2">
                <Input 
                    placeholder="Buscar artículo..." 
                    className="w-2/5"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select 
                    className="w-2/5" 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    {Array.from(new Set(articles.map(a => a.categoria))).map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </Select>
            </div>

            {/* 📌 Navegación izquierda */}
            <Button 
                variant="ghost" 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
                onClick={prevSlide}
            >
                <ChevronLeft size={24} />
            </Button>

            {/* 🖼️ Tarjetas de artículos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                {filteredArticles.slice(currentIndex, currentIndex + 3).map((article, index) => (
                    <Card key={article.articulo1} className="w-full h-[400px] flex flex-col justify-between">
                        <CardHeader className="relative">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <img 
                                        src={article.foto} 
                                        alt={article.descripcion} 
                                        className="w-full h-[200px] object-cover rounded-md cursor-pointer hover:opacity-80 transition"
                                        onClick={() => setSelectedArticle(article)}
                                    />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{article.descripcion}</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col items-center text-center">
                                        <img 
                                            src={article.foto} 
                                            alt={article.descripcion} 
                                            className="w-full h-[300px] object-cover rounded-md"
                                        />
                                        <p className="text-sm text-gray-500 mt-2">Categoría: {article.categoria}</p>
                                        <p className="text-blue-600 font-semibold text-xl">Q{article.precio}</p>
                                        <p className="mt-2">SubCategoría: {article.subCategoria || "N/A"}</p>
                                        <p className="mt-2">Peso Neto: {article.pesoNeto || "N/A"} kg</p>
                                        <p className="mt-2">Peso Bruto: {article.pesoBruto || "N/A"} kg</p>
                                        <p className="mt-4 text-gray-700">{article.clasificación}</p>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-lg font-semibold truncate">{article.descripcion}</CardTitle>
                            <p className="text-sm text-gray-500">Categoría: {article.categoria}</p>
                            <p className="text-blue-600 font-semibold">Q{article.precio}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* 📌 Navegación derecha */}
            <Button 
                variant="ghost" 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
                onClick={nextSlide}
            >
                <ChevronRight size={24} />
            </Button>
        </div>
    );
};

export default ArticleCarousel;
