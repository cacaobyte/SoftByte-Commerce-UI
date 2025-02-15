"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog";
import ArticlesService from "../../../../service/SoftbyteCommerce/Article/articleService";
import CategoriesService from "../../../../service/SoftbyteCommerce/Sales/categories/categoriesService";
import { useHasMounted } from "../../../../hooks/useHasMounted";
import LoadingScreen from "../../../../components/UseHasMounted/LoadingScreen";
import ArticleCarousel from "../../../../components/Articles/ArticleCarousel";
import ProtectedPage from "../../../../components/ProtectedPage";

const articlesService = new ArticlesService();
const categoriesService = new CategoriesService();

const CreateArticles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    descripcion: "",
    categoria: "",
    subCategoria: "",
    clasificacion: "",
    precio: "",
    pesoNeto: "",
    pesoBruto: "",
    imageFile: null,
  });
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
      toast.error("Error al cargar los artículos.");
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
      toast.error("Error al cargar las categorías.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imageFile: e.target.files[0],
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find((cat) => cat.name === e.target.value);
    setFormData((prev) => ({
      ...prev,
      categoria: selectedCategory ? selectedCategory.name : "",
      subCategoria: "",
    }));
    setSubcategories(selectedCategory ? selectedCategory.subcategoriaList : []);
  };

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });

      await articlesService.createArticle(formDataToSend);
      toast.success("Artículo creado con éxito.");
      setIsOpen(false);
      setFormData({  // Resetea el formulario después de crear el artículo
        descripcion: "",
        categoria: "",
        subCategoria: "",
        clasificacion: "",
        precio: "",
        pesoNeto: "",
        pesoBruto: "",
        imageFile: null,
      });
      fetchArticles();  // Actualiza el carrusel de artículos
    } catch (error) {
      console.error("Error al crear el artículo:", error.response?.data || error.message);
      toast.error("Error al crear el artículo.");
    }
  };

  if (!hasMounted) {
    return (
      <div>
        <LoadingScreen message="Preparando tu experiencia..." />
      </div>
    );
  }

  return (
    <ProtectedPage>
      <div className="max-w-6xl mx-auto mt-10">
        <div className="flex justify-end mb-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsOpen(true)}>Agregar Artículo</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nuevo Artículo</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateArticle} className="grid grid-cols-2 gap-4">
                <div>
                  <label>Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Categoría</label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleCategoryChange}
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>SubCategoría</label>
                  <select
                    name="subCategoria"
                    value={formData.subCategoria}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                    disabled={subcategories.length === 0}
                  >
                    <option value="">Seleccionar subcategoría</option>
                    {subcategories.map((sub) => (
                      <option key={sub.name} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Clasificación</label>
                  <select
                    name="clasificacion"
                    value={formData.clasificacion}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Seleccionar clasificación</option>
                    <option value="Ventas">Ventas</option>
                  </select>
                </div>
                <div>
                  <label>Precio</label>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Peso Neto (kg)</label>
                  <input
                    type="number"
                    name="pesoNeto"
                    value={formData.pesoNeto}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Peso Bruto (kg)</label>
                  <input
                    type="number"
                    name="pesoBruto"
                    value={formData.pesoBruto}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Imagen</label>
                  <input
                    type="file"
                    name="imageFile"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="col-span-2 text-right">
                  <Button type="submit">Guardar</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <ArticleCarousel articles={articles} />
      </div>
    </ProtectedPage>
  );
};

export default CreateArticles;
