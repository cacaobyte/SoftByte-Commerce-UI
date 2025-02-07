"use client";

import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FaqsService from "../../../service/SoftbyteCommerce/Sales/supports/faqs/faqsService";
import { FaQuestionCircle } from "react-icons/fa";

export default function FaqsPage() {
    const [faqs, setFaqs] = useState([]);
    const [filteredFaqs, setFilteredFaqs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const faqsService = new FaqsService();

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await faqsService.getAllFaqs();
                if (response.data) {
                    setFaqs(response.data);
                    setFilteredFaqs(response.data);
                }
            } catch (error) {
                console.error("Error cargando FAQs:", error);
            }
        };

        fetchFaqs();
    }, []);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        if (value === "Todos") {
            setFilteredFaqs(faqs);
        } else {
            setFilteredFaqs(faqs.filter((faq) => faq.categoria === value));
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Sección Introductoria */}
            <div className="text-center mb-6">
                <FaQuestionCircle className="text-blue-600 text-6xl mx-auto mb-2" />
                <h2 className="text-3xl font-bold text-gray-900">Preguntas Frecuentes</h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    Encuentra respuestas a las dudas más comunes sobre el uso del sistema. 
                    Explora las diferentes categorías o busca en la lista de preguntas frecuentes.
                </p>
            </div>

            {/* Selector de categoría */}
            <div className="mt-6">
                <Select onValueChange={handleCategoryChange} value={selectedCategory}>
                    <SelectTrigger className="w-full md:w-1/3 border border-gray-300 rounded-lg p-3 shadow-sm">
                        <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Todos">Todos</SelectItem>
                        {[...new Set(faqs.map((faq) => faq.categoria))].map((categoria) => (
                            <SelectItem key={categoria} value={categoria}>
                                {categoria}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Contenedor de FAQs */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => (
                        <Accordion key={faq.id} type="single" collapsible className="w-full">
                            <AccordionItem value={`faq-${faq.id}`} className="border border-gray-300 rounded-lg shadow-md transition duration-300 hover:bg-gray-100">
                                <AccordionTrigger className="p-4 text-lg font-semibold">
                                    {faq.pregunta}
                                </AccordionTrigger>
                                <AccordionContent className="p-4 text-gray-700">
                                    {faq.respuesta}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-2">No hay preguntas frecuentes disponibles.</p>
                )}
            </div>
        </div>
    );
}
