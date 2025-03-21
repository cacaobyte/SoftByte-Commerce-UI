"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaTag, FaDollarSign, FaBoxes, FaClipboardList, FaPlus, FaTrash } from "react-icons/fa";
import ArticlesService from "../../../../service/SoftbyteCommerce/Article/articleService";

const QuotesArticles = ({ onSelectArticles }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      const service = new ArticlesService();
      try {
        const response = await service.getArticles();
        setArticles(response.data);
        setFilteredArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const filtered = articles.filter(article =>
      `${article.descripcion} ${article.categoria}`.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [search, articles]);

  const addArticleToQuote = (article) => {
    const exists = selectedArticles.find((a) => a.articulo1 === article.articulo1);
    if (!exists) {
      setSelectedArticles([...selectedArticles, { 
        ...article, 
        cantidad: 1, 
        descuento: 0, 
        impuesto: 0, 
        subtotal: article.precio, 
        total: article.precio 
      }]);
    }
  };

  const updateArticleDetails = (index, field, value) => {
    const updatedArticles = [...selectedArticles];
    updatedArticles[index][field] = value;

    // Recalcular el subtotal y total por artículo
    const precioUnitario = updatedArticles[index].precio;
    const cantidad = updatedArticles[index].cantidad;
    const descuento = updatedArticles[index].descuento || 0;
    const impuesto = updatedArticles[index].impuesto || 0;

    updatedArticles[index].subtotal = (precioUnitario * cantidad) - descuento;
    updatedArticles[index].total = updatedArticles[index].subtotal + impuesto;

    setSelectedArticles(updatedArticles);
  };

  const removeArticle = (index) => {
    const updatedArticles = selectedArticles.filter((_, i) => i !== index);
    setSelectedArticles(updatedArticles);
  };

  return (
    <motion.div className="flex flex-col md:flex-row w-full h-auto md:h-[600px] border rounded-lg overflow-hidden shadow-lg bg-white">
      
      {/* Lista de Artículos */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 overflow-y-auto border-r">
        <Input
          placeholder="Buscar artículos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 border border-gray-300 rounded-lg"
        />
        <ul>
          {filteredArticles.map((article, index) => (
            <motion.li
              key={index}
              onClick={() => addArticleToQuote(article)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer p-3 rounded-lg flex items-center gap-3 hover:bg-blue-100 transition"
            >
              <img
                src={article.foto}
                alt="Foto artículo"
                className="w-12 h-12 rounded-lg object-cover border border-gray-300"
              />
              <div>
                <p className="font-semibold">{article.descripcion}</p>
                <p className="text-xs text-gray-500">{article.categoria}</p>
              </div>
              <FaPlus className="text-green-500 ml-auto" />
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Cotización de Artículos */}
      <div className="w-full md:w-2/3 p-6">
        <h2 className="text-lg font-bold mb-4">Artículos Seleccionados</h2>
        {selectedArticles.length === 0 ? (
          <p className="text-gray-500">No hay artículos seleccionados.</p>
        ) : (
          <ul>
            {selectedArticles.map((article, index) => (
              <li key={index} className="p-4 border rounded-lg shadow-sm mb-2 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{article.descripcion}</h3>
                  <FaTrash className="text-red-500 cursor-pointer" onClick={() => removeArticle(index)} />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <FaTag className="text-gray-600" />
                    <p className="text-sm font-semibold">Código:</p>
                    <p>{article.articulo1}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaDollarSign className="text-green-600" />
                    <p className="text-sm font-semibold">Precio Unitario:</p>
                    <p>${article.precio.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">Cantidad:</p>
                    <input
                      type="number"
                      min="1"
                      value={article.cantidad}
                      onChange={(e) => updateArticleDetails(index, "cantidad", parseInt(e.target.value))}
                      className="border rounded px-2 py-1 w-16"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">Descuento:</p>
                    <input
                      type="number"
                      min="0"
                      value={article.descuento}
                      onChange={(e) => updateArticleDetails(index, "descuento", parseFloat(e.target.value))}
                      className="border rounded px-2 py-1 w-16"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">Impuesto:</p>
                    <input
                      type="number"
                      min="0"
                      value={article.impuesto}
                      onChange={(e) => updateArticleDetails(index, "impuesto", parseFloat(e.target.value))}
                      className="border rounded px-2 py-1 w-16"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">Subtotal:</p>
                    <p>${article.subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">Total:</p>
                    <p className="font-bold text-green-600">${article.total.toFixed(2)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        <Button
          className="mt-4 bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={() => onSelectArticles(selectedArticles)}
        >
          Confirmar Cotización
        </Button>
      </div>
    </motion.div>
  );
};

export default QuotesArticles;
