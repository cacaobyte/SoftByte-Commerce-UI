"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FaTag,
  FaDollarSign,
  FaBoxes,
  FaClipboardList,
  FaPlus,
  FaTrash,
  FaPercentage,
  FaCheckCircle,
} from "react-icons/fa";
import ArticlesService from "../../../../service/SoftbyteCommerce/Article/articleService";
import { toast } from "react-toastify";

const QuotesArticles = ({ onSelectArticles, warehouseCode  }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("list");

  useEffect(() => {
    const fetchArticles = async () => {
      const service = new ArticlesService();
      try {
        const response = await service.getArticlesSelectedWarehouse(warehouseCode);
        setArticles(response.data);
        setFilteredArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const filtered = articles.filter((article) =>
      `${article.descripcion} ${article.categoria}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [search, articles]);

  const addArticleToQuote = (article) => {
    if (selectedArticles.find((a) => a.articulo1 === article.articulo1)) {
      return;
    }
    setSelectedArticles([
      ...selectedArticles,
      {
        ...article,
        cantidad: 1,
        descuento: 0,
        impuesto: 0,
        aplicarImpuesto: false,
        tipoDescuento: "cantidad",
        subtotal: article.precio,
        total: article.precio,
      },
    ]);
    setActiveTab("selected");
  };

  const updateArticleDetails = (index, field, value) => {
    const updatedArticles = [...selectedArticles];
    updatedArticles[index][field] = value;

    const precioUnitario = updatedArticles[index].precio;
    const cantidad = updatedArticles[index].cantidad || 1;
    let descuento = updatedArticles[index].descuento || 0;
    let impuesto = updatedArticles[index].aplicarImpuesto ? 0.12 : 0;

    if (updatedArticles[index].tipoDescuento === "porcentaje") {
      descuento = (precioUnitario * cantidad * updatedArticles[index].descuento) / 100;
    }

    updatedArticles[index].subtotal = precioUnitario * cantidad - descuento;
    updatedArticles[index].impuesto = updatedArticles[index].subtotal * impuesto;
    updatedArticles[index].total = updatedArticles[index].subtotal + updatedArticles[index].impuesto;

    setSelectedArticles(updatedArticles);
  };

  const removeArticle = (index) => {
    const updatedArticles = selectedArticles.filter((_, i) => i !== index);
    setSelectedArticles(updatedArticles);
  };

  return (
    <motion.div className="w-full border rounded-lg overflow-hidden shadow-lg bg-white">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex border-b bg-gray-200 p-2">
          <TabsTrigger value="list" className="flex-1 text-center p-2">
            Lista de Artículos
          </TabsTrigger>
          <TabsTrigger value="selected" className="flex-1 text-center p-2">
            Artículos Seleccionados
          </TabsTrigger>
        </TabsList>

        {/* Lista de Artículos */}
        <TabsContent value="list" className="p-4">
          <Input
            placeholder="Buscar artículos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 border border-gray-300 rounded-lg"
          />

          {filteredArticles.length === 0 ? (
            <div className="text-center p-6 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Esta bodega no tiene artículos registrados.
              </p>
              <p className="text-sm text-gray-500">
                Crea y registra nuevos artículos, o asigna artículos existentes a esta bodega para comenzar a cotizar.
              </p>
            </div>
          ) : (
            <ul>
              {filteredArticles.map((article, index) => (
                <motion.li
                  key={index}
                  onClick={() => addArticleToQuote(article)}
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
                    <p className="text-xs text-gray-500">Precio: Q{article.precio.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Stock: {article.existencias}</p>
                  </div>
                  <FaPlus className="text-green-500 ml-auto" />
                </motion.li>
              ))}
            </ul>
          )}
        </TabsContent>


        {/* Artículos Seleccionados */}
        <TabsContent value="selected" className="p-6">
          {selectedArticles.length === 0 ? (
            <p className="text-gray-500">No hay artículos seleccionados.</p>
          ) : (
            <ul>
              {selectedArticles.map((article, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-sm mb-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{article.descripcion}</h3>
                    <FaTrash className="text-red-500 cursor-pointer" onClick={() => removeArticle(index)} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <p>
                      Cantidad:
                      <input
                        type="number"
                        min="1"
                        value={article.cantidad}
                        onChange={(e) => updateArticleDetails(index, "cantidad", parseInt(e.target.value))}
                        className="border rounded px-2 py-1 w-16"
                      />
                    </p>
                    <p>
                      Impuesto:
                      <input
                        type="checkbox"
                        checked={article.aplicarImpuesto}
                        onChange={(e) => updateArticleDetails(index, "aplicarImpuesto", e.target.checked)}
                      />
                      {article.aplicarImpuesto && <span> 12% IVA</span>}
                    </p>
                    <p>
                      Descuento:
                      <select
                        onChange={(e) => updateArticleDetails(index, "tipoDescuento", e.target.value)}
                        value={article.tipoDescuento}
                      >
                        <option value="cantidad">Cantidad</option>
                        <option value="porcentaje">Porcentaje</option>
                      </select>
                      <input
                        type="number"
                        min="0"
                        value={article.descuento}
                        onChange={(e) => updateArticleDetails(index, "descuento", parseFloat(e.target.value))}
                        className="border rounded px-2 py-1 w-16"
                      />
                    </p>
                    <p>Total: Q{article.total.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>

      {/* Botón de Aplicar Cotización */}
      <div className="p-4 border-t flex justify-end">
        <Button
          className="bg-black text-white font-bold py-2 px-4 rounded-lg"
          onClick={() => onSelectArticles(selectedArticles)}
        >
          Aplicar Cotización
        </Button>
      </div>
    </motion.div>
  );
};

export default QuotesArticles;
