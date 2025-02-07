"use client";

import { useEffect, useState, useRef } from "react";
import GuiaService from "../../../service/SoftbyteCommerce/Sales/supports/guia/guiaService";
import { FaVideo, FaPlay, FaPause, FaExpand, FaVolumeUp, FaVolumeMute, FaDownload, FaFilter } from "react-icons/fa";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GuiasPage() {
    const [guias, setGuias] = useState([]);
    const [filteredGuias, setFilteredGuias] = useState([]);
    const [selectedGuia, setSelectedGuia] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const guiaService = new GuiaService();

    useEffect(() => {
        const fetchGuias = async () => {
            try {
                const response = await guiaService.getAllGuia();
                if (response.data) {
                    setGuias(response.data);
                    setFilteredGuias(response.data); // Inicialmente mostramos todas las guías
                }
            } catch (error) {
                console.error("Error cargando guías:", error);
            }
        };

        fetchGuias();
    }, []);

    // Filtrar por categoría
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        if (value === "Todas") {
            setFilteredGuias(guias);
        } else {
            setFilteredGuias(guias.filter((guia) => guia.categoria === value));
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Información sobre la página */}
            <div className="text-gray-700 text-lg">
                <h1 className="text-black text-3xl font-bold flex items-center gap-3">
                    <FaVideo className="text-4xl" /> Guías de Capacitación
                </h1>
                <p className="mt-2">
                    En esta sección encontrarás guías en video para capacitar a tu equipo sobre el uso del sistema.
                    Asegúrate de revisar estos recursos para maximizar el rendimiento y eficiencia en tu empresa.
                </p>
            </div>

            {/* Barra de filtrado */}
            <div className="mt-6 flex items-center gap-4">
                <FaFilter className="text-gray-500 text-lg" />
                <Select onValueChange={handleCategoryChange} value={selectedCategory}>
                    <SelectTrigger className="w-full md:w-1/3 border border-gray-300 rounded-lg p-3 shadow-sm">
                        <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Todas">Todas</SelectItem>
                        {[...new Set(guias.map((guia) => guia.categoria))].map((categoria) => (
                            <SelectItem key={categoria} value={categoria}>
                                {categoria}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Contenedor de las guías en formato de grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredGuias.length > 0 ? (
                    filteredGuias.map((guia) => (
                        <Dialog key={guia.id}>
                            <DialogTrigger asChild>
                                <div
                                    className="cursor-pointer border border-gray-300 rounded-lg shadow-md p-4 hover:bg-gray-100 transition duration-300 flex flex-col items-center text-center"
                                    onClick={() => setSelectedGuia(guia)}
                                >
                                    {/* Miniatura del video */}
                                    <div className="w-full h-40 rounded-md overflow-hidden">
                                        <video className="w-full h-full object-cover" muted>
                                            <source src={guia.urlExterna} type="video/mp4" />
                                        </video>
                                    </div>
                                    <h2 className="mt-3 font-semibold text-lg text-black">{guia.titulo}</h2>
                                    <p className="text-sm text-gray-600">{guia.categoria} • {guia.version}</p>
                                </div>
                            </DialogTrigger>

                            {/* Modal con el video */}
                            <DialogContent className="max-w-2xl p-4">
                                <DialogTitle>{selectedGuia?.titulo}</DialogTitle>
                                <p className="text-gray-600 mb-3">{selectedGuia?.contenido}</p>
                                
                                {/* Contenedor de video con controles personalizados */}
                                <div className="relative w-full h-60 md:h-96 bg-black rounded-lg overflow-hidden">
                                    <video ref={videoRef} className="w-full h-full" controls>
                                        <source src={selectedGuia?.urlExterna} type="video/mp4" />
                                        Tu navegador no soporta la reproducción de videos.
                                    </video>

                                    {/* Controles personalizados */}
                                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black bg-opacity-50 p-2 rounded-md">
                                        {/* Botón de Play/Pausa */}
                                        <button onClick={() => videoRef.current?.paused ? videoRef.current.play() : videoRef.current.pause()} className="text-white text-lg">
                                            {videoRef.current?.paused ? <FaPlay /> : <FaPause />}
                                        </button>

                                        {/* Control de volumen */}
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => {videoRef.current.muted = !videoRef.current.muted; setIsMuted(videoRef.current.muted)}} className="text-white text-lg">
                                                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                                            </button>
                                            <input 
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={volume}
                                                onChange={(event) => {videoRef.current.volume = parseFloat(event.target.value); setVolume(parseFloat(event.target.value))}}
                                                className="cursor-pointer w-24"
                                            />
                                        </div>

                                        {/* Botón de pantalla completa */}
                                        <button onClick={() => videoRef.current?.requestFullscreen()} className="text-white text-lg">
                                            <FaExpand />
                                        </button>

                                      
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-3">No hay guías disponibles.</p>
                )}
            </div>
        </div>
    );
}
