"use client";
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Hash } from "lucide-react";
import { getIconComponent } from "../../../utils/getIconComponent";

const GenericModal = ({ isOpen, onClose, title, data = {}, model = [], hasImage = false }) => {
  const [sections, setSections] = useState([]);
  const [activeTab, setActiveTab] = useState("general");
  const tabsListRef = useRef(null);

  useEffect(() => {
    if (model.length > 6) {
      const chunkSize = 6;
      const groupedSections = [];
      for (let i = 0; i < model.length; i += chunkSize) {
        groupedSections.push({
          key: `section-${i / chunkSize + 1}`,
          label: `${i / chunkSize + 1}`, // 🔹 Solo muestra números en lugar de "Sección X"
          fields: model.slice(i, i + chunkSize),
        });
      }
      setSections(groupedSections);
      setActiveTab(groupedSections[0].key);
    } else {
      setSections([{ key: "general", label: "🔍", fields: model }]); // 🔹 Usa un ícono en lugar de "Información General"
      setActiveTab("general");
    }
  }, [model]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl md:max-w-5xl p-6 rounded-xl shadow-lg bg-white transition-all duration-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">{title}</DialogTitle>
        </DialogHeader>

        {/* 📌 Tabs correctamente configurados */}
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          {sections.length > 1 && (
            <div className="relative w-full">
              <TabsList
                ref={tabsListRef}
                className="flex overflow-x-auto md:overflow-hidden whitespace-nowrap border-b border-gray-300 pb-2 scrollbar-hide md:justify-center"
              >
                {sections.map((section, index) => (
                  <TabsTrigger
                    key={section.key}
                    value={section.key}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition font-medium flex items-center gap-2"
                  >
                    <Hash size={16} className="text-gray-500" /> {section.label} {/* 🔹 Icono y número */}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          )}

          {/* 📌 Contenido de cada tab */}
          {sections.map((section) => (
            <TabsContent key={section.key} value={section.key} className="max-h-[50vh] overflow-y-auto px-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {section.fields.map((field) => (
                  <div key={field.key} className="flex flex-col">
                    <span className="text-gray-600 text-sm font-medium">{field.label}:</span>
                    <div className="text-gray-900 text-md font-semibold flex items-center gap-2 border-b border-gray-300 pb-1">
                      {field.type === "date"
                        ? data?.[field.key]
                          ? new Date(data[field.key]).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
                          : "No disponible"
                        : field.type === "boolean"
                        ? data?.[field.key]
                          ? <CheckCircle className="text-green-500" size={18} />
                          : <XCircle className="text-red-500" size={18} />
                        : field.type === "number"
                        ? Number(data?.[field.key] || 0).toLocaleString()
                        : field.type === "icon"
                        ? data?.[field.key] ? getIconComponent(data[field.key]) : "No disponible"
                        : field.type === "image"
                        ? (
                          <div className="w-32 h-32 mx-auto my-2">
                            <img
                              src={data?.[field.key] || "https://via.placeholder.com/150"}
                              alt={`Imagen de ${title}`}
                              className="w-full h-full rounded-lg object-cover border border-gray-300"
                            />
                          </div>
                        )
                        : data?.[field.key] ?? "No disponible"}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Sección de botones */}
        <DialogFooter className="flex justify-end border-t pt-4 mt-4">
          <Button variant="outline" className="hover:bg-gray-200 transition" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenericModal;
