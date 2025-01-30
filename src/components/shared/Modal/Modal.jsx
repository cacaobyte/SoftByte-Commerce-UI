"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const GenericModal = ({ isOpen, onClose, title, data, model, hasImage = false }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg md:max-w-2xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* 📸 Renderizar imagen si `hasImage` es `true` */}
                    {hasImage && data.image && (
                        <div className="flex justify-center">
                            <img 
                                src={Array.isArray(data.image) ? data.image[0] : data.image} 
                                alt="Imagen" 
                                className="max-w-full h-auto rounded-lg shadow-md"
                            />
                        </div>
                    )}

                    {/* 📌 Mostrar datos dinámicamente */}
                    <div className="grid gap-3">
                        {model.map((field) => (
                            <div key={field.key} className="flex flex-col">
                                <span className="text-gray-600 text-sm font-medium">{field.label}:</span>
                                <span className="text-gray-800">
                                    {field.type === "date"
                                        ? new Date(data[field.key]).toLocaleDateString("es-ES", { 
                                              year: "numeric", month: "long", day: "numeric" 
                                          })
                                        : field.type === "boolean"
                                        ? data[field.key] ? "Sí" : "No"
                                        : field.type === "number"
                                        ? Number(data[field.key]).toLocaleString()
                                        : data[field.key] || "N/A"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GenericModal;
