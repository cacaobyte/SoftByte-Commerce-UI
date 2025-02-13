"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import productClassifications from "../../../models/Articles/ProductClassificationModel";
import ArticlesService from "../../../service/SoftbyteCommerce/Article/articleService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick"; 
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHasMounted } from '../../../hooks/useHasMounted';
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen"
import ProtectedPage from '../../../components/ProtectedPage';

const articlesService = new ArticlesService();

export default function ClassificationPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasMounted = useHasMounted();

  const handleClassificationClick = async (classification) => {
    setLoading(true);
    try {
      const response = await articlesService.getAllArticles();
      const filteredArticles = response.data.filter(
        (article) => article.clasificación === classification
      );
      setArticles(filteredArticles);
    } catch (error) {
      toast.error("Error al obtener los artículos.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  function CustomArrow({ direction, onClick }) {
    return (
      <div
        className={`absolute ${direction === "left" ? "left-0" : "right-0"} top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-gray-900 p-2 rounded-full`}
        onClick={onClick}
      >
        {direction === "left" ? <ChevronLeft size={24} color="white" /> : <ChevronRight size={24} color="white" />}
      </div>
    );
  }
  if(!hasMounted) {
    return  <div className="">
    <div className=""><LoadingScreen message="Preparando tu experiencia..."/></div>
  </div>;
  }

  return (
    <ProtectedPage>
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-bold">Clasificación de Artículos</h1>
        <p className="mt-2 text-lg text-gray-300">
          Aprende sobre las diferentes clasificaciones disponibles para dividir tus artículos de manera adecuada.
        </p>
      </div>

      {/* Clasificaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {productClassifications.map(({ title, description, icon: Icon, bgColor }, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleClassificationClick(title)}
          >
            <div className={`w-full h-32 flex items-center justify-center ${bgColor} text-white`}>
              <Icon size={48} />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{truncateText(description, 100)}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Buscar artículos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Resultados */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Artículos Encontrados</h2>
        {loading ? (
          <p className="text-gray-500">Cargando artículos...</p>
        ) : articles.length > 0 ? (
          searchTerm ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.filter(article => article.descripcion.toLowerCase().includes(searchTerm.toLowerCase())).map((article, index) => (
                <Card key={index} className="shadow-md min-h-[300px] flex flex-col" onClick={() => handleCardClick(article)}>
                  <img src={article.foto} alt={article.descripcion} className="w-full h-48 object-cover" />
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold dark:text-white">{truncateText(article.descripcion, 60)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-white">Categoría: {article.categoria}</p>
                    <p className="text-gray-700 dark:text-white">Precio: Q{article.precio.toFixed(2)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {articles.map((article, index) => (
                <div key={index} className="px-2">
                  <Card className="shadow-md min-h-[300px] flex flex-col" onClick={() => handleCardClick(article)}>
                    <img src={article.foto} alt={article.descripcion} className="w-full h-48 object-cover" />
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">{truncateText(article.descripcion, 60)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-white">Categoría: {article.categoria}</p>
                      <p className="text-gray-700 dark:text-white">Precio: Q{article.precio.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Slider>
          )
        ) : (
          <p className="text-gray-500">No se encontraron artículos para esta clasificación.</p>
        )}
      </div>

      {/* Modal */}
      {selectedArticle && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedArticle.descripcion}</DialogTitle>
              <div className="mt-4">
                <img src={selectedArticle.foto} alt={selectedArticle.descripcion} className="w-full h-64 object-cover mb-4" />
                <div className="space-y-2">
                  <p><strong>Categoría:</strong> {selectedArticle.categoria}</p>
                  <p><strong>Precio:</strong> Q{selectedArticle.precio.toFixed(2)}</p>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
    </ProtectedPage>
  );
}
