"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog";
import DynamicForm from "../../../../components/shared/Forms/DynamicForm"; // Usamos DynamicForm
import ArticlesService from "../../../../service/SoftbyteCommerce/Article/articleService";
import CategoriesService from "../../../../service/SoftbyteCommerce/Sales/categories/categoriesService"; 
import { useHasMounted } from '../../../../hooks/useHasMounted';
import ArticleCarousel from "../../../../components/Articles/ArticleCarousel";
import LoadingScreen from "../../../../components/UseHasMounted/LoadingScreen";


const articlesService = new ArticlesService();
const categoriesService = new CategoriesService();

const CreateArticles = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [formData, setFormData] = useState({}); // Estado para los datos del formulario
    const [loading, setLoading] = useState(true);
    const hasMounted = useHasMounted();

    useEffect(() => {
        fetchArticles();
        fetchCategories();
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

    const fetchCategories = async () => {
        try {
            const response = await categoriesService.getCategoriesSubCategories();
            setCategories(response.data);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    };

    const handleCategoryChange = (categoryName) => {
        const selectedCategory = categories.find(cat => cat.name === categoryName);
    
        setFormData((prev) => ({
            ...prev,
            categoria: selectedCategory ? selectedCategory.name : "", // Guarda el nombre en lugar del ID
            subCategoria: "", // Resetea la subcategoría al cambiar la categoría
        }));
    
        setSubcategories(selectedCategory ? selectedCategory.subcategoriaList : []);
    };
    
    const handleSubCategoryChange = (subCategoryName) => {
        const selectedSubCategory = subcategories.find(sub => sub.name === subCategoryName);
    
        setFormData((prev) => ({
            ...prev,
            subCategoria: selectedSubCategory ? selectedSubCategory.name : "", // Guarda el nombre en lugar del ID
        }));
    };
    

    const handleCreateArticle = async (formData) => {
        try {
            console.log("Enviando datos a createArticle:", formData);

            const formDataToSend = new FormData();
            formDataToSend.append("descripcion", formData.descripcion);
            formDataToSend.append("categoria", formData.categoria);
            formDataToSend.append("subCategoria", formData.subCategoria);
            formDataToSend.append("clasificacion", formData.clasificacion);
            formDataToSend.append("precio", formData.precio);
            
            if (formData.pesoNeto) formDataToSend.append("pesoNeto", formData.pesoNeto);
            if (formData.pesoBruto) formDataToSend.append("pesoBruto", formData.pesoBruto);
            
            if (formData.imageFile) {
                formDataToSend.append("imageFile", formData.imageFile);
            } else {
                console.warn("No se ha seleccionado ninguna imagen.");
            }

            await articlesService.createArticle(formDataToSend);

            setIsOpen(false);
            fetchArticles();
        } catch (error) {
            console.error("Error al crear el artículo:", error.response?.data || error.message);
            alert("Error al crear el artículo");
        }
    };

    const articleModel = [
        { name: "descripcion", label: "Descripción", type: "text", required: true },
        {
            name: "categoria",
            label: "Categoría",
            type: "select",
            required: true,
            options: categories.map(cat => ({ label: cat.name, value: cat.name })), // Se guarda el nombre
            onChange: handleCategoryChange
        },
        {
            name: "subCategoria",
            label: "SubCategoría",
            type: "select",
            required: true,
            options: subcategories.map(sub => ({ label: sub.name, value: sub.name })), // Se guarda el nombre
            disabled: subcategories.length === 0,
            onChange: handleSubCategoryChange
        },
        {
            name: "clasificacion",
            label: "Clasificación",
            type: "select",
            required: true,
            options: [
                { label: "Ventas", value: "Ventas" },
                { label: "Consumo", value: "Consumo" },
                { label: "Marketing / Propaganda", value: "Marketing / Propaganda" }
            ]
        },
        { name: "precio", label: "Precio", type: "number", required: true },
        { name: "pesoNeto", label: "Peso Neto (kg)", type: "number", placeholder: "Ej: 5.5" },
        { name: "pesoBruto", label: "Peso Bruto (kg)", type: "number", placeholder: "Ej: 6.2" },
        { name: "imageFile", label: "Imagen", type: "file", accept: "image/*" },
    ];
    
    

    if (!hasMounted) {
        return (
            <div className="">
                <div className="">
                    <LoadingScreen message="Preparando tu experiencia..." />
                </div>
            </div>
        );
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
                            <DynamicForm
                                model={articleModel}
                                title=""
                                onSubmit={handleCreateArticle} // Ahora llama a createArticle
                                initialValues={formData} // Pasa el estado formData como valores iniciales
                                columns={2}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div>
                <ArticleCarousel />
            </div>
        </div>
    );
};

export default CreateArticles;
