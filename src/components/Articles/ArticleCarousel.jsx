import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ArticlesService from "../../service/SoftbyteCommerce/Article/articleService";

const articlesService = new ArticlesService();

const ArticleCarousel = () => {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await articlesService.getAllArticles();
                setArticles(response.data);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
        fetchArticles();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % articles.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
    };

    return (
        <div className="relative w-full flex justify-center items-center px-4">
            {/* Left Navigation */}
            <Button 
                variant="ghost" 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
                onClick={prevSlide}
            >
                <ChevronLeft size={24} />
            </Button>

            {/* Articles Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                {articles.slice(currentIndex, currentIndex + 3).map((article, index) => (
                    <Card key={article.articulo1} className="w-full h-[400px] flex flex-col justify-between">
                        <CardHeader>
                            <img 
                                src={article.foto} 
                                alt={article.descripcion} 
                                className="w-full h-[200px] object-cover rounded-md"
                            />
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-lg font-semibold truncate">{article.descripcion}</CardTitle>
                            <p className="text-sm text-gray-500">Categoría: {article.categoria}</p>
                            <p className="text-blue-600 font-semibold">Q{article.precio}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Right Navigation */}
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
