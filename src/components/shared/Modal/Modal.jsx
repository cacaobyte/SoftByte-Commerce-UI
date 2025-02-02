"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Image as ImageIcon } from "lucide-react";

const GenericModal = ({ isOpen, onClose, title, data, model, hasImage = false }) => {
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg md:max-w-4xl p-6 rounded-lg shadow-lg bg-white transition-all duration-300">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">{title}</DialogTitle>
                </DialogHeader>

                {/* Contenedor Scrollable para evitar que los botones desaparezcan */}
                <div className="max-h-[70vh] overflow-y-auto p-2 space-y-6">
                    
                    {/* 📸 Imagen o carrusel */}
                    {hasImage && data.image && (
                        <div className="flex justify-center relative">
                            {Array.isArray(data.image) ? (
                                <>
                                    <img 
                                        src={data.image[currentImage]} 
                                        alt="Imagen" 
                                        className="w-full h-64 object-cover rounded-lg shadow-md"
                                    />
                                    <button 
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
                                        onClick={() => setCurrentImage((prev) => prev > 0 ? prev - 1 : data.image.length - 1)}
                                    >
                                        ◀
                                    </button>
                                    <button 
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
                                        onClick={() => setCurrentImage((prev) => prev < data.image.length - 1 ? prev + 1 : 0)}
                                    >
                                        ▶
                                    </button>
                                </>
                            ) : (
                                <img 
                                    src={data.image} 
                                    alt="Imagen" 
                                    className="max-w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                                />
                            )}
                        </div>
                    )}

                    {/* 📌 Mostrar datos dinámicamente */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {model.map((field) => (
                            <div key={field.key} className="bg-gray-100 p-3 rounded-lg flex flex-col hover:bg-gray-200 transition">
                                <span className="text-gray-600 text-sm font-medium">{field.label}:</span>
                                <p className="text-gray-800 text-md font-semibold">
                                    {field.type === "date"
                                        ? new Date(data[field.key]).toLocaleDateString("es-ES", { 
                                              year: "numeric", month: "long", day: "numeric" 
                                          })
                                        : field.type === "boolean"
                                        ? (
                                            data[field.key] 
                                                ? <CheckCircle className="text-green-500 inline ml-1" size={18} /> 
                                                : <XCircle className="text-red-500 inline ml-1" size={18} />
                                          )
                                        : field.type === "number"
                                        ? Number(data[field.key]).toLocaleString()
                                        : data[field.key] || "No disponible"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de botones que siempre estará visible */}
                <DialogFooter className="flex justify-end border-t pt-4 mt-4">
                    <Button variant="outline" className="hover:bg-gray-200 transition" onClick={onClose}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GenericModal;
