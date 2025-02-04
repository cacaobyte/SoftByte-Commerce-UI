"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog";
import ArticleForm from "../../../../components/Articles/ArticleForm";
import ArticlesService from "../../../../service/SoftbyteCommerce/Article/articleService";
import { useHasMounted } from '../../../../hooks/useHasMounted';
import ArticleCarousel from "../../../../components/Articles/ArticleCarousel";
import LoadingScreen from "../../../../components/UseHasMounted/LoadingScreen"

const articlesService = new ArticlesService();

const CreateArticles = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasMounted = useHasMounted();

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await articlesService.getAllArticles();
            setArticles(response.data);
        } catch (error) {
            console.error("Error al obtener los artículos:", error);
        } finally {
            setLoading(false);
        }
    };

    if(!hasMounted) {
        return  <div className="">
        <div className=""><LoadingScreen message="Preparando tu experiencia..."/></div>
      </div>;
      }

    return (
        <div>
        <div className="max-w-6xl mx-auto mt-10">
            {/* Botón para agregar artículo */}
            <div className="flex justify-end mb-4">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsOpen(true)}>Agregar Artículo</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Nuevo Artículo</DialogTitle>
                        </DialogHeader>
                        <ArticleForm onClose={() => {
                            setIsOpen(false);
                            fetchArticles(); // Refrescar la lista de artículos después de agregar uno nuevo
                        }} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Lista de artículos */}

        </div>
            <div>   
                <ArticleCarousel/>
            </div>
        </div>
    );
};

export default CreateArticles;
