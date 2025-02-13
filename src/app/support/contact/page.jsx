"use client";

import Image from "next/image";
import { FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHasMounted } from '../../../hooks/useHasMounted';
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen"
import ProtectedPage from '../../../components/ProtectedPage';

export default function ContactPage() {
    const hasMounted = useHasMounted();
    if(!hasMounted) {
        return  <div className="">
        <div className=""><LoadingScreen message="Preparando tu experiencia..."/></div>
      </div>;
      }
    return (
        <ProtectedPage>
        <div className="max-w-6xl mx-auto p-6">
            {/* Encabezado con logo */}
            <div className="flex items-center gap-6 bg-white p-6 shadow-lg rounded-lg">
                <Image
                    src="/Logo_CacaoByte_S.A.png"
                    alt="CacaoByte Logo"
                    width={80}
                    height={80}
                    className="rounded-md shadow-md"
                />
                <div>
                    <h1 className="text-3xl font-bold text-black">Contacto y Soporte</h1>
                    <p className="text-gray-600">
                        ¿Tienes dudas o necesitas ayuda? Contáctanos a través de los siguientes medios y con gusto te asistiremos.
                    </p>
                </div>
            </div>

            {/* Información de Contacto */}
            <Card className="mt-6 bg-gray-100 shadow-lg border border-gray-200">
                <CardContent className="p-6">
                    {/* Correo Electrónico */}
                    <div className="flex items-center gap-4 mb-5">
                        <FaEnvelope className="text-2xl text-blue-600" />
                        <div>
                            <p className="text-lg font-semibold text-black">Correo Electrónico</p>
                            <a
                                href="mailto:soporte@cacaobyte.com"
                                className="text-blue-600 hover:underline text-md"
                            >
                                soporte@cacaobyte.com
                            </a>
                        </div>
                    </div>

                    {/* Teléfonos */}
                    <div className="flex items-center gap-4 mb-5">
                        <FaPhone className="text-2xl text-green-600" />
                        <div>
                            <p className="text-lg font-semibold text-black">Teléfonos</p>
                            <ul className="text-gray-700 space-y-1">
                                <li>
                                    <a href="tel:+50258261532" className="hover:underline">+502 5826 1532</a>
                                </li>
                                <li>
                                    <a href="tel:+50230577089" className="hover:underline">+502 3057 7089</a>
                                </li>
                                <li>
                                    <a href="tel:+50246703443" className="hover:underline">+502 4670 3443</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Sitio Web */}
                    <div className="flex items-center gap-4 mb-5">
                        <FaGlobe className="text-2xl text-purple-600" />
                        <div>
                            <p className="text-lg font-semibold text-black">Sitio Web</p>
                            <a
                                href="https://www.cacaobyte.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-md"
                            >
                                www.cacaobyte.com
                            </a>
                        </div>
                    </div>

                    {/* Ubicación */}
                    <div className="flex items-center gap-4">
                        <FaMapMarkerAlt className="text-2xl text-red-600" />
                        <div>
                            <p className="text-lg font-semibold text-black">Ubicación</p>
                            <p className="text-gray-700">Izabal, Guatemala</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Botones de Acción */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button
                    asChild
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    <a href="mailto:soporte@cacaobyte.com">
                        <FaEnvelope />
                        Enviar Correo
                    </a>
                </Button>

                <Button
                    asChild
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                    <a href="tel:+50258261532">
                        <FaPhone />
                        Llamar Ahora
                    </a>
                </Button>
            </div>
        </div>
        </ProtectedPage>
    );
}
