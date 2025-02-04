'use client';
import React, { useState, useEffect } from "react";
import ArticlesService from "../../../../service/SoftbyteCommerce/Article/articleService";
import ArticlesChart from "../../../../components/Articles/ArticlesChart";
import ArticlesTable from "../.././../../components/Articles/ArticlesTable";
import SummaryCard from "../../../../components/Articles/SummaryCard";
import CategoriesCard from "../../../../components/Articles/CategoriesCard";
import RecentArticlesCard from "../../../../components/Articles/RecentArticlesCard";
import { useHasMounted } from '../../../../hooks/useHasMounted';
import LoadingScreen from "../../../../components/UseHasMounted/LoadingScreen"

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasMounted = useHasMounted();

  const articlesService = new ArticlesService();

  const fetchArticles = async () => {
    try {
      const response = await articlesService.getArticles();
      setArticles(response.data);
      setFilteredArticles(response.data);
    } catch (err) {
      setError("Error al cargar los artículos.");
    } 
  };
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "N/A";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
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


  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  const totalValue = articles.reduce((sum, article) => sum + article.precio, 0);
  const mostExpensive = articles.reduce((prev, current) => (prev.precio > current.precio ? prev : current), {});
  const cheapest = articles.reduce((prev, current) => (prev.precio < current.precio ? prev : current), {});
  const categories = [...new Set(articles.map((article) => article.categoria))];
  const recentArticles = articles.slice(-3);

    if(!hasMounted) {
        return  <div className="">
        <div className=""><LoadingScreen message="Preparando tu experiencia..."/></div>
      </div>;
      }
      
  return (
    <div className="p-6 space-y-6">
      {/* Panel de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard title="Total de Artículos" value={articles.length} />
        <SummaryCard
  title="Más Caro"
  value={mostExpensive.descripcion ? truncateText(mostExpensive.descripcion, 60) : "N/A"}
  additionalInfo={`Q${mostExpensive.precio?.toFixed(2) || "0.00"}`}
  valueColor="text-blue-600"
/>

        <SummaryCard
          title="Más Económico"
          value={cheapest.descripcion || "N/A"}
          additionalInfo={`Q${cheapest.precio?.toFixed(2) || "0.00"}`}
          valueColor="text-green-600"
        />
      </div>

      {/* Categorías y recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoriesCard categories={categories} articles={articles} />
        <RecentArticlesCard recentArticles={recentArticles} />
      </div>

      {/* Gráfico y tabla */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ArticlesChart articles={articles} />
        <ArticlesTable
          articles={filteredArticles}
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
      </div>
    </div>
  );
};

export default ArticlesPage;
