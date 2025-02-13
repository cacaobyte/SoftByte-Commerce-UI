"use client";

import { useEffect, useState } from "react";
import GuiaService from "../../../service/SoftbyteCommerce/Sales/supports/guia/guiaService";
import { FaVideo } from "react-icons/fa";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BsDownload } from "react-icons/bs";
import { useHasMounted } from '../../../hooks/useHasMounted';
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen"
import ProtectedPage from '../../../components/ProtectedPage';

export default function GuiasPage() {
    const [guias, setGuias] = useState([]);
    const [selectedGuia, setSelectedGuia] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
    const [esMovil, setEsMovil] = useState(false);
    const hasMounted = useHasMounted();

    const cloudinaryCloudName = "dhhtmdjmt"; // Reemplázalo con tu Cloudinary Cloud Name
    const guiaService = new GuiaService();

    useEffect(() => {
        const fetchGuias = async () => {
            try {
                const response = await guiaService.getAllGuia();
                if (response.data) {
                    setGuias(response.data);
                    const categoriasUnicas = ["Todas", ...new Set(response.data.map((g) => g.categoria))];
                    setCategorias(categoriasUnicas);
                }
            } catch (error) {
                console.error("Error cargando guías:", error);
            }
        };

        fetchGuias();

        // Detectar si el usuario está en móvil
        const verificarDispositivo = () => {
            setEsMovil(window.innerWidth <= 768); // Pantallas menores a 768px se consideran móviles
        };

        verificarDispositivo();
        window.addEventListener("resize", verificarDispositivo);
        return () => window.removeEventListener("resize", verificarDispositivo);
    }, []);

    // Filtrar guías según la categoría seleccionada
    const guiasFiltradas = categoriaSeleccionada === "Todas"
        ? guias
        : guias.filter((guia) => guia.categoria === categoriaSeleccionada);

    // Generar miniatura de Cloudinary para el video
    const getCloudinaryThumbnail = (videoUrl) => {
        if (!videoUrl) return "/default-thumbnail.jpg"; // Imagen por defecto si no hay video

        const videoPublicId = videoUrl
            .split("/")
            .slice(-1)[0]
            .split(".")[0];

        return `https://res.cloudinary.com/${cloudinaryCloudName}/video/upload/w_300,h_200,c_fill/${videoPublicId}.jpg`;
    };

    // Descargar video directamente sin redirigir
    const handleDownload = async (videoUrl, titulo) => {
        try {
            const response = await fetch(videoUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${titulo}.mp4`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el video:", error);
        }
    };

    if(!hasMounted) {
        return  <div className="">
        <div className=""><LoadingScreen message="Preparando tu experiencia..."/></div>
      </div>;
      }
    return (
        <ProtectedPage>
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center gap-3 text-black text-3xl font-bold">
                <FaVideo className="text-4xl" />
                <h1>Guías de Capacitación</h1>
            </div>

            <p className="text-gray-600 mt-2">
                En esta sección encontrarás guías en video para capacitar a tu equipo sobre el uso del sistema.
                Asegúrate de revisar estos recursos para maximizar el rendimiento y eficiencia en tu empresa.
            </p>

            {/* Selector de categoría */}
            <div className="mt-4">
                <label className="text-gray-700 font-semibold">Filtrar por categoría:</label>
                <select
                    className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                    value={categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                    {categorias.map((categoria) => (
                        <option key={categoria} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {guiasFiltradas.length > 0 ? (
                    guiasFiltradas.map((guia) => (
                        <Dialog key={guia.id}>
                            <DialogTrigger asChild>
                                <div
                                    className="cursor-pointer border border-gray-300 rounded-lg shadow-md p-4 hover:bg-gray-100 transition duration-300 flex flex-col items-center text-center"
                                    onClick={() => setSelectedGuia(guia)}
                                >
                                    <div className="w-full h-40 rounded-md overflow-hidden">
                                        <img
                                            src={getCloudinaryThumbnail(guia.urlExterna)}
                                            alt={guia.titulo}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                console.error("Error cargando miniatura:", e.target.src);
                                                e.target.src = "/default-thumbnail.jpg"; // Imagen por defecto si falla
                                            }}
                                        />
                                    </div>
                                    <h2 className="mt-3 font-semibold text-lg text-black">{guia.titulo}</h2>
                                    <p className="text-sm text-gray-600">{guia.categoria} • {guia.version}</p>
                                </div>
                            </DialogTrigger>

                            <DialogContent className="max-w-2xl">
                                <DialogTitle>{selectedGuia?.titulo}</DialogTitle>
                                <p className="text-gray-600 mb-3">{selectedGuia?.contenido}</p>
                                <div className="w-full h-60 md:h-96">
                                    <video controls className="w-full h-full rounded-lg">
                                        <source src={selectedGuia?.urlExterna} type="video/mp4" />
                                        Tu navegador no soporta la reproducción de videos.
                                    </video>
                                </div>

                                {/* Mostrar el botón de descarga solo en PC */}
                                {!esMovil && (
                                    <button
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                                        onClick={() => handleDownload(selectedGuia?.urlExterna, selectedGuia?.titulo)}
                                    >
                                        <BsDownload />
                                        Descargar
                                    </button>
                                )}
                            </DialogContent>
                        </Dialog>
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-3">No hay guías disponibles en esta categoría.</p>
                )}
            </div>
        </div>
        </ProtectedPage>
    );
}
