"use client";
import { useState } from "react";
import ArticlesService from "../../../service/SoftbyteCommerce/Article/articleService";

const CreateArticle = () => {
  const [article, setArticle] = useState({
    descripcion: "",
    categoria: "",
    precio: "",
    subCategoria: "",
    clasificacion: "",
    imageFile: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const articlesService = new ArticlesService();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArticle((prev) => ({
        ...prev,
        imageFile: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Crear un objeto FormData y agregar los valores del artículo (EXCLUYENDO Articulo1)
    const formData = new FormData();
    Object.keys(article).forEach((key) => {
        if (article[key] && key !== "Articulo1") {
            formData.append(key, article[key]);
        }
    });

    try {
        const response = await articlesService.createArticle(formData);
        console.log("Respuesta del servidor:", response.data);
        alert("Artículo creado con éxito");

        // Reiniciar formulario
        setArticle({
            descripcion: "",
            categoria: "",
            precio: "",
            subCategoria: "",
            clasificacion: "",
            imageFile: null,
        });
        setPreview(null);
    } catch (error) {
        console.error("Error en la solicitud:", error.response?.data || error.message);
        alert("Error al crear el artículo");
    } finally {
        setLoading(false);
    }
};



  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Crear Artículo</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={article.descripcion}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={article.categoria}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={article.precio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="subCategoria"
          placeholder="Subcategoría"
          value={article.subCategoria}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="clasificacion"
          placeholder="Clasificación"
          value={article.clasificacion}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <label className="block font-semibold">Imagen:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />

        {preview && (
          <img src={preview} alt="Preview" className="w-full h-40 object-cover mt-2 rounded" />
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Artículo"}
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
